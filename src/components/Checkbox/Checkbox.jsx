import React from 'react';
import cx from 'classnames';

import styles from './Checkbox.module.scss';

export const Checkbox = ({ checked, onChange, ...props }) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = React.useCallback((e) => {
    setIsChecked(e.target.checked);

    onChange?.(e);
  }, [onChange]);

  const classNames = cx(styles.field, {
    [styles.checked]: isChecked,
    [styles.invalid]: props.invalid,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames}>
      <input
        type="checkbox"
        checked={isChecked}
        className={styles.input}
        onChange={handleChange}
      />
      {props.children}
    </label>
  );
};
