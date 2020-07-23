import { Ul } from '../Ul/Ul';
import { createElement } from '../js/createElement';
import { fontAwesome } from '../js/fontAwesome';

export type TData = { id: number; value: string | Element };
export interface IOptions {
  placeholder?: string;
  selectedId?: number;
  data?: TData[];
  onChange?: (item: TData) => void;
}

export class Select extends Ul {
  static element: HTMLElement;
  static arrow: ChildNode;
  static value: ChildNode;
  options: IOptions;
  static selectedId: number | null;

  constructor(selecter: string, options?: IOptions);
  constructor(options?) {
    super();
    switch (arguments.length) {
      //Если передается 1 параметр, то мы берём его за options
      case 1:
        Select.element = createElement('div');
        this.options = arguments[0];
        break;

      //Если передается 2 параметра
      case 2:
        Select.element = document.querySelector(arguments[0]);
        this.options = arguments[1];
        break;

      // Если параметры не передавались
      default:
        Select.element = createElement('div');
        break;
    }
    Select.selectedId = this.options?.selectedId || null;

    this.#render(this.options);
    this.#setup();
  }

  #render = (options) => {
    let backdrop: Element;
    let dropdown: Element;
    let input: Element, arrow: Element, span: Element;

    Select.element.classList.add('select', 'close');

    backdrop = createElement('div');
    dropdown = createElement('div');
    input = createElement('div');
    span = createElement('span');
    arrow = fontAwesome('fa-chevron-down');

    span.innerHTML = `${options.placeholder ? options.placeholder : 'Выберите элемент'}`;

    input.appendChild(span);
    input.appendChild(arrow);
    Select.arrow = input.childNodes[1];
    Select.value = input.childNodes[0];

    backdrop.classList.add('select__backdrop');
    input.classList.add('select__input');
    dropdown.classList.add('select__dropdown');

    backdrop.setAttribute('data-type', 'backdrop');
    input.setAttribute('data-type', 'input');

    let elementList = this.List(this.options.data);
    dropdown.appendChild(elementList);

    Select.element.appendChild(backdrop);
    Select.element.appendChild(input);
    Select.element.appendChild(dropdown);
  };

  #setup = () => {
    Select.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    const { type } = event.target.dataset;

    switch (type) {
      case 'input':
        if (this.options && this.options.data) {
          if (Array.isArray(this.options.data)) {
            this.options.data.length ? this.toggle() : console.error('Массив "data" пустой.');
          } else console.error('параметр "data" должен содержать массив.');
        } else console.error('параметр "options" не содержит параметра "data"');
        break;

      case 'item':
        const id: number = Number(event.target.dataset.value);

        this.select(id);
        break;

      case 'backdrop':
        this.toggle();
        break;

      default:
        break;
    }
  };
  #current = () => {
    return this.options.data.find((item: TData) => item.id === Select.selectedId);
  };

  toggle() {
    Select.element.classList.toggle('open');
    Select.element.classList.toggle('close');
  }

  select(id: number) {
    Select.selectedId = id;
    const current = this.#current();
    Select.value.textContent = typeof current.value === 'string' ? current.value : current.value.textContent;

    Select.element.querySelectorAll(`[data-type="item"]`).forEach((elem: Element) => elem.classList.remove('active'));
    Select.element.querySelector(`[data-value="${Select.selectedId}"]`).classList.add('active');

    this.options.onChange && this.options.onChange(this.#current());

    this.toggle();
  }

  destroy() {
    Select.element.removeEventListener('click', this.#clickHandler);
    Select.element.innerHTML = '';
  }
}
