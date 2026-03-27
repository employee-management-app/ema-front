import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { updateEmployee as updateEmployeeInStore } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { updateEmployee } from '../../services/updateEmployee';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { Button } from '../Button';

export const EditEmployeeForm = ({ employee, onSuccess }) => {
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
    onSubmit,
  } = useForm((yup) => ({
    email: {
      value: employee.email,
      validation: yup.string().email().max(100).required(),
    },
    name: {
      value: employee.name,
      validation: yup.string().max(100).required(),
    },
    surname: {
      value: employee.surname,
      validation: yup.string().max(100).required(),
    },
    phone: {
      value: employee.phone,
      validation: yup.string().min(6).max(100).required(),
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

    updateEmployee(employee._id, fields)
      .then((data) => {
        onSuccess?.();
        dispatch(updateEmployeeInStore(data));
        pushNotification({ theme: 'success', content: 'Employee account information was successfully updated!' });
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
                <Input
                  value={fields.phone}
                  placeholder="Phone"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            Update account
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
