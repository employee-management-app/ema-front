import React from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';

export const Card = ({ children, className, horizontal, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={cx(styles.card, className, { [styles.horizontal]: horizontal })} onClick={onClick}>
    {children}
  </div>
);
