import React from 'react';
import cx from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { format, differenceInDays, addDays, subDays, isSameDay, isSameYear } from 'date-fns';

import { ReactComponent as LeftIcon } from '../../assets/icons/left.svg';
import { ReactComponent as RightIcon } from '../../assets/icons/right.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { stringToDate } from '../../utils/stringToDate';

import { DateTimePicker } from '../DateTimePicker';

import styles from './DateFilter.module.scss';
import { Button } from '../Button';

export const DateFilter = ({ theme, defaultValue, required, dayRange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState(defaultValue ?? [null, null]);

  const updateValue = React.useCallback(() => {
    if (defaultValue) {
      return;
    }

    const start = searchParams.get('startDate') || null;
    const end = searchParams.get('endDate') || null;

    setValue([stringToDate(start), stringToDate(end)]);
  }, [defaultValue, searchParams]);

  React.useEffect(updateValue, [updateValue]);

  const updateSearchParams = React.useCallback(([start, end]) => {
    const startString = start ? format(start, 'dd-MM-yyyy') : null;
    const endString = end ? format(end, 'dd-MM-yyyy') : null;

    if (!start || end) {
      if (start) {
        searchParams.set('startDate', startString);
      } else {
        searchParams.delete('startDate');
      }

      if (end) {
        searchParams.set('endDate', endString);
      } else {
        searchParams.delete('endDate');
      }
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const resetValue = React.useCallback((callback) => () => {
    callback();
    setValue([null, null]);
    updateSearchParams([null, null]);
  }, [updateSearchParams]);

  const handleChange = React.useCallback((newValue) => {
    if (dayRange) {
      setValue([newValue[0], newValue[0]]);
      updateSearchParams([newValue[0], newValue[0]]);

      return;
    }

    setValue(newValue);
    updateSearchParams(newValue);
  }, [dayRange, updateSearchParams]);

  const handleClose = React.useCallback(() => {
    const [, end] = value;

    if (!end) {
      updateValue();
    }
  }, [updateValue, value]);

  const handlePrevClick = React.useCallback(() => {
    const [start, end] = value;

    const newValue = [
      subDays(start, -differenceInDays(start, end) + 1),
      subDays(start, 1),
    ];

    setValue(newValue);
    updateSearchParams(newValue);
  }, [value, updateSearchParams]);

  const handleNextClick = React.useCallback(() => {
    const [start, end] = value;

    const newValue = [
      addDays(end, 1),
      addDays(end, -differenceInDays(start, end) + 1),
    ];

    setValue(newValue);
    updateSearchParams(newValue);
  }, [value, updateSearchParams]);

  const displayValue = React.useMemo(() => {
    const [start, end] = value;

    if (!start) {
      return theme === 'input' ? 'Select date' : <CalendarIcon />;
    }

    if (!end || isSameDay(start, end)) {
      return format(start, 'iii, dd MMM yyyy');
    }

    return `${format(start, `dd MMM${isSameYear(start, end) ? '' : ' yyyy'}`)} - ${format(end, 'dd MMM yyyy')}`;
  }, [theme, value]);

  const defaultTemplate = ({ closePopover, togglePopover }) => (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {value[1] && (
          <button type="button" className={styles.button} onClick={handlePrevClick}>
            <LeftIcon />
          </button>
        )}
        <button
          type="button"
          className={cx(styles.button, { [styles.selected]: value[0] })}
          onClick={togglePopover}
        >
          {displayValue}
        </button>
        {value[1] && (
          <button type="button" className={styles.button} onClick={handleNextClick}>
            <RightIcon />
          </button>
        )}
      </div>
      {value[1] && !required && (
        <button type="button" className={styles.closeButton} onClick={resetValue(closePopover)}>
          <CloseIcon />
        </button>
      )}
    </div>
  );

  const inputTemplate = ({ togglePopover }) => (
    <div className={styles.buttons2}>
      <Button size="small" icon={LeftIcon} disabled={!value[1]} onClick={handlePrevClick} />
      <Button onClick={togglePopover}>
        {displayValue}
      </Button>
      <Button icon={RightIcon} disabled={!value[1]} onClick={handleNextClick} />
    </div>
  );

  return (
    <DateTimePicker
      value={value}
      rangeTypes={!dayRange}
      rangeMode
      onChange={handleChange}
      onClose={handleClose}
    >
      {theme === 'input' ? inputTemplate : defaultTemplate}
    </DateTimePicker>
  );
};
