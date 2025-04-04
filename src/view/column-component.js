import { createElement } from '../framework/render.js';
import { StatusToColumnMap } from '../const.js';

export default class ColumnComponent {
  constructor(status) {
    this.status = status;
  }

  getTemplate() {
    return `
      <div class="column ${this.status}">
        <h2>${StatusToColumnMap[this.status]}</h2>
        <div class="tasks-container"></div>
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