import React from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from '../../hooks/useAuth';
import { getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { AssignForm } from '../AssignForm';

export const AssignOrderModal = () => {
  const { isEmployee } = useAuth();
  const { isVisible, hideModal } = useModalVisibility('AssignOrder');
  const order = useSelector(getOrder);

  if (isEmployee) {
    return null;
  }

  return (
    <Modal
      title="Assign employee to task"
      isOpen={isVisible}
      onClose={hideModal}
    >
      <AssignForm order={order} onSuccess={hideModal} />
    </Modal>
  );
};
