import React from 'react';
import { useDispatch } from 'react-redux';

import { pushNotification as pushNotificationToStore, removeNotificationById } from '../store';

export const useNotification = () => {
  const dispatch = useDispatch();

  const pushNotification = React.useCallback((notification, duration = 7000) => {
    const id = `${Date.now()}`;

    dispatch(pushNotificationToStore({ id, ...notification }));

    if (!notification.manualClose) {
      setTimeout(() => {
        dispatch(removeNotificationById(id));
      }, duration);
    }
  }, [dispatch]);

  return {
    pushNotification,
  };
};
