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
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    Object.keys(StatusToColumnMap).forEach(status => {
      this.#renderColumn(status);
    });
  }

  #clearBoard() {
    this.#container.element.innerHTML = '';
  }

  #renderColumn(status) {
    const column = new ColumnComponent(status);
    this.#columns[status] = column;
    render(column, this.#container.element);

    const tasksContainer = column.element.querySelector('.tasks-container');
    // Получаем все задачи с текущим статусом
    const tasks = this.#taskModel.getTasksByStatus(status);

    if (tasks.length === 0 && status !== 'trash') {
      this.#renderEmptyState(tasksContainer);
    } else {
      this.#renderTasksList(tasksContainer, tasks);
    }

    if (status === 'trash') {
      const clearButton = new ClearButtonComponent(() => {
        this.#taskModel.clearBin();
      });
      render(clearButton, column.element);

      if (tasks.length === 0) {
        clearButton.element.disabled = true;
      }
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

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  createTask() {
    const taskTitle = document.querySelector('.task-input').value.trim();
    if (!taskTitle) { return; }
    this.#taskModel.addTask(taskTitle);
    document.querySelector('.task-input').value = '';
  }
}
