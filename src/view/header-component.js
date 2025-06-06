import AbstractComponent from '../framework/view/abstract-component.js';

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return `
      <h1 class="header">Список задач</h1>
    `;
  }
}