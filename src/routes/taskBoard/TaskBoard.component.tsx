import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useTaskBoardService } from 'hooks/taskBoardService';
import { getAllTasks, getAllTasksAPI } from 'stores/taskBoardService';
import A2HS from 'components/a2hs';
import Icon from 'components/icon';
import Pagination from 'components/pagination';
import Todos from 'routes/taskBoard/todos';
import styles from './TaskBoard.module.scss';

const {
  taskBoard,
  taskBoardContainer,
  taskBoardCompleted,
  taskBoardPending,
  taskBoardPara
} = styles;

export default function TaskBoard(): JSX.Element {
  const dispatch = useDispatch();
  const { allTasksData } = useTaskBoardService();
  const [completedTasks, setCompletedTasks] = useState([] as Array<any | []>);
  const [pendingTasks, setPendingTasks] = useState([] as Array<any | []>);
  const [currentPage, setCurrentPage] = useState(1 as number);
  const [pageSize] = useState(10 as number);

  useEffect(() => {
    if (!('todos' in allTasksData) || allTasksData?.todos.length === 0) {
      handleGetAllTasks?.(30, 0);
    }
  }, []);

  useEffect(() => {
    if (allTasksData?.status !== 'Loading' && allTasksData?.todos && allTasksData?.todos.length > 0) {
      setCompletedTasks(allTasksData?.todos.filter((todo: Record<any, any>) => todo?.completed));
      setPendingTasks(allTasksData?.todos.filter((todo: Record<any, any>) => !todo?.completed));
    }
  }, [allTasksData]);

  const handleTasksTableData = (changeObj: Record<any, any>): void => {
    if ((changeObj && Object.keys(changeObj).length > 0)
      && allTasksData?.todos && allTasksData?.todos.length > 0
      && allTasksData?.todos.length < allTasksData?.total
    ) {
      const pagonationCount = (changeObj?.currentRowsPerPage * changeObj?.page) as number;
      if (pagonationCount === (allTasksData?.todos.length - 10) || pagonationCount > allTasksData?.todos.length) {
        handleGetAllTasks?.(pagonationCount > allTasksData?.todos.length ? (pagonationCount - 30) : allTasksData?.limit, allTasksData?.todos.length);
      }
    }
  };

  const handleGetAllTasks = (limit?: number, skip?: number): void => {
    dispatch(getAllTasks(skip && skip === 0 ? { todos: Array(10).fill({ id: '', userId: '', todo: '', completed: true }), status: 'Loading' } : { status: 'Loading' }));

    const queryParams=[] as string[];
    queryParams.push(`limit=${limit}`);
    queryParams.push(`skip=${skip}`);
    dispatch(getAllTasksAPI(queryParams));
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="og:title" content="Task Board" />
        <meta name="description" property="og:description" content="Building an interface for Task Board." />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Head>
      <main className={ taskBoard }>
        <section>
          <A2HS />
          <div className={ taskBoardContainer }>
            { (allTasksData?.status === 'Loading' && (!('todos' in allTasksData) || allTasksData?.todos.length === 0)) ? (
              <p className={ taskBoardPara }><Icon asset="Basic-Loader" /> Please wait, we are trying to get all Tasks...</p>
            ) : ((allTasksData?.todos &&  allTasksData?.todos.length > 0) && (
              <>
                { allTasksData?.status === 'Loading' && (
                  <p className={ taskBoardPara }><Icon asset="Basic-Loader" /> Please wait, we are trying to get more Tasks...</p>
                ) }

                <div className={ taskBoardCompleted }>
                  <h2>I did it!</h2>
                  { (completedTasks && completedTasks.length > 0) ? (
                    <ul>
                      { completedTasks.map((item: Record<any, any>) => {
                        return (
                          <li key={ item?.id }>
                            { item?.todo }
                          </li>
                        );
                      }) }
                    </ul>
                  ) : (
                    <p className={ taskBoardPara }>No tasks completed so far.</p>
                  ) }
                </div>

                <Todos
                  className={ taskBoardPending }
                  data={ pendingTasks }
                  currentPage={ currentPage }
                  pageSize={ pageSize }
                  handleTodosCb={ (v?: number) => setCurrentPage(v as number) }
                />

                <Pagination
                  className="pagination-bar"
                  currentPage={ currentPage }
                  totalCount={ ((allTasksData?.total === allTasksData?.todos.length) ? pendingTasks.length : allTasksData?.total) || 0 }
                  pageSize={ pageSize }
                  onPageChange={ page => {
                    setCurrentPage(page);
                    handleTasksTableData?.({
                      totalRows: ((allTasksData?.total === allTasksData?.todos.length) ? pendingTasks.length : allTasksData?.total) || 0,
                      currentRowsPerPage: pageSize,
                      page: page
                    });
                  } }
                />
              </>
            )) }
          </div>
        </section>
      </main>
    </>
  );
}
