import cx from 'classnames';
import React from 'react';

import styles from './Status.module.scss';

export const Status = ({ children, status }) => {
  const classNames = cx(styles.status, {
    [styles[status]]: status,
  });

  return (
    <span className={classNames}>
      {children}
    </span>
  );
};
