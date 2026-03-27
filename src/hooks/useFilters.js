import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from './useAuth';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isEmployee } = useAuth();

  const filters = React.useMemo(() => {
    const filterKeys = Object.keys(Object.fromEntries([...searchParams]));

    const defaultFilters = isEmployee
      ? {}
      : { unassigned: true, unscheduled: true };

    return filterKeys.reduce((acc, key) => {
      const values = searchParams.getAll(key);

      return {
        ...acc,
        [key]: values.length === 1 ? values[0] : values,
      };
    }, defaultFilters);
  }, [isEmployee, searchParams]);

  const filtersCount = React.useMemo(() => (
    Object.keys(filters)
      .filter((key) => !['endDate', 'unassigned', 'unscheduled'].includes(key))
      .reduce((acc) => acc + 1, 0)
  ), [filters]);

  const resetFilters = React.useCallback(() => {
    setSearchParams([]);
  }, [setSearchParams]);

  return {
    filters,
    filtersCount,
    resetFilters,
  };
};
