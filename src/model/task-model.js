import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #tasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#tasks;
  }

  async init() {
    try {
      this.#tasks = await this.#tasksApiService.tasks;
    } catch {
      this.#tasks = [];
    }

    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = { id: generateID(), title, status: 'backlog' };
    
    const created = await this.#tasksApiService.addTask(newTask);
    this.#tasks.push(created);
    this._notify(UpdateType.MINOR, { action: UserAction.ADD_TASK, task: created });
    return created;
  }

  async updateTaskStatus(id, newStatus, newPosition) {
    const oldIndex = this.#tasks.findIndex(t => t.id === String(id));

    if (oldIndex === -1) return;

    const task = { ...this.#tasks[oldIndex], status: newStatus };

    this.#tasks.splice(oldIndex, 1);

    const same = this.#tasks.filter(t => t.status === newStatus);

    if (newPosition >= same.length) {
      const lastIndex = this.#tasks
        .map((t,i) => t.status === newStatus ? i : -1)
        .filter(i => i >= 0)
        .pop() ?? -1;
      this.#tasks.splice(lastIndex + 1, 0, task);
    } else {
      const ref = same[newPosition];

      const refIdx = this.#tasks.findIndex(t => t.id === ref.id);
      this.#tasks.splice(refIdx, 0, task);
    }

    const updated = await this.#tasksApiService.updateTask(task);

    const idx = this.#tasks.findIndex(t => t.id === updated.id);

    if (idx !== -1) {
      this.#tasks[idx] = updated;
    }

    this._notify(UpdateType.PATCH, { action: UserAction.UPDATE_TASK, task: updated });
  }

  async clearBin() {
    const trash = this.#tasks.filter(t => t.status === 'trash');
    await Promise.all(trash.map(t => this.#tasksApiService.deleteTask(t.id)));
    this.#tasks = this.#tasks.filter(t => t.status !== 'trash');
    this._notify(UpdateType.MINOR, { action: UserAction.DELETE_TASK });
  }
}
