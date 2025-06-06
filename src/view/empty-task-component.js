import AbstractComponent from '../framework/view/abstract-component.js';

export default class EmptyTaskComponent extends AbstractComponent {
  get template() {
    return `
      <div class="task-empty-state">Здесь могла быть ваша задача</div>
    `;
  }
}