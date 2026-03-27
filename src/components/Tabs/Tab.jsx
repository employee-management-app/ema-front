import cx from 'classnames';
import React from 'react';

import { TabsContext } from './Tabs';
import styles from './Tabs.module.scss';

export const Tab = ({ id, children, ...props }) => {
  const { active, setActive } = React.useContext(TabsContext);

  const onClick = React.useCallback(() => {
    setActive(id);
  }, [id, setActive]);

  return (
    <button
      type="button"
      className={cx(styles.tab, { [styles.active]: active === id })}
      onClick={onClick}
    >
      {props.icon && <props.icon />}
      {children}
    </button>
  );
};
