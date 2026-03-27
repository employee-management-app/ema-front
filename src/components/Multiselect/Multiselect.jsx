import cx from 'classnames';
import React from 'react';

import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { Input } from '../Input';
import { Popover } from '../Popover';

import styles from './Multiselect.module.scss';

export const Multiselect = ({ options, placeholder, size, onChange, ...props }) => {
  const [values, setValues] = React.useState(props.values || []);
  const [search, setSearch] = React.useState('');
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  React.useEffect(() => {
    setValues(props.values ?? []);
  }, [props.values]);

  const handleFocus = React.useCallback(() => {
    setIsPopoverVisible(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setIsPopoverVisible(false);
    setSearch('');
  }, []);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleClick = React.useCallback((value) => () => {
    const newValues = values.includes(value)
      ? [...values].filter((val) => val !== value)
      : [...values, value];

    setValues(newValues);
    onChange(newValues);
  }, [onChange, values]);

  const handleClear = React.useCallback(() => {
    setValues([]);
    onChange([]);
  }, [onChange]);

  const filteredOptions = React.useMemo(() => (
    [...options].filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
  ), [options, search]);

  const content = React.useMemo(() => (
    <ul className={styles.options}>
      {filteredOptions.map(({ value, label, icon: Icon }) => (
        <li key={value}>
          <button
            type="button"
            className={cx(styles.option, { [styles.selected]: values.includes(value) })}
            onClick={handleClick(value)}
          >
            {Icon && <Icon className={styles.icon} />}
            {label}
            {values.includes(value) && <DoneIcon className={styles.check} />}
          </button>
        </li>
      ))}
    </ul>
  ), [filteredOptions, values, handleClick]);

  const valuesString = React.useMemo(() => (
    values.map((value) => options.find((option) => option.value === value).label).join(', ')
  ), [options, values]);

  const inputValue = React.useMemo(() => {
    if (isPopoverVisible) {
      return search;
    }

    return valuesString;
  }, [isPopoverVisible, search, valuesString]);

  return (
    <div>
      <Popover
        visible={isPopoverVisible}
        content={content}
        placement="bottom-start"
        onVisibleChange={handleBlur}
      >
        <Input
          value={inputValue}
          size={size}
          placeholder={valuesString || placeholder}
          clearable
          onFocus={handleFocus}
          onClear={handleClear}
          onChange={handleSearchChange}
        />
      </Popover>
    </div>
  );
};
