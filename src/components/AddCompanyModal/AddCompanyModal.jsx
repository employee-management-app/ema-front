import React from 'react';

import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Modal } from '../Modal';
import { AddCompanyForm } from './AddCompanyForm';

export const AddCompanyModal = () => {
  const { isVisible, hideModal } = useModalVisibility('AddCompany');

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Add new company"
      onClose={hideModal}
    >
      <AddCompanyForm onSuccess={hideModal} />
    </Modal>
  );
};
