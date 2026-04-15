import React from 'react';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

import { MAX_DIGITS_BY_COUNTRY } from '../../utils/phoneValidation';
import styles from './PhoneNumberField.module.scss';

export const PhoneNumberField = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChangeCallback = (newValue) => {
    if (props.onChange) {
      const event = {
        target: {
          value: newValue || '',
          name: props.name || 'phone',
        },
      };
      props.onChange(event);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue || '');
    handleChangeCallback(newValue);
  };

  const currentCountry = (() => {
    if (value) {
      try {
        const parsed = parsePhoneNumberFromString(value);
        if (parsed && parsed.country) {
          return parsed.country;
        }
      } catch {
        return 'PL';
      }
    }
    return 'PL';
  })();

  const maxDigits = MAX_DIGITS_BY_COUNTRY[currentCountry];

  let digitCount = 0;
  let isTooManyDigits = false;

  if (maxDigits && value) {
    try {
      const parsed = parsePhoneNumberFromString(value);
      if (parsed && parsed.nationalNumber) {
        digitCount = parsed.nationalNumber.toString().length;
      }
    } catch (error) {
      digitCount = value.replace(/\D/g, '').length;
    }
    isTooManyDigits = digitCount > maxDigits;
  }

  return (
    <div className={styles.wrapper}>
      <PhoneInput
        ref={ref}
        international
        countryCallingCodeEditable={false}
        defaultCountry={props.country || 'PL'}
        value={value}
        onChange={handleChange}
        disabled={props.disabled}
        placeholder="Enter phone number"
        className={props.invalid || isTooManyDigits ? styles.invalid : ''}
      />
      {maxDigits && (
        <span className={styles.hint}>
          Max {maxDigits} digits for {currentCountry}
          {isTooManyDigits && (
            <span className={styles.error}> - Too many digits!</span>
          )}
        </span>
      )}
    </div>
  );
});

PhoneNumberField.displayName = 'PhoneNumberField';
