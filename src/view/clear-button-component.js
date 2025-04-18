import AbstractComponent from '../framework/view/abstract-component.js';

export default class ColumnComponent extends AbstractComponent {
  get template() {
    return `
      <button class="clear-btn">✖ Очистить</button>
    `;
  }
}