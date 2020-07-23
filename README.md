# Модули HTML кодов на JavaScript

## Select

### Создание экземпляра

Без параметра options с наличием массива data, инстанс класса создастся и отрендерится, но не будет кликабельный.

```ts
interface IOptions {
  placeholder?: string;
  selectedId?: number;
  data?: TData[];
  onChange?: (item: TData) => void;
}
interface Select {
  selector?: string;
  options?: IOptions;
}
interface Select {
  options?: IOptions;
}
```

#### Пример №1

```js
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
```

#### Пример №2

```js
const select = new Select({
  placeholder: 'Выберите фреймворк',
  selectedId: 3,
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
```

#### Пример №3

```js
const select = new Select({
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'Vue' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'React Native' },
    { id: 5, value: 'Next' },
    { id: 6, value: 'NodeJS' },
  ],
});
```
