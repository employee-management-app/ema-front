import React from 'react';
import cx from 'classnames';

import styles from './Grid.module.scss';

export const GridEl = ({ size, children, filled, className }) => {
  const sizes = typeof size === 'object' ? size : { xs: size };
  const classNames = size
    ? Object.keys(sizes).map((key) => styles[`${key}${sizes[key]}`])
    : [];

  return (
    <div className={cx(classNames, { [styles.filled]: filled }, className)}>
      {children}
    </div>
  );
};
