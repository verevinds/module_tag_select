# Модули HTML кодов на JavaScript

## тег Select

### Создание экземпляра

Без параметра options с наличием массива data, инстанс класса создастся и отрендерится, но не будет кликабельный.

```ts
interface IOptions {
  placeholder?: string;
  selectedId?: number;
  data?: TData[];
  onChange?: (item: TData) => any;
}
interface Select {
  selector?: string;
  options?: IOptions;
}
interface Select {
  options?: IOptions;
}
```

```ts
type Select = () => {
  options: {
    placeholder?: string; // Подпись на время отсутствия выделенного элемента (не обязательный)
    selectedId?: number; // Номер выделенного элемента (не обязательный)
    data?: TData[]; // Список элементов (не обязательный)
    onChange?: (item: TData) => any; // Callback - получает элемент из списка (не обязательный)
  };
  destroy: () => void; // Уничтожит созданный объект
  select: (id: number) => void; // Если передать номер, выделит объект из списка
  toggle: () => void; // Откроет список или закроет, в зависимости от состояния
  List: (list: TData[] | any[]) => HTMLElement;
  Divider: HTMLElement;
  Title: (text: string) => HTMLElement;
  Item: (id: number, value: string | Element) => HTMLElement;
};
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

## тег Ul
