import { AppThunk } from 'stores';
import { executeGet } from 'utils/request';
import { taskBoardService, getAllTasks } from './taskBoardService.actions';

export const getTaskBoardService = (): AppThunk => async dispatch => dispatch(taskBoardService());

export const getAllTasksAPI = (queryParams?: string[]): AppThunk => (
  async dispatch => {
    const apiResponse = await executeGet(`${process?.env?.NEXT_PUBLIC_API_ENDPOINT}/todos${queryParams && queryParams.length > 0 ? `?${queryParams?.join('&')}` : ''}`);

    dispatch(getAllTasks({
      ...apiResponse,
      status: 'Success',
      message: `We received ${apiResponse?.todos.length} records successfully.`
    }));
  }
);
