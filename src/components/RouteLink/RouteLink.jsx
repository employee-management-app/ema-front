import React from 'react';

import { ReactComponent as DirectionIcon } from '../../assets/icons/direction.svg';

import styles from './RouteLink.module.scss';

export const RouteLink = ({ href, label = 'Show route', icon: Icon = DirectionIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.routeLink}
  >
    <span>{label}</span>
    <Icon />
  </a>
);
