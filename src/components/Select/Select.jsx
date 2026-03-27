import cx from 'classnames';
import React from 'react';

import styles from './Select.module.scss';

export const Select = ({ options = [], ...props }) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const onChange = (e) => {
    setValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleClear = () => {
    if (props.onClear) {
      props.onClear(null);
    }
  };

  return (
    <div
      className={cx(styles.field, {
        [styles.invalid]: props.invalid,
        [styles[props.size]]: props.size,
        [styles.required]: props.required,
        [styles.active]: !!value,
      })}
    >
      {(value && !props.required) && (
        <button type="button" aria-label="Clear" className={styles.clear} onClick={handleClear} />
      )}
      <select
        value={value}
        disabled={props.disabled}
        required={props.required}
        className={styles.select}
        onChange={onChange}
      >
        <option aria-label="Clear" disabled hidden value="" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span className={styles.placeholder}>{props.placeholder}</span>
    </div>
  );
};
