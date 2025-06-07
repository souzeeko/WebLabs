export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const Status = {
  BACKLOG: 'backlog',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
  TRASH: 'trash',
};

export const StatusToColumnMap = {
  [Status.BACKLOG]: 'Backlog',
  [Status.IN_PROGRESS]: 'In Progress',
  [Status.DONE]: 'Done',
  [Status.TRASH]: 'Trash',
};
