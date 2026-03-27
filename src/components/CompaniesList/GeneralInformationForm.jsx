import React from 'react';

import { useForm } from '../../hooks/useForm';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';

import styles from './GeneralInformation.module.scss';
import { FIELD_LABELS } from '../../consts/company';

const REQUIRED_FIELD_OPTIONS = [
  {
    name: 'address',
    label: FIELD_LABELS.address,
    disabled: true,
  },
  {
    name: 'type',
    label: FIELD_LABELS.type,
    disabled: true,
  },
  {
    name: 'stage',
    label: FIELD_LABELS.stage,
    disabled: true,
  },
  {
    name: 'phone',
    label: FIELD_LABELS.phone,
  },
  {
    name: 'email',
    label: FIELD_LABELS.email,
  },
  {
    name: 'name',
    label: FIELD_LABELS.name,
  },
  {
    name: 'surname',
    label: FIELD_LABELS.surname,
  },
];

export const GeneralInformationForm = ({ company, ...props }) => {
  const {
    fields,
    errors,
    isValid,
    onValueChange,
    onFieldChange,
    onSubmit,
  } = useForm((yup) => ({
    name: {
      value: company.name,
      validation: yup.string().max(100).required(),
    },
    canAddImages: {
      value: company.canAddImages,
      validation: yup.boolean(),
    },
    requiredFields: {
      value: company.requiredFields,
      validation: yup.array().of(yup.string()).required(),
    },
    allowOverlappingOrders: {
      value: company.allowOverlappingOrders,
      validation: yup.boolean(),
    },
  }));

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    props.onSubmit(fields);
  };

  return (
    <form id="general-information-form" noValidate onSubmit={handleSubmit}>
      <Grid>
        <GridEl size="12">
          <Field label="Company name" error={errors.name}>
            <Input
              value={fields.name}
              placeholder="Name"
              onChange={(e) => onFieldChange(e, 'name')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Required fields" error={errors.requiredFields}>
            <select
              multiple
              value={fields.requiredFields}
              className={styles.multiselect}
              onChange={(e) => {
                const options = [...e.target.selectedOptions];
                const values = options.map((option) => option.value);
                onValueChange(values.includes('address')
                  ? values
                  : [...values, 'address', 'type', 'stage'], 'requiredFields');
              }}
            >
              {REQUIRED_FIELD_OPTIONS.map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </GridEl>
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="12">
              <Checkbox checked={fields.canAddImages} onChange={(e) => onValueChange(e.target.checked, 'canAddImages')}>
                Can add images
              </Checkbox>
            </GridEl>
            <GridEl size="12">
              <Checkbox
                checked={fields.allowOverlappingOrders}
                onChange={(e) => onValueChange(e.target.checked, 'allowOverlappingOrders')}
              >
                Allow overlapping orders
              </Checkbox>
            </GridEl>
          </Grid>
        </GridEl>
      </Grid>
    </form>
  );
};
