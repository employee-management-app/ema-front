import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePlacesWidget } from 'react-google-autocomplete';

import { ReactComponent as GpsIcon } from '../../assets/icons/gps.svg';
import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, setEmployees } from '../../store';
import { getStageOptions, getProductTypeOptions } from '../../consts/order';
import { useAuth } from '../../hooks/useAuth';
import { Grid, GridEl } from '../Grid';
import { Field } from '../Field';
import { Textarea } from '../Textarea';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { DateTimePicker } from '../DateTimePicker';
import { parseLatLng } from '../../utils/parseLatLng';
import { Tooltip } from '../Tooltip';
import styles from './OrderForm.module.scss';

export const OrderForm = (props) => {
  const {
    editMode = false,
    errors,
    fields,
    isLoading,
    onFieldChange,
    onSubmit,
    onValueChange,
    submitLabel = 'Create task',
  } = props;

  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);
  const {
    user: { companyId },
    isEmployee,
    company: { requiredFields = [] },
  } = useAuth();

  const employeesOptions = React.useMemo(
    () => employees.map(({ _id, name, surname }) => ({
      label: `${name} ${surname}`,
      value: _id,
    })),
    [employees]
  );

  const { ref } = usePlacesWidget({
    options: {
      types: ['address'],
    },
    onPlaceSelected: (place) => {
      const values = Object.values(place.address_components);

      const city = values.find(
        ({ types }) => types.includes('administrative_area_level_2')
          || types.includes('locality')
      )?.long_name;
      const street = values.find(({ types }) => types.includes('route'))?.long_name;
      const code = values.find(({ types }) => types.includes('postal_code'))?.long_name;
      const house = values.find(
        ({ types }) => types.includes('street_number') || types.includes('premise')
      )?.long_name;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onValueChange(city, 'city');
      onValueChange(street, 'street');
      onValueChange(code, 'code');
      onValueChange(house, 'house');
      onValueChange(lat, 'lat');
      onValueChange(lng, 'lng');
      onValueChange(place.formatted_address, 'fullAddress');
    },
  });

  React.useEffect(() => {
    if (isEmployee) {
      return;
    }

    fetchEmployees().then((data) => {
      dispatch(setEmployees(data));
    });
  }, [isEmployee]);

  const handleScheduleTimeChange = React.useCallback(
    ([startDate, endDate]) => {
      onValueChange(startDate, 'startDate');
      onValueChange(endDate, 'endDate');
    },
    [onValueChange]
  );

  const dateTimePickerValue = React.useMemo(
    () => [fields.startDate, fields.endDate],
    [fields.endDate, fields.startDate]
  );

  const latLng = parseLatLng(fields.fullAddress);

  const handleGpsClick = () => {
    if (!latLng) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({
      location: {
        lat: latLng.lat,
        lng: latLng.lng,
      },
    }, (results, status) => {
      if (status === 'OK') {
        const place = results[0];

        if (!place) return;

        const values = Object.values(place.address_components);

        const city = values.find(
          ({ types }) => types.includes('administrative_area_level_2')
            || types.includes('locality')
        )?.long_name;
        const street = values.find(({ types }) => types.includes('route'))?.long_name;
        const code = values.find(({ types }) => types.includes('postal_code'))?.long_name;
        const house = values.find(
          ({ types }) => types.includes('street_number') || types.includes('premise')
        )?.long_name;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        onValueChange(city, 'city');
        onValueChange(street, 'street');
        onValueChange(code, 'code');
        onValueChange(house, 'house');
        onValueChange(lat, 'lat');
        onValueChange(lng, 'lng');
        onValueChange(place.formatted_address, 'fullAddress');
      }
    });
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Grid>
        <GridEl size="12">
          <Grid>
            <GridEl size="12" className={styles.addressWrapper}>
              <Field label={editMode && 'Address'} error={errors.fullAddress}>
                <Input
                  ref={ref}
                  value={fields.fullAddress}
                  placeholder="Address*"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'fullAddress')}
                />
              </Field>
              {latLng && (
                <Tooltip content="Get address from coordinates">
                  <button
                    type="button"
                    className={styles.gpsButton}
                    aria-label="Get address from coordinates"
                    onClick={handleGpsClick}
                  >
                    <GpsIcon />
                  </button>
                </Tooltip>
              )}
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'House number'} error={errors.house}>
                <Input
                  value={fields.house}
                  placeholder="House number"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'house')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Flat number'} error={errors.flat}>
                <Input
                  value={fields.flat}
                  placeholder="Flat number"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'flat')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Name'} error={errors.name}>
                <Input
                  value={fields.name}
                  placeholder={`Name${requiredFields.includes('name') ? '*' : ''}`}
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'name')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Surname'} error={errors.surname}>
                <Input
                  value={fields.surname}
                  placeholder={`Surname${requiredFields.includes('surname') ? '*' : ''}`}
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'surname')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Email'} error={errors.email}>
                <Input
                  value={fields.email}
                  placeholder={`Email${requiredFields.includes('email') ? '*' : ''}`}
                  type="email"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'email')}
                />
              </Field>
            </GridEl>
            <GridEl size="6">
              <Field label={editMode && 'Phone'} error={errors.phone}>
                <Input
                  value={fields.phone}
                  type="phone"
                  placeholder={`Phone${requiredFields.includes('phone') ? '*' : ''}`}
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'phone')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Product type'} error={errors.type}>
                <Select
                  value={fields.type}
                  options={getProductTypeOptions(companyId)}
                  placeholder="Product type*"
                  size="medium"
                  required
                  onChange={(e) => onFieldChange(e, 'type')}
                />
              </Field>
            </GridEl>
            <GridEl size={{ xs: 12, sm: 6 }}>
              <Field label={editMode && 'Stage'} error={errors.stage}>
                <Select
                  value={fields.stage}
                  options={getStageOptions(companyId)}
                  placeholder="Stage*"
                  size="medium"
                  required
                  onChange={(e) => onFieldChange(e, 'stage')}
                />
              </Field>
            </GridEl>
            {!isEmployee && (
              <GridEl size={{ xs: 12, sm: 6 }}>
                <Field
                  label={editMode && 'Assignee'}
                  error={errors.assignedEmployee}
                >
                  <Select
                    value={fields.assignedEmployee}
                    options={employeesOptions}
                    placeholder="Select employee"
                    size="medium"
                    onClear={(val) => onValueChange(val, 'assignedEmployee')}
                    onChange={(e) => onFieldChange(e, 'assignedEmployee')}
                  />
                </Field>
              </GridEl>
            )}
            <GridEl size={{ xs: 12, sm: isEmployee ? 12 : 6 }}>
              <Field
                label={editMode && 'Schedule time'}
                error={errors.startDate || errors.endDate}
              >
                <DateTimePicker
                  value={dateTimePickerValue}
                  placeholder="Schedule time"
                  size="medium"
                  rangeMode="time"
                  onChange={handleScheduleTimeChange}
                />
              </Field>
            </GridEl>
          </Grid>
        </GridEl>
        {isEmployee ? (
          <GridEl size="12">
            <Field
              label={editMode && 'Notes'}
              error={errors.employeeNotes}
            >
              <Textarea
                value={fields.employeeNotes}
                placeholder="Notes"
                size="medium"
                onChange={(e) => onFieldChange(e, 'employeeNotes')}
              />
            </Field>
          </GridEl>
        ) : (
          <>
            <GridEl size="12">
              <Field
                label={editMode && 'Description for employees'}
                error={errors.employeeMessage}
              >
                <Textarea
                  value={fields.employeeMessage}
                  placeholder="Message for employees"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'employeeMessage')}
                />
              </Field>
            </GridEl>
            <GridEl size="12">
              <Field
                label={editMode && 'Description for managers'}
                error={errors.managerMessage}
              >
                <Textarea
                  value={fields.managerMessage}
                  placeholder="Message for managers"
                  size="medium"
                  onChange={(e) => onFieldChange(e, 'managerMessage')}
                />
              </Field>
            </GridEl>
          </>
        )}
        <GridEl size="12">
          <Button type="submit" loading={isLoading}>
            {submitLabel}
          </Button>
        </GridEl>
      </Grid>
    </form>
  );
};
