import { generateID } from "../utils.js";

export default class TaskModel {
  #tasks = [];
  #observers = [];

  constructor(tasks) {
    this.#tasks = tasks;
  }

  get tasks() {
    return this.#tasks;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  _notifyObservers() {
    for (const observer of this.#observers) {
      observer();
    }
  }

  addTask(title) {
    const newTask = {
      id: generateID(),
      title,
      status: 'backlog'
    };
    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearBin() {
    this.#tasks = this.#tasks.filter(task => task.status !== 'trash');
    this._notifyObservers();
  }

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  updateTaskStatus(id, newStatus, newPosition) {
    const oldIndex = this.#tasks.findIndex(task => task.id === id);

    if (oldIndex === -1) {
      return;
    }

    const task = this.#tasks[oldIndex];
    this.#tasks.splice(oldIndex, 1);
    task.status = newStatus;
    const tasksOfStatus = this.getTasksByStatus(newStatus);

    if (newPosition >= tasksOfStatus.length) {
      let lastIndex = -1;

      for (let i = 0; i < this.#tasks.length; i++) {
        if (this.#tasks[i].status === newStatus) {
          lastIndex = i;
        }
      }
      
      this.#tasks.splice(lastIndex + 1, 0, task);
    } else {
      const refTask = tasksOfStatus[newPosition];
      const refIndex = this.#tasks.findIndex(t => t.id === refTask.id);
      this.#tasks.splice(refIndex, 0, task);
    }

    this._notifyObservers();
  }
}