import HeaderComponent from './view/header-component.js';
import TaskInputContainerComponent from './view/task-input-container-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import { render, RenderPosition } from './framework/render.js';
import TaskModel from './model/task-model.js';
import { tasks } from './mock/tasks.js';
import TasksBoardPresenter from './presenter/task-board-presenter.js';

const taskModel = new TaskModel(tasks);

const bodyContainer = document.querySelector('.container');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskInputContainerComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const taskBoard = new TaskBoardComponent();
render(taskBoard, bodyContainer, RenderPosition.BEFOREBEGIN);

const boardPresenter = new TasksBoardPresenter({
  container: taskBoard,
  taskModel
});
boardPresenter.init();