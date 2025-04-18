import AbstractComponent from '../framework/view/abstract-component.js';

export default class TaskInputContainerComponent extends AbstractComponent {
  get template() {
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
}