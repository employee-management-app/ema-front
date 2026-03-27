import React from 'react';

import { ReactComponent as EmptyBox } from '../../assets/icons/empty-box.svg';

import styles from './EmptyState.module.scss';

export const EmptyState = ({ action, title, text }) => (
  <div className={styles.wrapper}>
    {title && <div className={styles.title}>{title}</div>}
    <div className={styles.icon}>
      <EmptyBox />
    </div>
    <div className={styles.text}>{text}</div>
    {action && (
      <div className={styles.action}>
        {action}
      </div>
    )}
  </div>
);
