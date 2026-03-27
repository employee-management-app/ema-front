import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import { updateEmployee as updateEmployeeInStore, setEmployee } from '../../store';
import { updateEmployee } from '../../services/updateEmployee';
import { useModalVisibility } from '../../hooks/useModalVisibility';

import { PopoverMenu } from '../PopoverMenu';

import styles from './EmployeesList.module.scss';
import { useNotification } from '../../hooks/useNotification';

export const EmployeeActions = ({ employee }) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { showModal: showEditModal } = useModalVisibility('EditEmployee');

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visible) => !visible);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const handleEditModalOpen = React.useCallback(() => {
    dispatch(setEmployee(employee));
    showEditModal();
  }, [dispatch, employee, showEditModal]);

  const toggleEmployeeStatus = React.useCallback(() => {
    updateEmployee(employee._id, { isActive: !employee.isActive })
      .then((data) => {
        dispatch(updateEmployeeInStore(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      });
  }, [dispatch, employee._id, employee.isActive, pushNotification]);

  const actions = [
    {
      label: 'Edit account',
      Icon: EditIcon,
      handler: handleEditModalOpen,
    },
    {
      label: employee.isActive ? 'Deactivate' : 'Activate',
      Icon: ExitIcon,
      theme: employee.isActive ? 'danger' : 'success',
      handler: toggleEmployeeStatus,
    },
  ];

  return (
    <PopoverMenu
      visible={isPopoverVisible}
      items={actions}
      onVisibleChange={hidePopover}
    >
      <button type="button" className={styles.actionsButton} onClick={togglePopover}>
        <DotsIcon />
      </button>
    </PopoverMenu>
  );
};
