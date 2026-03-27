import cx from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState(props.value || '');

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);

    props?.onChange(e);
  }, [props]);

  const handleClear = React.useCallback(() => {
    setValue('');

    props?.onClear();
  }, [props]);

  const classNames = cx(styles.field, {
    [styles[props.size]]: props.size,
    [styles.invalid]: props.invalid,
    [styles.withIcon]: props.icon,
    [styles.clearable]: props.clearable,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames}>
      <input
        ref={ref}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={value}
        disabled={props.disabled}
        min={props.min}
        readOnly={props.readOnly}
        className={styles.input}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={handleChange}
      />
      {props.icon && <props.icon />}
      {props.clearable && value && (
        <button
          type="button"
          aria-label="Clear"
          className={styles.clear}
          onClick={handleClear}
        />
      )}
    </label>
  );
});
