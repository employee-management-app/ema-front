import cx from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { setOrder, setOrderToDuplicate, setOrderToEdit } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';

import { PopoverMenu } from '../PopoverMenu';

import styles from './OrderActions.module.scss';

export const OrderActions = ({ order, className }) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const { showDrawer: showEditDrawer } = useDrawerVisibility('EditOrder');
  const { showModal: showDeleteModal } = useModalVisibility('DeleteOrder');
  const { showModal: showCompleteModal } = useModalVisibility('CompleteOrder');
  const { showDrawer: showDuplicateDrawer } = useDrawerVisibility('DuplicateOrder');

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visible) => !visible);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const handleEditDrawerOpen = React.useCallback(() => {
    dispatch(setOrderToEdit(order));
    showEditDrawer();
  }, [dispatch, order, showEditDrawer]);

  const handleDuplicateDrawerOpen = React.useCallback(() => {
    dispatch(setOrderToDuplicate(order));
    showDuplicateDrawer();
  }, [dispatch, order, showDuplicateDrawer]);

  const handleDeleteModalOpen = React.useCallback(() => {
    dispatch(setOrder(order));
    showDeleteModal();
  }, [dispatch, order, showDeleteModal]);

  const handleCompleteModalOpen = React.useCallback(() => {
    dispatch(setOrder(order));
    showCompleteModal();
  }, [dispatch, order, showCompleteModal]);

  const actions = [
    ...(order.status !== 'completed' ? [
      {
        label: 'Complete task',
        Icon: DoneIcon,
        handler: handleCompleteModalOpen,
      },
    ] : []),
    ...(!isEmployee ? [
      ...(order.status !== 'completed' ? [
        {
          label: 'Edit task',
          Icon: EditIcon,
          handler: handleEditDrawerOpen,
        },
      ] : []),
      {
        label: 'Duplicate task',
        Icon: CopyIcon,
        handler: handleDuplicateDrawerOpen,
      },
      {
        label: 'Remove task',
        Icon: TrashIcon,
        theme: 'danger',
        handler: handleDeleteModalOpen,
      },
    ] : []),
  ];

  return (
    <div className={cx(styles.actions, className, { active: isPopoverVisible })}>
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
