import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { createOrder } from '../../services/createOrder';

import { addOrder, setOverlapOrders } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useAuth } from '../../hooks/useAuth';

export const DuplicateOrderForm = ({ values: { startDate, endDate, ...values }, onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { company: { requiredFields = [] } } = useAuth();
  const { showModal: showOverlapModal } = useModalVisibility('OverlapOrdersModal');
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setFields,
    setErrors,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => getOrderFormConfig(yup, values, requiredFields));

  React.useEffect(() => {
    const config = getOrderFormConfig(null, values);
    const defaultFields = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].value }), {});

    setFields(defaultFields);
    setErrors({});
  }, [values?._id]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      pushNotification({ theme: 'warning', content: 'Please fill in all required fields!' });
      return;
    }

    setIsLoading(true);

    const payload = {
      ...fields,
      files: [],
      address: {
        fullAddress: fields.fullAddress,
        code: fields.code,
        city: fields.city,
        street: fields.street,
        house: fields.house,
        flat: fields.flat,
        lat: fields.lat,
        lng: fields.lng,
      },
    };

    createOrder(payload)
      .then((data) => {
        onSuccess?.();
        dispatch(addOrder(data));

        const action = {
          to: `/orders/${data._id}`,
          label: 'Open task',
        };

        pushNotification({ theme: 'success', content: 'Task was successfully duplicated!', action });
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
    <OrderForm
      editMode
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      submitLabel="Duplicate task"
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
