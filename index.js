import { Select } from './lib/select/dist/select';
import './lib/select/dist/select.css';

// import { Select } from './src/select.ts';

const select = new Select('#select', {
  placeholder: 'Выберите элемент',
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'Vue' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'React Native' },
    { id: 5, value: 'Next' },
    { id: 6, value: 'NodeJS' },
  ],
  onSelect(item) {
    console.log('selected item', item);
  },
});

window.s = select;
