import { render } from '../framework/render.js';
import ColumnComponent from '../view/column-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import { StatusToColumnMap } from '../const.js';

export default class TaskBoardPresenter {
  #container = null;
  #taskModel = null;
  #columns = {};

  constructor({ container, taskModel }) {
    this.#container = container;
    this.#taskModel = taskModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    Object.keys(StatusToColumnMap).forEach(status => {
      const column = new ColumnComponent(status);
      this.#columns[status] = column;
      render(column, this.#container.getElement());

      const tasksContainer = column.getElement().querySelector('.tasks-container');
      const tasks = this.#taskModel.getTasksByStatus(status);

      tasks.forEach(task => {
        render(new TaskComponent(task), tasksContainer);
      });

      if (status === 'trash') {
        render(new ClearButtonComponent(), column.getElement());
      }
    });
  }
}