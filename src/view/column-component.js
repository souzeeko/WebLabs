import { createElement } from '../framework/render.js';

export default class ColumnComponent {
  getTemplate() {
    return `
            <div class="column backlog">
                <h2>Бэклог</h2>
            </div>
  `;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}