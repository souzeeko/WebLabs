import AbstractComponent from '../framework/view/abstract-component.js';
import { StatusToColumnMap } from '../const.js';

export default class ColumnComponent extends AbstractComponent {
  #status = null;

  constructor(status) {
    super();
    this.#status = status;
  }

  get template() {
    return `
      <div class="column ${this.#status}">
        <h2>${StatusToColumnMap[this.#status]}</h2>
        <div class="tasks-container"></div>
      </div>
    `;
  }
}