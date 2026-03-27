import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

import styles from './Link.module.scss';

export const Link = ({ to, target, children }) => (
  <ReactLink to={to} target={target} className={styles.link}>
    {children}
  </ReactLink>
);
