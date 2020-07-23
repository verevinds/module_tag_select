export interface IOptionsButton {
  content?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  variant?:
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'primary_outline'
    | 'secondary_outline'
    | 'success_outline'
    | 'warning_outline'
    | 'danger_outline'
    | 'info_outline'
    | 'light_outline'
    | 'dark_outline';
  onClick?: () => any;
}

export class Button {
  static size;
  static variant;
  static onClick;
  static element: HTMLElement;
  static selector: HTMLElement;

  constructor(selector?: string, parameter?: IOptionsButton);
  constructor(parameter?: IOptionsButton | string) {
    Button.element = document.createElement('button');

    switch (typeof arguments[0]) {
      case 'string':
        Button.selector = document.querySelector(arguments[0]);
        Button.element.innerHTML = arguments[1]?.content || 'Кнопка';
        Button.size = arguments[1]?.size || 'sm';
        Button.variant = arguments[1]?.variant || 'primary';
        Button.onClick = arguments[1]?.onClick;
        break;

      default:
        Button.element.innerHTML = arguments[0]?.content || 'Кнопка';
        Button.size = arguments[0]?.size || 'sm';
        Button.variant = arguments[0]?.variant || 'primary';
        Button.onClick = arguments[0]?.onClick;
        break;
    }

    this.#setup();
    this.#render();
  }

  #render = () => {
    if (Button.selector) Button.selector.appendChild(Button.element);
  };

  #setup = () => {
    Button.element.classList.add('button');
    switch (Button.variant) {
      case 'primary_outline':
        Button.element.classList.add('button_primary_outline');
        break;
      case 'secondary_outline':
        Button.element.classList.add('button_secondary_outline');
        break;
      case 'success_outline':
        Button.element.classList.add('button_success_outline');
        break;
      case 'warning_outline':
        Button.element.classList.add('button_warning_outline');
        break;
      case 'danger_outline':
        Button.element.classList.add('button_danger_outline');
        break;
      case 'info_outline':
        Button.element.classList.add('button_info_outline');
        break;
      case 'light_outline':
        Button.element.classList.add('button_light_outline');
        break;
      case 'dark_outline':
        Button.element.classList.add('button_dark_outline');
        break;

      case 'secondary':
        Button.element.classList.add('button_secondary');
        break;
      case 'success':
        Button.element.classList.add('button_success');
        break;
      case 'warning':
        Button.element.classList.add('button_warning');
        break;
      case 'danger':
        Button.element.classList.add('button_danger');
        break;
      case 'info':
        Button.element.classList.add('button_info');
        break;
      case 'light':
        Button.element.classList.add('button_light');
        break;
      case 'dark':
        Button.element.classList.add('button_dark');
        break;
      case 'link':
        Button.element.classList.add('button_link');
        break;

      default:
        Button.element.classList.add('button_primary');
        break;
    }

    switch (Button.size) {
      case 'xs':
        Button.element.classList.add('button_xs');
        break;
      case 's':
        Button.element.classList.add('button_s');
        break;
      case 'm':
        Button.element.classList.add('button_m');
        break;
      case 'l':
        Button.element.classList.add('button_l');
        break;
      case 'xl':
        Button.element.classList.add('button_xl');
        break;
      default:
        break;
    }
    if (Button.onClick) Button.element.addEventListener('click', Button.onClick);
  };

  destroy() {
    if (Button.onClick) Button.element.removeEventListener('click', Button.onClick);
  }
}
