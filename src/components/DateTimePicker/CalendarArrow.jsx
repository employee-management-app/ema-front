import React from 'react';

import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg';

import styles from './DateTimePicker.module.scss';

export const CalendarArrow = ({ onClick }) => (
  <button
    type="button"
    className={styles.arrow}
    onClick={onClick}
  >
    <ArrowRightIcon />
  </button>
);
