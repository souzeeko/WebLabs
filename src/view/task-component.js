import { createElement } from '../framework/render.js';

export default class TaskComponent {
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return `
      <div class="task ${this.task.status}-state">${this.task.title}</div>
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