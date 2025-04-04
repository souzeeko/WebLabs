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
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return `
      <div class="task backlog-state"> ${this.task}</div>
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