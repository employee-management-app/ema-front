import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import { setManager, updateManager as updateManagerInStore } from '../../store';
import { updateManager } from '../../services/updateManager';

import { PopoverMenu } from '../PopoverMenu';

import styles from './ManagerActions.module.scss';
import { useNotification } from '../../hooks/useNotification';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useAuth } from '../../hooks/useAuth';

export const ManagerActions = ({ manager }) => {
  const { user } = useAuth();

  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { showModal: showEditModal } = useModalVisibility('EditManager');

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visible) => !visible);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const handleEditModalOpen = React.useCallback(() => {
    dispatch(setManager(manager));
    showEditModal();
  }, [dispatch, manager, showEditModal]);

  const toggleManagerStatus = React.useCallback(() => {
    updateManager(manager._id, { isActive: !manager.isActive })
      .then((data) => {
        dispatch(updateManagerInStore(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      });
  }, [dispatch, manager._id, manager.isActive, pushNotification]);

  const actions = [
    {
      label: 'Edit account',
      Icon: EditIcon,
      handler: handleEditModalOpen,
    },
    ...(user._id !== manager._id ? [
      {
        label: manager.isActive ? 'Deactivate' : 'Activate',
        Icon: ExitIcon,
        theme: manager.isActive ? 'danger' : 'success',
        handler: toggleManagerStatus,
      },
    ] : []),
  ];

  return (
    <div className={styles.wrapper}>
      <PopoverMenu
        visible={isPopoverVisible}
        items={actions}
        onVisibleChange={hidePopover}
      >
        <button type="button" className={styles.actionsButton} onClick={togglePopover}>
          <DotsIcon />
        </button>
      </PopoverMenu>
    </div>
  );
};
