import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsModalVisible, showModal, hideModal, hideAllModals } from '../store';

export const useModalVisibility = (modal) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(getIsModalVisible(modal));

  const showModalHandler = React.useCallback(() => {
    dispatch(showModal(modal));
  }, [dispatch, modal]);

  const hideModalHandler = React.useCallback(() => {
    dispatch(hideModal(modal));
  }, [dispatch, modal]);

  const hideAllModalsHandler = React.useCallback(() => {
    dispatch(hideAllModals());
  }, [dispatch]);

  return {
    isVisible,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    hideAllModals: hideAllModalsHandler,
  };
};
