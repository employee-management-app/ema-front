import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { updateOrder } from '../../services/updateOrder';

import { setOrder, setOverlapOrders, updateOrder as updateOrderInStore } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useAuth } from '../../hooks/useAuth';

export const EditOrderForm = ({ values, onSuccess }) => {
  const dispatch = useDispatch();
  const { company: { requiredFields = [] } } = useAuth();
  const { pushNotification } = useNotification();
  const { showModal: showOverlapModal } = useModalVisibility('OverlapOrdersModal');
  const {
    fields,
    errors,
    isTouched,
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
  }, [values]);

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      onSuccess?.();
      return;
    }

    if (!isValid) {
      pushNotification({ theme: 'warning', content: 'Please fill in all required fields!' });
      return;
    }

    setIsLoading(true);

    const payload = {
      ...fields,
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

    updateOrder(values._id, payload)
      .then((data) => {
        onSuccess?.();
        dispatch(updateOrderInStore(data));
        dispatch(setOrder(data));
        pushNotification({ theme: 'success', content: 'Task was successfully updated!' });
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
      submitLabel="Save changes"
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
