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

  #clearBoard() {
    this.#container.element.innerHTML = '';
    this.#columns = {};
  }

  #renderBoard() {
    Object.keys(StatusToColumnMap).forEach((status) => {
      this.#renderColumn(status);
    });
  }

  #renderColumn(status) {
    const column = new ColumnComponent(status);
    this.#columns[status] = column;
    render(column, this.#container.element);
    const columnElement = column.element;
    const tasksContainer = columnElement.querySelector('.tasks-container');

    columnElement.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
    });

    columnElement.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const data = evt.dataTransfer.getData('text/plain');
      const taskId = Number(data);
      const newStatus = status;
      const allTaskElems = Array.from(tasksContainer.querySelectorAll('.task'));
      const taskElement = evt.target.closest('.task');
      let newPosition;

      if (taskElement && tasksContainer.contains(taskElement)) {
        const bounding = taskElement.getBoundingClientRect();
        const midY = bounding.top + bounding.height / 2;
        const targetIndex = allTaskElems.indexOf(taskElement);
        newPosition = (evt.clientY < midY) ? targetIndex : (targetIndex + 1);
      } else {
        newPosition = allTaskElems.length;
      }

      this.#taskModel.updateTaskStatus(taskId, newStatus, newPosition);
    });

    const tasks = this.#taskModel.getTasksByStatus(status);

    if (tasks.length === 0) {
      this.#renderEmptyState(tasksContainer);
    } else {
      this.#renderTasksList(tasksContainer, tasks);
    }

    if (status === 'trash') {
      const clearButton = new ClearButtonComponent(() => {
        this.#taskModel.clearBin();
      });
      render(clearButton, columnElement);

      if (tasks.length === 0) {
        clearButton.element.disabled = true;
      }
    }
  }

  #renderTasksList(container, tasks) {
    tasks.forEach((task) => {
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
