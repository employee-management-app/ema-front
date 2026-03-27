import cx from 'classnames';
import React from 'react';

import styles from './Textarea.module.scss';

export const Textarea = ({ placeholder, size, onChange, ...rest }) => {
  const [value, setValue] = React.useState(rest.value || '');

  React.useEffect(() => {
    setValue(rest.value || '');
  }, [rest.value]);

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange?.(e);
  }, [onChange]);

  return (
    <textarea
      value={value}
      className={cx(styles.textarea, { [styles[size]]: size })}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
