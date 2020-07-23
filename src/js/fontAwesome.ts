import { createElement } from './createElement';

export function FontAwesome(icon: string) {
  const fontAwesome = createElement('i');
  fontAwesome.classList.add(`fa`, icon);

  return fontAwesome;
}
