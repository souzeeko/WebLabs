import HeaderComponent from './view/header-component.js';
import TaskInputContainerComponent from './view/task-input-container-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import ColumnComponent from './view/column-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';



const bodyContainer = document.querySelector('.container')
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskInputContainerComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const taskBoard = new TaskBoardComponent()
render(taskBoard, bodyContainer, RenderPosition.BEFOREBEGIN)

for(let i = 0; i<4; i++){
  let column = new ColumnComponent()
  render(column, taskBoard.getElement())
  for (let c = 0; c < 4; c++) {
      let task = new TaskComponent("test")
      render(task, column.getElement())
  }
}