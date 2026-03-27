import React from 'react';
import cx from 'classnames';

import styles from './Container.module.scss';

export const Container = ({ children, className, width, height, withoutPaddings }) => {
  const classNames = cx(styles.container, className, {
    [styles.fullHeight]: height === 'full',
    [styles.fullWidth]: width === 'full',
    [styles.withoutPaddings]: withoutPaddings,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
