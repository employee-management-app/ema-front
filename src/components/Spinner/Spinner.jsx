import React from 'react';
import classNames from 'classnames';

import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

import styles from './Spinner.module.scss';

export const Spinner = ({ overlay = false }) => (
  <div className={classNames(styles.spinner, { [styles.overlay]: overlay })}>
    <SpinnerIcon />
  </div>
);
