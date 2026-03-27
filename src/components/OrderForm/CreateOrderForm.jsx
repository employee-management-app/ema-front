import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useAuth } from '../../hooks/useAuth';
import { createOrder } from '../../services/createOrder';
import { getStageOptions } from '../../consts/order';

import { addOrder, setOverlapOrders } from '../../store';

import { OrderForm } from './OrderForm';
import { getOrderFormConfig } from './getOrderFormConfig';

export const CreateOrderForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { user: { _id, companyId }, isEmployee, company: { requiredFields = [] } } = useAuth();
  const stageOptions = getStageOptions(companyId);
  const defaultValues = stageOptions.length === 1 ? { stage: stageOptions[0].value } : {};
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => getOrderFormConfig(yup, defaultValues, requiredFields));
  const { showModal: showOverlapModal } = useModalVisibility('OverlapOrdersModal');

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      pushNotification({ theme: 'warning', content: 'Please fill in all required fields!' });

      return;
    }

    setIsLoading(true);

    const payload = {
      ...fields,
      ...(isEmployee && { assignedEmployee: _id }),
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
        pushNotification({ theme: 'success', content: 'Task was successfully created!' });
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
      isLoading={isLoading}
      fields={fields}
      errors={errors}
      onFieldChange={onFieldChange}
      onValueChange={onValueChange}
      onSubmit={handleSubmit}
    />
  );
};
