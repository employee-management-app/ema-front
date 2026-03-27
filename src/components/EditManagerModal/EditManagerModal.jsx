import React from 'react';
import { useSelector } from 'react-redux';

import { getManager } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';

import { EditManagerForm } from './EditManagerForm';

export const EditManagerModal = () => {
  const { isVisible, hideModal } = useModalVisibility('EditManager');
  const manager = useSelector(getManager);

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title={`Edit "${manager?.name}" account`}
      onClose={hideModal}
    >
      <EditManagerForm manager={manager} onSuccess={hideModal} />
    </Modal>
  );
};
