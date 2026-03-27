import cx from 'classnames';
import React from 'react';

import { useAuth } from '../../hooks/useAuth';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';

import styles from './CreateOrderButton.module.scss';

export const CreateOrderButton = () => {
  const { isAdmin } = useAuth();
  const { showDrawer, isVisible } = useDrawerVisibility('CreateOrder');

  if (isAdmin) {
    return null;
  }

  return (
    <button type="button" className={cx(styles.button, { [styles.hidden]: isVisible })} onClick={showDrawer}>
      <PlusIcon />
    </button>
  );
};
