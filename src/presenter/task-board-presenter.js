import AbstractComponent from '../framework/view/abstract-component.js';
import { render, remove } from '../framework/render.js';
import ColumnComponent from '../view/column-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { StatusToColumnMap, UpdateType } from '../const.js';

export default class TasksBoardPresenter extends AbstractComponent {
  #container;
  #taskModel;
  #loadingComponent;

  constructor({ container, taskModel }) {
    super();
    this.#container = container;
    this.#taskModel = taskModel;
    this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
  }

  init() {
    this.#loadingComponent = new LoadingViewComponent();
    render(this.#loadingComponent, this.#container.element);
    this.#taskModel.init();
  }

  #handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.PATCH:
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  #clearBoard() {
    this.#container.element.innerHTML = '';
  }

  #renderBoard() {
    Object.keys(StatusToColumnMap).forEach(status => this.#renderColumn(status));
  }

  #renderColumn(status) {
    const column = new ColumnComponent(status);
    render(column, this.#container.element);

    const colEl = column.element;
    
    const list  = colEl.querySelector('.tasks-container');
    colEl.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    colEl.addEventListener('drop', e => this.#onDrop(e, status, list));

    const tasks = this.#taskModel.tasks.filter(t => t.status === status);

    if (tasks.length === 0) {
      render(new EmptyTaskComponent(), list);
    } else {
      tasks.forEach(t => render(new TaskComponent(t), list));
    }

    if (status === 'trash') {
      const btn = new ClearButtonComponent(() => this.#taskModel.clearBin());
      render(btn, colEl);

      if (tasks.length === 0) {
        btn.element.disabled = true;
      }
    }
  }

  #onDrop(evt, newStatus, list) {
    evt.preventDefault();

    const id = evt.dataTransfer.getData('text/plain');

    const all = Array.from(list.querySelectorAll('.task'));

    const over = evt.target.closest('.task');

    let pos;

    if (over && list.contains(over)) {
      const { top, height } = over.getBoundingClientRect();

      const mid = top + height / 2;

      const idx = all.indexOf(over);

      pos = evt.clientY < mid ? idx : idx + 1;
    } else {
      pos = all.length;
    }

    this.#taskModel.updateTaskStatus(id, newStatus, pos);
  }

  async createTask(title) {
    if (!title) return;

    await this.#taskModel.addTask(title);
  }
}
