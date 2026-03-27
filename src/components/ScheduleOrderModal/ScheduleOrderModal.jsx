import React from 'react';
import { useSelector } from 'react-redux';

import { getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { ScheduleForm } from '../ScheduleForm';

export const ScheduleOrderModal = () => {
  const { isVisible, hideModal } = useModalVisibility('ScheduleOrder');
  const order = useSelector(getOrder);

  return (
    <Modal
      title="Schedule an appointment for task"
      isOpen={isVisible}
      onClose={hideModal}
    >
      <ScheduleForm order={order} onSuccess={hideModal} />
    </Modal>
  );
};
