import React from 'react';
import { usePagination, DOTS } from 'hooks/events';
import { injectClassNames } from 'utils/css';
import styles from './Pagination.module.scss';

const {
  pagination,
  paginationItem,
  paginationItemArrow,
  paginationItemArrowLeft,
  paginationItemArrowRight,
  paginationItemDisabled,
  paginationItemSelected,
  paginationItemDots
} = styles;

type PaginationProps = {
  className?: string,
  totalCount?: number,
  siblingCount?: number,
  currentPage?: number,
  pageSize?: number,
  onPageChange?: (v: number) => void
}

export default function Pagination({
  className = '',
  totalCount = 0,
  siblingCount = 1,
  currentPage = 0,
  pageSize = 0,
  onPageChange
}: PaginationProps): JSX.Element {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }) as any;

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = (): void => {
    onPageChange?.(currentPage + 1);
  };

  const onPrevious = (): void => {
    onPageChange?.(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={ injectClassNames(pagination, [className, !!className]) }>
      <li
        className={ injectClassNames(paginationItem, currentPage === 1 ? paginationItemDisabled : '') }
        onClick={ () => onPrevious?.() }
      >
        <div className={ injectClassNames(paginationItemArrow, paginationItemArrowLeft) } />
      </li>
      { paginationRange && paginationRange.length > 0 && paginationRange.map((_item: any, _index: any) => {
        if (_item === DOTS) {
          return <li className={ injectClassNames( paginationItem, paginationItemDots) }>&#8230;</li>;
        }

        return (
          <li
            key={ _index }
            className={ injectClassNames(paginationItem, _item === currentPage ? paginationItemSelected : '') }
            onClick={ () => onPageChange?.(_item) }
          >
            { _item }
          </li>
        );
      }) }
      <li
        className={ injectClassNames(paginationItem, currentPage === lastPage ? paginationItemDisabled : '') }
        onClick={ () => onNext?.() }
      >
        <div className={ injectClassNames(paginationItemArrow, paginationItemArrowRight) } />
      </li>
    </ul>
  );
}
