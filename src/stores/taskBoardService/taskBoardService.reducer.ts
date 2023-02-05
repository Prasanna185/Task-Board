import { unionByMap } from 'utils/common';
import {
  TaskBoardServiceActions,
  TaskBoardServiceData,
  GET_TASK_BOARD_SERVICE,
  GET_ALL_TASKS,
  COMPLETE_TASK
} from './taskBoardService.actions';

type TaskBoardServiceState = TaskBoardServiceData;

const initialState: TaskBoardServiceState = {
  allTasksData: { status: 'Idle' }
};

export default (
  state: TaskBoardServiceState = initialState,
  action: TaskBoardServiceActions
): TaskBoardServiceState => {
  switch (action.type) {
  case GET_ALL_TASKS: {
    const { payLoad } = action;

    return {
      ...state,
      allTasksData : {
        ...state?.allTasksData,
        ...payLoad,
        todos:((payLoad?.status === 'Success' && payLoad?.todos && payLoad?.todos.length > 0)
          ? state?.allTasksData?.todos && state?.allTasksData?.todos.length > 0 ? unionByMap([state?.allTasksData?.todos, payLoad?.todos], 'id') : payLoad?.todos
          : state?.allTasksData?.todos && state?.allTasksData?.todos.length > 0 ? state?.allTasksData?.todos : []
        )
      }
    };
  }

  case COMPLETE_TASK: {
    const { payLoad } = action;

    return {
      ...state,
      allTasksData : {
        ...state?.allTasksData,
        ...payLoad,
        todos: state?.allTasksData?.todos.map((todo: { id: number }) => {
          if (todo?.id === payLoad?.id) {
            return payLoad;
          }
        
          return todo;
        })
      }
    };
  }

  case GET_TASK_BOARD_SERVICE:
  default:
    return state;
  }
};
