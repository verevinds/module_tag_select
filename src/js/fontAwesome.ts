import { createElement } from './createElement';

export function fontAwesome(icon: string) {
  const fontAwesome = createElement('i');
  fontAwesome.classList.add(`fa`, icon);

  return fontAwesome;
}
