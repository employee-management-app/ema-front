import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { getCompany, getManagers, setManagers } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { addManager } from '../../services/addManager';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

export const AddManagerForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const managers = useSelector(getManagers);
  const company = useSelector(getCompany);
  const { pushNotification } = useNotification();
  const { user } = useAuth();

  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onValueChange,
    onSubmit,
  } = useForm((yup) => ({
    email: {
      value: '',
      validation: yup.string().email().max(100).required(),
    },
    name: {
      value: '',
      validation: yup.string().max(100).required(),
    },
    surname: {
      value: '',
      validation: yup.string().max(100).required(),
    },
    phone: {
      value: '',
      validation: yup.string().min(6).max(100).required(),
    },
    isOwner: {
      value: false,
      validation: yup.boolean(),
    },
    isEmployee: {
      value: false,
      validation: yup.boolean(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    addManager({ ...fields, companyId: user.companyId ?? company._id })
      .then((data) => {
        onSuccess?.();
        dispatch(setManagers([...managers, data]));
        pushNotification({ theme: 'success', content: 'Invitation link has been sent to the manager!' });
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        pushNotification({ theme: 'error', content });
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
              <Field error={errors.name}>
                <Input
                  value={fields.name}
                  placeholder="Name"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.surname}>
                <Input
                  value={fields.surname}
                  placeholder="Surname"
                  onChange={(e) => onFieldChange(e, 'surname')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.email}>
                <Input
                  type="email"
                  value={fields.email}
                  placeholder="Email"
                  onChange={(e) => onFieldChange(e, 'email')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field error={errors.phone}>
                <Input
                  value={fields.phone}
                  placeholder="Phone"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Grid space={SPACES.S}>
                <GridEl size="12">
                  <Checkbox checked={fields.isOwner} onChange={(e) => onValueChange(e.target.checked, 'isOwner')}>
                    Administrator rights
                  </Checkbox>
                </GridEl>
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
          <Button type="submit" loading={isLoading}>
            Invite
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
