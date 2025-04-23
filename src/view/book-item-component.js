import AbstractComponent from '../framework/view/abstract-component.js';

export default class BookItemComponent extends AbstractComponent {
    constructor(book) {
        super();
        this._book = book;
    }

    get template() {
        return `
      <li class="book-item" data-id="${this._book.id}">
        <div class="book-details">
          <span>${this._book.title}</span>
          <span>${this._book.author}</span>
          <span>${this._book.genre}</span>
        </div>
        <div>
          <button class="book-item__edit">Редактировать</button>
          <button class="book-item__delete">Удалить</button>
        </div>
      </li>`;
    }

    setDeleteHandler(handler) {
        this.element.querySelector('.book-item__delete').addEventListener('click', handler);
    }

    setEditHandler(handler) {
        this.element.querySelector('.book-item__edit').addEventListener('click', handler);
    }
}
