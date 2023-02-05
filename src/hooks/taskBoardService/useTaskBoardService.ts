import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import { useEffect } from 'react';
import { TaskBoardServiceData, getTaskBoardService } from 'stores/taskBoardService';

const useTaskBoardService = (): TaskBoardServiceData => {
  const dispatch = useDispatch();
  const { taskBoardServiceData } = useSelector((state: RootState) => state);
  
  useEffect(() => { dispatch(getTaskBoardService()); }, []);
  
  return taskBoardServiceData;
};

export default useTaskBoardService;
