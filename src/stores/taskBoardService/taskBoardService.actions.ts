export const GET_TASK_BOARD_SERVICE = 'GET_TASK_BOARD_SERVICE';
export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const COMPLETE_TASK = 'COMPLETE_TASK';

export interface ApiPayload {
  [x: string]: any,
  status?: 'Idle' | 'Loading' | 'Success' | 'Failed'
}

export interface TaskBoardServiceData {
  allTasksData: ApiPayload
}

export interface TaskBoardServiceAction { type: typeof GET_TASK_BOARD_SERVICE }

export interface GetAllTasksAction {
    type: typeof GET_ALL_TASKS,
    payLoad: Record<any, any>
}

export interface CompleteTaskAction {
  type: typeof COMPLETE_TASK,
  payLoad: Record<any, any>
}

export type TaskBoardServiceActions = TaskBoardServiceAction | GetAllTasksAction | CompleteTaskAction;

export const taskBoardService = (): TaskBoardServiceAction => ({ type: GET_TASK_BOARD_SERVICE });

export const getAllTasks = (payLoad: Record<any, any>): GetAllTasksAction => ({
  type: GET_ALL_TASKS,
  payLoad
});

export const completeTask = (payLoad: Record<any, any>): CompleteTaskAction => ({
  type: COMPLETE_TASK,
  payLoad
});
