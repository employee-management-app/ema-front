import React from 'react';

import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

import styles from './Spinner.module.scss';

export const Spinner = () => (
  <div className={styles.spinner}>
    <SpinnerIcon />
  </div>
);
