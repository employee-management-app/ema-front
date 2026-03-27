import React from 'react';
import cx from 'classnames';

import styles from './Text.module.scss';

export const Text = ({ size = 'base', className, center, fontWeight, italic, inline, nowrap, children }) => {
  const sizes = typeof size === 'object' ? size : { xs: size };

  const sizeClassNames = size
    ? Object.keys(sizes).map((key) => styles[`${key}${sizes[key]}`])
    : [];

  const classNames = cx(sizeClassNames, className, {
    [styles.center]: center,
    [styles[`fontWeight${fontWeight}`]]: fontWeight,
    [styles.italic]: italic,
    [styles.nowrap]: nowrap,
    [styles.inline]: inline,
  });

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
