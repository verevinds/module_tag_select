// import { Select } from './select/index';
import { Select } from './Select/Select';
import { Ul, Li } from './Ul/Ul';
import './index.scss';

const select = new Select('#select', {
  placeholder: 'Выберите фреймворк',
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'Vue' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'React Native' },
    { id: 5, value: 'Next' },
    { id: 6, value: 'NodeJS' },
  ],
  onChange(item) {
    console.log('selected item', item);
  },
});
window.s = select;

const li = new Li();
// console.log(li.Item(1, `lu`));
// document.querySelector('#selectKit').appendChild(li.Item(1, `lu`));
window.li = li;

const ul = new Ul();

// document.querySelector('#selectKit').appendChild(
//   ul.List([
//     { id: 0, value: ul.Title(`Frameworks`) },
//     { id: 1, value: ul.Item(1, `React`) },
//     { id: 2, value: ul.Item(2, `Vue`) },
//     { id: 3, value: ul.Divider },
//     { id: 4, value: ul.Item(3, `Angular`) },
//   ]),
// );

window.ul = ul;
