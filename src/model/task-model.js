export default class TaskModel {
  #tasks = [];

  constructor(tasks) {
    this.#tasks = tasks;
  }

  get tasks() {
    return this.#tasks;
  }

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }
}