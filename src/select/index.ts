import './styles.scss';
type TData = { id: number; value: string };
interface IOptions {
  placeholder?: string;
  selectedId?: number;
  data?: TData[];
  onSelect?: (item: TData) => void;
}

const getTemplate = (options) => {
  const handleOptions = (options: IOptions) => {
    let itemsList = `<p>Список пуст</p>`;
    let text = 'Выберите элемент...';

    if (options) {
      const { data, placeholder = 'Выберите...', selectedId }: IOptions | undefined = options;
      itemsList =
        data &&
        Array.isArray(data) &&
        data
          .map((item: TData) => `<li class="select__item" data-type="item" data-value="${item.id}">${item.value}</li>`)
          .join('');

      text =
        selectedId && data && Array.isArray(data)
          ? data.find((item: TData) => item.id === selectedId).value
          : placeholder;
    }

    return { itemsList, text };
  };

  const initoptions = handleOptions(options);

  return `    
  <div class='select__backdrop' data-type="backdrop"></div>      
  <div class="select__input" data-type='input'>
    <span data-type="value">${initoptions.text}</span>
    <i class="fa fa-chevron-down" data-type='arrow'></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${initoptions.itemsList}
    </ul>
  </div>`;
};

export class Select {
  $el: Element;
  $arrow: Element;
  $value: Element;
  options: IOptions;
  selectedId: number | null;

  constructor(selector: string, options: {}) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = this.options?.selectedId || null;

    this.render();
    this.setup();
  }

  private render() {
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(this.options);
    if (this.selectedId) this.$el.querySelector(`[data-value="${this.selectedId}"]`).classList.add('active');
  }

  private setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
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
        this.close();
        break;
      default:
        break;
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item: TData) => item.id === this.selectedId);
  }

  select(id: number) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el.querySelectorAll(`[data-type="item"]`).forEach((elem: Element) => elem.classList.remove('active'));
    this.$el.querySelector(`[data-value="${this.selectedId}"]`).classList.add('active');

    this.options.onSelect && this.options.onSelect(this.current);

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');

    this.$arrow.classList.remove('fa-chevron-down');
    this.$arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.$el.classList.remove('open');

    this.$arrow.classList.add('fa-chevron-down');
    this.$arrow.classList.remove('fa-chevron-up');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}
