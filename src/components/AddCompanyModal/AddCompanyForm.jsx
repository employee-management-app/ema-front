import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { getCompanies, setCompanies } from '../../store';
import { useNotification } from '../../hooks/useNotification';
import { addCompany } from '../../services/addCompany';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { UploadInput } from '../UploadInput';
import { Button } from '../Button';

export const AddCompanyForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const { pushNotification } = useNotification();

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
    name: {
      value: '',
      validation: yup.string().max(100).required(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.set('name', fields.name);
    if (fields.logo) {
      formData.set('logo', fields.logo);
    }

    setIsLoading(true);

    addCompany(formData)
      .then((data) => {
        onSuccess?.();
        dispatch(setCompanies([...companies, data]));
        pushNotification({ theme: 'success', content: 'The company was added.' });
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
            <GridEl size="12">
              <Field error={errors.name}>
                <Input
                  value={fields.name}
                  placeholder="Name"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Field error={errors.logo}>
                <UploadInput
                  placeholder="Logo (Upload...)"
                  onChange={(file) => onValueChange(file, 'logo')}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            Add
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
