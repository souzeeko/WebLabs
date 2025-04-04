import { createElement } from '../framework/render.js';

export default class ClearButtonComponent {
  getTemplate() {
    return `
      <button class="clear-btn">✖ Очистить</button>
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