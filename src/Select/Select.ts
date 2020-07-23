import { Ul } from '../Ul/Ul';
import { createElement } from '../js/createElement';

export type TData = { id: number; value: string | Element };
export interface IOptions {
  placeholder?: string;
  selectedId?: number;
  data?: TData[];
  onChange?: (item: TData) => void;
}

export class Select extends Ul {
  $element: Element;
  $arrow: ChildNode;
  $value: ChildNode;
  options: IOptions;
  selectedId: number | null;

  constructor(selecter: string, options?: IOptions);
  constructor(options?) {
    super();
    switch (arguments.length) {
      //Если передается 1 параметр, то мы берём его за options
      case 1:
        this.$element = createElement('div');
        this.options = arguments[0];
        break;

      //Если передается 2 параметра
      case 2:
        this.$element = document.querySelector(arguments[0]);
        this.options = arguments[1];
        break;

      // Если параметры не передавались
      default:
        this.$element = createElement('div');
        break;
    }
    this.selectedId = this.options?.selectedId || null;

    this.render(this.options);
    this.setup();
  }

  private render(options) {
    let backdrop: Element;
    let dropdown: Element;
    let input: Element, arrow: Element, span: Element;

    this.$element.classList.add('select', 'close');

    backdrop = createElement('div');
    dropdown = createElement('div');
    input = createElement('div');
    span = createElement('span');
    arrow = FontAwesome('fa-chevron-down');

    span.innerHTML = `${options.placeholder ? options.placeholder : 'Выберите элемент'}`;

    input.appendChild(span);
    input.appendChild(arrow);
    this.$arrow = input.childNodes[1];
    this.$value = input.childNodes[0];

    backdrop.classList.add('select__backdrop');
    input.classList.add('select__input');
    dropdown.classList.add('select__dropdown');

    backdrop.setAttribute('data-type', 'backdrop');
    input.setAttribute('data-type', 'input');

    let elementList = this.List(this.options.data);
    dropdown.appendChild(elementList);

    this.$element.appendChild(backdrop);
    this.$element.appendChild(input);
    this.$element.appendChild(dropdown);
    console.log(this.$element);
  }

  private setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$element.addEventListener('click', this.clickHandler);
  }
  private clickHandler(event) {
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
  }
  private current() {
    return this.options.data.find((item: TData) => item.id === this.selectedId);
  }

  toggle() {
    this.$element.classList.toggle('open');
    this.$element.classList.toggle('close');
  }

  select(id: number) {
    this.selectedId = id;
    const current = this.current();
    this.$value.textContent = typeof current.value === 'string' ? current.value : current.value.textContent;

    this.$element.querySelectorAll(`[data-type="item"]`).forEach((elem: Element) => elem.classList.remove('active'));
    this.$element.querySelector(`[data-value="${this.selectedId}"]`).classList.add('active');

    this.options.onChange && this.options.onChange(this.current());

    this.toggle();
  }

  destroy() {
    this.$element.removeEventListener('click', this.clickHandler);
    this.$element.innerHTML = '';
  }
}

export function FontAwesome(icon: string) {
  const fontAwesome = createElement('i');
  fontAwesome.classList.add(`fa`, icon);

  return fontAwesome;
}
