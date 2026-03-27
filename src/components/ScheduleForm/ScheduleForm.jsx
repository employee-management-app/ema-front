import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { updateOrder } from '../../services/updateOrder';
import { setOrder, setOverlapOrders, updateOrder as updateOrderInStore } from '../../store';

import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import { DateTimePicker } from '../DateTimePicker';

export const ScheduleForm = ({ order, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const { showModal: showOverlapModal } = useModalVisibility('OverlapOrdersModal');

  const getConfig = () => ({
    startDate: {
      value: order.startDate,
    },
    endDate: {
      value: order.endDate,
    },
  });

  const {
    fields,
    isTouched,
    isLoading,
    setIsLoading,
    onValueChange,
    onSubmit,
  } = useForm(getConfig);

  const handleChange = React.useCallback(([startDate, endDate]) => {
    onValueChange(startDate, 'startDate');
    onValueChange(endDate, 'endDate');
  }, [onValueChange]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      onSuccess();

      return;
    }

    setIsLoading(true);

    updateOrder(order._id, fields)
      .then((data) => {
        if (!isEmployee) {
          dispatch(updateOrderInStore(data));
          dispatch(setOrder(data));
        } else {
          navigate(data.startDate ? '/scheduled' : '/anytime');
        }

        pushNotification({
          theme: 'success',
          content: `Scheduled time successfully ${data.startDate ? 'set' : 'removed'}!`,
        });
        onSuccess();
      })
      .catch((error) => {
        if (error.response?.data.value.orders) {
          showOverlapModal();
          dispatch(setOverlapOrders({
            orders: error.response?.data.value.orders,
            order: error.response?.data.value.order,
          }));

          return;
        }

        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid space={SPACES.XL}>
        <GridEl size="12">
          <DateTimePicker
            value={[fields.startDate, fields.endDate]}
            placeholder="Schedule time"
            size="medium"
            rangeMode="time"
            onChange={handleChange}
          />
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>Confirm</Button>
        </GridEl>
      </Grid>
    </form>
  );
};
