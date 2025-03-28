import { createElement } from '../framework/render.js';

function createColumnTemplate(id, title, type) {
  return `
    <div class="column ${type}" data-column-id="${id}">
      <h2>${title}</h2>
      <div class="tasks-container"></div>
    </div>
  `;
}

export default class ColumnComponent {
  constructor(id, title, type, hasClearButton = false) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.hasClearButton = hasClearButton;
  }

  getTemplate() {
    return createColumnTemplate(this.id, this.title, this.type);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getTasksContainer() {
    return this.getElement().querySelector('.tasks-container');
  }

  removeElement() {
    this.element = null;
  }
}