import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { completeTask } from 'stores/taskBoardService';
import { injectClassNames } from 'utils/css';
import styles from './Todos.module.scss';

const {
  todos,
  todosList,
  todosPara
} = styles;

type TodosProps = {
  className?: string,
  data?: Array<any | []>,
  currentPage?: number,
  pageSize?: number,
  handleTodosCb?: (v?: number) => void
}

export default function Todos({
  className = '',
  data = [],
  currentPage = 1,
  pageSize = 10,
  handleTodosCb
}: TodosProps): JSX.Element {
  const dispatch = useDispatch();

  const currentTableData = useMemo(() => {
    if (!data) {
      return [];
    }

    const pageLength = Math.ceil(data.length / pageSize);
    if (currentPage > pageLength) { handleTodosCb?.(pageLength || 1); }
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <div className={ injectClassNames(todos, [className, !!className]) }>
      <h2>To Do</h2>
      { (currentTableData && currentTableData.length > 0) ? (
        <ul className={ todosList }>
          { currentTableData.map((item: Record<any, any>) => {
            return (
              <li key={ item?.id }>
                <input type="checkbox" name={ item?.id } id={ item?.id } onChange={ e => dispatch(completeTask({ ...item, completed: e?.target?.value })) } />
                <label htmlFor={ item?.id }>{ item?.todo }</label>
              </li>
            );
          }) }
        </ul>
      ) : (
        <p className={ todosPara }>No pending tasks available.</p>
      ) }
    </div>
  );
}
