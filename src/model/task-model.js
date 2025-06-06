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

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer); 
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  addTask(task) {
    const newTask = {
      id: generateID(),
      title : task,
      status: 'backlog',
    }
    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearBin() {
		this.#tasks = this.#tasks.filter(task => task.status !== 'trash')
		this._notifyObservers();
	}

  getTasksByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }
}