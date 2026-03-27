import cx from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/statuses/info.svg';
import { ReactComponent as SuccessIcon } from '../../assets/icons/statuses/success.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/statuses/warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/statuses/error.svg';
import { removeNotificationById, getNotifications } from '../../store';
import { Button } from '../Button';

import styles from './Notifications.module.scss';

const ICONS = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(getNotifications);

  const handleCloseButtonClick = React.useCallback((id) => {
    dispatch(removeNotificationById(id));
  }, [dispatch]);

  const handleActionClick = (notification) => () => {
    notification.action?.onClick?.();
    dispatch(removeNotificationById(notification.id));
  };

  return (
    <div className={styles.notifications}>
      <TransitionGroup>
        {notifications.map((notification) => {
          const ThemeIcon = ICONS[notification.theme];

          return (
            <CSSTransition
              key={notification.id}
              timeout={400}
            >
              <div className={cx(styles.notification, styles[notification.theme])}>
                <ThemeIcon />
                <div>
                  {notification.content}
                  {notification.action && (
                    <div className={styles.action}>
                      <Button to={notification.action.to} onClick={handleActionClick(notification)}>
                        {notification.action.label}
                      </Button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => handleCloseButtonClick(notification.id)}
                >
                  <CloseIcon />
                </button>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};
