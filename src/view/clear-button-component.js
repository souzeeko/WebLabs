import AbstractComponent from '../framework/view/abstract-component.js';

export default class ClearButtonComponent extends AbstractComponent {
  #onClick

  constructor(onClick) {
    super();
    this.#onClick = onClick;
  }

  get template() {
    return `<button class="clear-btn" type="button">✖ Очистить</button>`;
  }

  get element() {
    const element = super.element;
    element.addEventListener('click', this.#onClick);
    return element;
  }
}
