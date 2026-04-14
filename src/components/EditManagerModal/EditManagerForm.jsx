import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { updateManager as updateManagerInStore } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { createPhoneValidationTest } from '../../utils/phoneValidation';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { PhoneNumberField } from '../PhoneNumberField';
import { Button } from '../Button';
import { updateManager } from '../../services/updateManager';
import { Checkbox } from '../Checkbox';
import { useAuth } from '../../hooks/useAuth';

export const EditManagerForm = ({ manager, onSuccess }) => {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { pushNotification } = useNotification();

  const {
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onValueChange,
    onSubmit,
  } = useForm((yup) => ({
    email: {
      value: manager.email,
      validation: yup.string().email().max(100).required(),
    },
    name: {
      value: manager.name,
      validation: yup.string().max(100).required(),
    },
    surname: {
      value: manager.surname,
      validation: yup.string().max(100).required(),
    },
    phone: {
      value: manager.phone,
      validation: yup
        .string()
        .required('Phone number is required')
        .test(createPhoneValidationTest()),
    },
    isOwner: {
      value: manager.role === 'owner',
      validation: yup.boolean(),
    },
    isEmployee: {
      value: manager.hasEmployeeRights ?? false,
      validation: yup.boolean(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isTouched) {
      onSuccess?.();
    }

    if (!isValid || !isTouched) {
      return;
    }

    setIsLoading(true);

    updateManager(manager._id, { ...fields })
      .then((data) => {
        onSuccess?.();
        dispatch(updateManagerInStore(data));
        pushNotification({ theme: 'success', content: 'Account information was successfully updated!' });
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid space={SPACES.L}>
        <GridEl size="12">
          <Grid>
            <GridEl size="6">
              <Field label="Name" error={errors.name}>
                <Input
                  value={fields.name}
                  placeholder="Name"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label="Surname" error={errors.surname}>
                <Input
                  value={fields.surname}
                  placeholder="Surname"
                  onChange={(e) => onFieldChange(e, 'surname')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label="Email" error={errors.email}>
                <Input
                  type="email"
                  disabled
                  value={fields.email}
                  placeholder="Email"
                  onChange={(e) => onFieldChange(e, 'email')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label="Phone" error={errors.phone}>
                <PhoneNumberField
                  value={fields.phone}
                  onChange={(e) => onFieldChange(e, 'phone')}
                  country="PL"
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Grid space={SPACES.S}>
                {user._id !== manager._id && (
                  <GridEl size="12">
                    <Checkbox checked={fields.isOwner} onChange={(e) => onValueChange(e.target.checked, 'isOwner')}>
                      Administrator rights
                    </Checkbox>
                  </GridEl>
                )}
                <GridEl size="12">
                  <Checkbox checked={fields.isEmployee} onChange={(e) => onValueChange(e.target.checked, 'isEmployee')}>
                    Employee rights
                  </Checkbox>
                </GridEl>
              </Grid>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading} disabled={!isValid}>
            Update account
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
