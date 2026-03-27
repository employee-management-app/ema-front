import cx from 'classnames';
import React from 'react';

import { ReactComponent as LeftIcon } from '../../assets/icons/left.svg';
import { useBreakpointValue } from '../../hooks/useBreakpointValue';

import styles from './Pagination.module.scss';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

const DOTS_LEFT = { id: 'dots_left' };
const DOTS_RIGHT = { id: 'dots_right' };

export const Pagination = ({ limit = 9, total = 0, offset = 0, onChange }) => {
  const siblingCount = useBreakpointValue({ SM: 2 }, 1);

  const currentPage = React.useMemo(() => (
    Math.floor(Math.max(0, offset) / limit) + 1
  ), [limit, offset]);

  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(total / limit);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS_RIGHT, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [1, DOTS_LEFT, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS_LEFT, ...middleRange, DOTS_RIGHT, totalPageCount];
  }, [total, limit, siblingCount, currentPage]);

  const handleClick = (value) => () => {
    onChange((value - 1) * limit);
  };

  if (total <= limit) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        disabled={currentPage === 1}
        className={cx(styles.button, styles.arrow)}
        onClick={handleClick(currentPage - 1)}
      >
        <LeftIcon />
      </button>
      {paginationRange.map((value) => (value.id ? (
        <span key={value.id} className={cx(styles.button, styles.dots)}>...</span>
      ) : (
        <button
          key={value}
          type="button"
          className={cx(styles.button, { [styles.active]: value === currentPage })}
          onClick={handleClick(value)}
        >
          {value}
        </button>
      )))}
      <button
        type="button"
        disabled={currentPage * limit > total}
        className={cx(styles.button, styles.arrow)}
        onClick={handleClick(currentPage + 1)}
      >
        <LeftIcon />
      </button>
    </div>
  );
};
