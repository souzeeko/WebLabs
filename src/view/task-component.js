import AbstractComponent from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return `
      <div class="task ${this.#task.status}-state" draggable="true" data-id="${this.#task.id}">
        ${this.#task.title}
      </div>
    `;
  }

  get element() {
    const element = super.element;
    element.addEventListener('dragstart', (evt) => {
      evt.dataTransfer.setData('text/plain', String(this.#task.id));
      evt.dataTransfer.effectAllowed = 'move';
      element.classList.add('dragging');
    });
    element.addEventListener('dragend', () => {
      element.classList.remove('dragging');
    });
    return element;
  }
}
