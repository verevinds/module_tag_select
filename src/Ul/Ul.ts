import { createElement } from '../js/createElement';
import { TData } from '../Select/Select';

export class Li {
  static element: HTMLElement;
  static elementH4: HTMLElement;
  static elementDivider: HTMLElement;

  constructor() {}

  Item(id: number, value: string | Element) {
    switch (typeof value) {
      case 'string':
        Li.element = createElement('li');
        Li.element.classList.add('list__item');
        Li.element.setAttribute('data-type', 'item');
        Li.element.setAttribute('data-value', `${id}`);
        Li.element.innerText = `${value}`;
        return Li.element;

      default:
        return value;
    }
  }
  Title(text: string) {
    Li.elementH4 = createElement('h4');
    Li.elementH4.classList.add('list__title');
    Li.elementH4.innerText = `${text}`;
    return Li.elementH4;
  }
  get Divider() {
    Li.elementDivider = createElement('div');
    Li.elementDivider.classList.add('list__divider');
    return Li.elementDivider;
  }

  destroy() {
    Li.element.innerHTML = '';
    Li.elementH4.innerHTML = '';
    Li.elementDivider.innerHTML = '';
  }
}

export class Ul extends Li {
  static element: HTMLElement;
  constructor() {
    super();
  }

  List(list: TData[] | any[]) {
    Ul.element = createElement('ul');
    Ul.element.classList.add('list');
    Array.from(list, (data: TData) =>
      typeof data.value === 'string'
        ? Ul.element.appendChild(this.Item(data.id, data.value))
        : this.Item(data.id, data.value),
    );
    return Ul.element;
  }

  destroy() {
    Ul.element.innerHTML = '';
  }
}
