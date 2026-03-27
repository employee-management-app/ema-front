import React from 'react';

import styles from './AppSpinner.module.scss';
import { Spinner } from '../Spinner';
import logoImage from '../../assets/images/logo.svg';

export const AppSpinner = () => (
  <div className={styles.wrapper}>
    <img src={logoImage} alt="Employee management app" />
    <Spinner />
  </div>
);
