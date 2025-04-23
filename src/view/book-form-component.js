import AbstractComponent from '../framework/view/abstract-component.js';

export default class BookFormComponent extends AbstractComponent {
    get template() {
        return `
      <div class="book-form">
        <h2>Добавить новую книгу</h2>
        <form class="book-form__form">
          <input type="text" class="book-form__title" placeholder="Название книги" required />
          <input type="text" class="book-form__author" placeholder="Автор" required />
          <select class="book-form__genre" required>
            <option value="">Выбрать жанр</option>
            <option value="Fiction">Художественная</option>
            <option value="Science">Научная</option>
            <option value="Fantasy">Фантастика</option>
            <option value="Biography">Биография</option>
          </select>
          <button type="submit">Добавить книгу</button>
        </form>
      </div>`;
    }

    setSubmitHandler(handler) {
        this.element.querySelector('.book-form__form').addEventListener('submit', handler);
    }

    getData() {
        const title = this.element.querySelector('.book-form__title').value;
        const author = this.element.querySelector('.book-form__author').value;
        const genre = this.element.querySelector('.book-form__genre').value;
        this.element.querySelector('.book-form__form').reset();
        return { title, author, genre };
    }
}
