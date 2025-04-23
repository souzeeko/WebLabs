import AbstractComponent from '../framework/view/abstract-component.js';

export default class BookEditComponent extends AbstractComponent {
    constructor(book, genres) {
        super();
        this._book = book;
        this._genres = genres;
    }

    get template() {
        const options = this._genres
            .map(genre => {
                const selected = genre === this._book.genre ? ' selected' : '';
                return '<option value="' + genre + '"' + selected + '>' + genre + '</option>';
            })
            .join('');
        return `
      <li class="book-item-edit" data-id="${this._book.id}">
        <div class="book-details-edit">
          <input type="text" class="book-edit__title" value="${this._book.title}" required />
          <input type="text" class="book-edit__author" value="${this._book.author}" required />
          <select class="book-edit__genre" required>
            ${options}
          </select>
        </div>
        <div>
          <button class="book-edit__save">Сохранить</button>
          <button class="book-edit__cancel">Отмена</button>
        </div>
      </li>`;
    }

    getData() {
        const title = this.element.querySelector('.book-edit__title').value;
        const author = this.element.querySelector('.book-edit__author').value;
        const genre = this.element.querySelector('.book-edit__genre').value;
        return { title, author, genre };
    }

    setSaveHandler(handler) {
        this.element.querySelector('.book-edit__save').addEventListener('click', handler);
    }

    setCancelHandler(handler) {
        this.element.querySelector('.book-edit__cancel').addEventListener('click', handler);
    }
}
