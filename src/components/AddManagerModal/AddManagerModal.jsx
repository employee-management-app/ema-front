import React from 'react';

import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';

import { AddManagerForm } from './AddManagerForm';

export const AddManagerModal = () => {
  const { isVisible, hideModal } = useModalVisibility('AddManager');

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Invite new manager"
      onClose={hideModal}
    >
      <AddManagerForm onSuccess={hideModal} />
    </Modal>
  );
};
