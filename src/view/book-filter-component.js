import AbstractComponent from '../framework/view/abstract-component.js';

export default class BookFilterComponent extends AbstractComponent {
    constructor(genres) {
        super();
        this._genres = genres;
    }

    get template() {
        return `
      <div class="book-filter">
        <h2>Фильтровать</h2>
        <select class="book-filter__select">
          <option value="all">Все</option>
          ${this._genres.map(genre => `<option value="${genre}">${genre}</option>`).join('')}
        </select>
      </div>`;
    }

    setFilterChangeHandler(handler) {
        this.element.querySelector('.book-filter__select').addEventListener('change', evt => handler(evt.target.value));
    }
}
