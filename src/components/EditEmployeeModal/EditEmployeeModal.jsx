import React from 'react';
import { useSelector } from 'react-redux';

import { getEmployee } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';

import { EditEmployeeForm } from './EditEmployeeForm';

export const EditEmployeeModal = () => {
  const { isVisible, hideModal } = useModalVisibility('EditEmployee');
  const employee = useSelector(getEmployee);

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title={`Edit "${employee?.name}" account`}
      onClose={hideModal}
    >
      <EditEmployeeForm employee={employee} onSuccess={hideModal} />
    </Modal>
  );
};
