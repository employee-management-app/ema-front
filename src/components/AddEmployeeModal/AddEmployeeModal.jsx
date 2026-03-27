import React from 'react';

import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';

import { AddEmployeeForm } from './AddEmployeeForm';

export const AddEmployeeModal = () => {
  const { isVisible, hideModal } = useModalVisibility('AddEmployee');

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Invite new employee"
      onClose={hideModal}
    >
      <AddEmployeeForm onSuccess={hideModal} />
    </Modal>
  );
};
