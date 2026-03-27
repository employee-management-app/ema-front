import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateOrder } from '../../services/updateOrder';
import { updateOrder as updateOrderInStore } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useOrderPriority } from '../../hooks/useOrderPriority';
import { useAuth } from '../../hooks/useAuth';

import styles from './OrderPriority.module.scss';

export const OrderPriority = ({ id, disabled, ...props }) => {
  const ref = React.useRef();
  const [priority, setPriority] = React.useState(props.priority);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const { pushNotification } = useNotification();

  const handleClick = React.useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  const hideDropdown = React.useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handlePriorityClick = React.useCallback((key) => () => {
    hideDropdown();
    setPriority(key);

    updateOrder(id, { priority: key })
      .then((data) => {
        dispatch(updateOrderInStore(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
      });
  }, [hideDropdown, id, dispatch, pushNotification]);

  useClickOutside(ref, hideDropdown);

  const { icon: Icon, label, priorities } = useOrderPriority(priority);

  return (
    <span ref={ref} className={styles.wrapper}>
      <button
        type="button"
        className={cx(styles.priority, styles[`priority-${priority}`])}
        disabled={isEmployee || disabled}
        onClick={handleClick}
      >
        <Icon />
        {label}
      </button>
      {isDropdownVisible && (
        <div className={styles.priorityDropdown}>
          <ul>
            {priorities.map((p) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li
                key={p.label}
                className={cx(
                  styles.priority,
                  styles[`priority-${p.value}`],
                  // eslint-disable-next-line eqeqeq
                  { [styles.selected]: priority == p.value },
                )}
                onClick={handlePriorityClick(p.value)}
              >
                <p.icon />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};
