import { generateID } from '../utils.js';

export const initialBooks = [
  { id: generateID(), title: '1984', author: 'Джордж Оруэл', genre: 'Художественная' },
  { id: generateID(), title: 'Цветы для Элджернона', author: 'Дэниэл Киз', genre: 'Фантастика' },
  { id: generateID(), title: '451 градус по Фаренгейту', author: 'Рэй Брэдбери', genre: 'Художественная' }
];
