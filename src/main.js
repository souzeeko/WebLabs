import HeaderComponent from './view/header-component.js';
import TaskInputContainerComponent from './view/task-input-container-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import { render } from './framework/render.js';
import TaskModel from './model/task-model.js';
import { tasks } from './mock/tasks.js';
import TasksBoardPresenter from './presenter/task-board-presenter.js';

const taskModel = new TaskModel(tasks);
const bodyContainer = document.querySelector('.container');
const taskBoard = new TaskBoardComponent();
const boardPresenter = new TasksBoardPresenter({
  container: taskBoard,
  taskModel
});

const taskInput = new TaskInputContainerComponent({ 
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
boardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer);
render(taskInput, bodyContainer);
render(taskBoard, bodyContainer);


boardPresenter.init();