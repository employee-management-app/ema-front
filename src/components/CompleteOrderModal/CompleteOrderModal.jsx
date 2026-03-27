import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateOrder } from '../../services/updateOrder';
import { getOrder, setOrder, deleteOrderById } from '../../store';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';

export const CompleteOrderModal = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const order = useSelector(getOrder);
  const { isVisible, hideModal } = useModalVisibility('CompleteOrder');
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();

  const handleCompleteOrder = React.useCallback(() => {
    setIsLoading(true);

    updateOrder(order._id, { status: 'completed' })
      .then((updatedOrder) => {
        dispatch(deleteOrderById(order._id));
        dispatch(setOrder(updatedOrder));
        pushNotification({ theme: 'success', content: 'Task marked as completed!' });
        hideModal();
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again later.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, hideModal, order, pushNotification]);

  return (
    <Modal
      isOpen={isVisible}
      title="Are you sure you want to complete this task?"
      onClose={hideModal}
    >
      <Grid space={SPACES.S}>
        <GridEl size="auto">
          <Button disabled={isLoading} size="medium" onClick={hideModal}>
            Cancel
          </Button>
        </GridEl>
        <GridEl size="auto">
          <Button loading={isLoading} size="medium" theme="success" onClick={handleCompleteOrder}>
            Complete task
          </Button>
        </GridEl>
      </Grid>
    </Modal>
  );
};
