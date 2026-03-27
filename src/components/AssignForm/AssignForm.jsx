import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { updateOrder } from '../../services/updateOrder';
import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, updateOrder as updateOrderInStore, setEmployees, setOrder, setOverlapOrders } from '../../store';

import { Select } from '../Select';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';

export const AssignForm = ({ order, onSuccess }) => {
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);

  const getConfig = (yup) => ({
    assignedEmployee: {
      value: order.assignedEmployee ? order.assignedEmployee._id : null,
      validation: yup.string().nullable(),
    },
  });

  const { showModal: showOverlapModal } = useModalVisibility('OverlapOrdersModal');
  const { pushNotification } = useNotification();
  const {
    fields,
    isTouched,
    isLoading,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  React.useEffect(() => {
    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  const employeesOptions = React.useMemo(() => (
    employees.map(({ _id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: _id,
    }))
  ), [employees]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      onSuccess();

      return;
    }

    setIsLoading(true);

    updateOrder(order._id, fields)
      .then((data) => {
        pushNotification({
          theme: 'success',
          content: data.assignedEmployee
            // eslint-disable-next-line max-len
            ? `${data.assignedEmployee.name} ${data.assignedEmployee.surname} was successfully assigned to this task!`
            // eslint-disable-next-line max-len
            : `${order.assignedEmployee.name} ${order.assignedEmployee.surname} was successfully removed from this task!`,
        });

        dispatch(updateOrderInStore(data));
        dispatch(setOrder(data));
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
          <Select
            value={fields.assignedEmployee}
            size="medium"
            placeholder="Select employee"
            options={employeesOptions}
            onClear={(val) => onValueChange(val, 'assignedEmployee')}
            onChange={(e) => onFieldChange(e, 'assignedEmployee')}
          />
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>Confirm</Button>
        </GridEl>
      </Grid>
    </form>
  );
};
