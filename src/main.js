import HeaderComponent from './view/header-component.js';
import TaskInputContainer from './view/task-input-container-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import { render } from './framework/render.js';
import TasksApiService from './tasks-api-service.js';
import TaskModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/task-board-presenter.js';

const API_END_POINT = 'https://68439c7671eb5d1be0312cb6.mockapi.io';

const apiService = new TasksApiService(API_END_POINT);

const taskModel  = new TaskModel({ tasksApiService: apiService });

const root = document.querySelector('.container');

render(new HeaderComponent(), root);
render(new TaskInputContainer({
  onClick: async () => {
    const input = document.querySelector('.task-input');

    const title = input.value.trim();

    if (!title) return;
    
    await boardPresenter.createTask(title);
    input.value = '';
  },
}), root);

const boardComponent = new TaskBoardComponent();
render(boardComponent, root);

const boardPresenter = new TasksBoardPresenter({
  container: boardComponent,
  taskModel: taskModel,
});
boardPresenter.init();
