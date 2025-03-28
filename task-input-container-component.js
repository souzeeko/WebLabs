import { createElement } from '../framework/render.js';

function createTaskInputContainerTemplate() {
  return `
    <div class="task-input-container">
      <div class="section-title">Новая задача</div>
      <div class="section-content">
        <input type="text" class="task-input" placeholder="Название задачи...">
        <button class="add-task-btn">+ Добавить</button>
      </div>
    </div>
  `;
}

export default class TaskInputContainerComponent {
  getTemplate() {
    return createTaskInputContainerTemplate();
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