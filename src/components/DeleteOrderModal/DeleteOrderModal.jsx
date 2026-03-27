import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteOrder } from '../../services/deleteOrder';
import { deleteOrderById, getOrder } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';

export const DeleteOrderModal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const order = useSelector(getOrder);
  const { isVisible, hideModal } = useModalVisibility('DeleteOrder');
  const { pushNotification } = useNotification();

  const handleDeleteOrder = React.useCallback(() => {
    setIsLoading(true);
    hideModal();

    deleteOrder(order._id)
      .then(() => {
        pushNotification({ theme: 'success', content: 'Task was successfully removed!' });
        dispatch(deleteOrderById(order._id));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, hideModal, order?._id, pushNotification]);

  return (
    <Modal
      isOpen={isVisible}
      title="Are you sure you want to remove this task?"
      onClose={hideModal}
    >
      <Grid space={SPACES.S}>
        <GridEl size="auto">
          <Button disabled={isLoading} size="medium" onClick={hideModal}>
            Cancel
          </Button>
        </GridEl>
        <GridEl size="auto">
          <Button loading={isLoading} size="medium" theme="danger" onClick={handleDeleteOrder}>
            Remove task
          </Button>
        </GridEl>
      </Grid>
    </Modal>
  );
};
