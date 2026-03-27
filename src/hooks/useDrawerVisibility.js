import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsDrawerVisible, showDrawer, hideDrawer, hideAllDrawers } from '../store';

export const useDrawerVisibility = (drawer) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(getIsDrawerVisible(drawer));

  const showDrawerHandler = React.useCallback(() => {
    dispatch(showDrawer(drawer));
  }, [dispatch, drawer]);

  const hideDrawerHandler = React.useCallback(() => {
    dispatch(hideDrawer(drawer));
  }, [dispatch, drawer]);

  const hideAllDrawersHandler = React.useCallback(() => {
    dispatch(hideAllDrawers());
  }, [dispatch]);

  const toggleDrawer = React.useCallback(() => {
    if (isVisible) {
      hideDrawerHandler();
      return;
    }

    showDrawerHandler();
  }, [hideDrawerHandler, isVisible, showDrawerHandler]);

  return {
    isVisible,
    showDrawer: showDrawerHandler,
    hideDrawer: hideDrawerHandler,
    toggleDrawer,
    hideAllDrawers: hideAllDrawersHandler,
  };
};
