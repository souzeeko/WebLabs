import AbstractComponent from '../framework/view/abstract-component.js';
import { render } from '../framework/render.js';
import ColumnComponent from '../view/column-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import { StatusToColumnMap } from '../const.js';

export default class TasksBoardPresenter extends AbstractComponent {
  #container = null;
  #taskModel = null;
  #columns = {};

  constructor({ container, taskModel }) {
    super();
    this.#container = container;
    this.#taskModel = taskModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    Object.keys(StatusToColumnMap).forEach(status => {
      this.#renderColumn(status);
    });
  }

  #renderColumn(status) {
    const column = new ColumnComponent(status);
    this.#columns[status] = column;
    render(column, this.#container.element);

    const tasksContainer = column.element.querySelector('.tasks-container');
    const tasks = this.#taskModel.getTasksByStatus(status);

    if (tasks.length === 0) {
      this.#renderEmptyState(tasksContainer);
    } else {
      this.#renderTasksList(tasksContainer, tasks);
    }

    if (status === 'trash') {
      this.#renderClearButton(column.element);
    }
  }

  #renderTasksList(container, tasks) {
    tasks.forEach(task => {
      render(new TaskComponent(task), container);
    });
  }

  #renderEmptyState(container) {
    render(new EmptyTaskComponent(), container);
  }

  #renderClearButton(container) {
    render(new ClearButtonComponent(), container);
  }
}