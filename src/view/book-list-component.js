import AbstractComponent from '../framework/view/abstract-component.js';

export default class BookListComponent extends AbstractComponent {
    get template() {
        return `<ul class="book-list"></ul>`;
    }

    getListElement() {
        return this.element;
    }
}
