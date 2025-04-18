import AbstractComponent from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return `
      <div class="task ${this.#task.status}-state">${this.#task.title}</div>
    `;
  }
}