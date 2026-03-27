import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { Popover } from '../Popover';

import styles from './PopoverMenu.module.scss';

export const PopoverMenu = ({ items, visible, children, onVisibleChange }) => {
  const hidePopover = React.useCallback(() => {
    onVisibleChange(false);
  }, [onVisibleChange]);

  const handleClick = React.useCallback((handler) => () => {
    hidePopover();
    handler();
  }, [hidePopover]);

  return (
    <Popover
      visible={visible}
      className={styles.popover}
      placement="bottom-right"
      content={(
        <ul className={styles.list}>
          {items.map(({ label, Icon, handler, to, theme }) => (
            <li key={label} className={styles.item}>
              {handler && (
                <button
                  type="button"
                  className={cx(styles.button, { [styles[theme]]: theme })}
                  onClick={handleClick(handler)}
                >
                  {Icon && <Icon />}
                  {label}
                </button>
              )}
              {to && (
                <Link to={to} className={cx(styles.button, { [styles[theme]]: theme })} onClick={hidePopover}>
                  {Icon && <Icon />}
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Popover>
  );
};
