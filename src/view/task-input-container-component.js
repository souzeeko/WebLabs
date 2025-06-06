import AbstractComponent from '../framework/view/abstract-component.js';

export default class TaskInputContainerComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return `
      <form class="task-input-container">
        <div class="section-title">Новая задача</div>
        <div class="section-content">
          <input type="text" class="task-input" placeholder="Название задачи..." required>
          <button class="add-task-btn" type="submit">+ Добавить</button>
        </div>
      </form>
    `;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}