import HeaderComponent from './view/header-component.js';
import TaskInputContainerComponent from './view/task-input-container-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import ColumnComponent from './view/column-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const appData = {
  header: 'Список задач',
  columns: [
    {
      id: 1,
      title: 'Бэклог',
      type: 'backlog',
      tasks: [
        { id: 1, text: 'Выучить JS' },
        { id: 2, text: 'Выучить React' },
        { id: 3, text: 'Сделать домашку' }
      ]
    },
    {
      id: 2,
      title: 'В процессе',
      type: 'in-progress',
      tasks: [
        { id: 4, text: 'Выпить смузи' },
        { id: 5, text: 'Попить воды' }
      ]
    },
    {
      id: 3,
      title: 'Готово',
      type: 'done',
      tasks: [
        { id: 6, text: 'Позвонить маме' },
        { id: 7, text: 'Погладить кота' }
      ]
    },
    {
      id: 4,
      title: 'Корзина',
      type: 'trash',
      tasks: [
        { id: 8, text: 'Сходить погулять' },
        { id: 9, text: 'Прочитать Войну и Мир' }
      ],
      hasClearButton: true
    }
  ]
};


function initApp() {
  const bodyContainer = document.querySelector('.container');
  
  render(
    new HeaderComponent(appData.header), 
    bodyContainer, 
    RenderPosition.BEFOREBEGIN
  );
  
  render(
    new TaskInputContainerComponent(),
    bodyContainer
  );
  
  const taskBoardComponent = new TaskBoardComponent();
  render(taskBoardComponent, bodyContainer);
  
  appData.columns.forEach(column => {
    const columnComponent = new ColumnComponent(
      column.id,
      column.title,
      column.type,
      column.hasClearButton
    );
    
    render(columnComponent, taskBoardComponent.getElement());
    
    column.tasks.forEach(task => {
      render(
        new TaskComponent(task.id, task.text, column.type),
        columnComponent.getElement()
      );
    });
    
    if (column.hasClearButton) {
      render(
        new TaskComponent('clear', '✖ Очистить', column.type, true),
        columnComponent.getElement()
      );
    }
  });
}

initApp();
