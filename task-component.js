import { createElement } from '../framework/render.js';

function createTaskTemplate(text, columnType, isButton = false) {
  if (isButton) {
    return `
      <button class="task ${columnType}-state clear-btn">
        ${text}
      </button>
    `;
  }
  
  return `
    <div class="task ${columnType}-state">
      ${text}
    </div>
  `;
}

export default class TaskComponent {
  constructor(id, text, columnType, isButton = false) {
    this.id = id;
    this.text = text;
    this.columnType = columnType;
    this.isButton = isButton;
  }

  getTemplate() {
    return createTaskTemplate(this.text, this.columnType, this.isButton);
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