import React from 'react';

import { ReactComponent as FiltersIcon } from '../../assets/icons/filters.svg';

import styles from './Filters.module.scss';
import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { useFilters } from '../../hooks/useFilters';

export const Filters = () => {
  const { toggleDrawer } = useDrawerVisibility('FiltersDrawer');
  const { filtersCount } = useFilters();

  return (
    <button type="button" className={styles.button} onClick={toggleDrawer}>
      <span className={styles.label}>Filters</span>
      <FiltersIcon />
      {filtersCount > 0 && <span className={styles.count}>{filtersCount}</span>}
    </button>
  );
};
