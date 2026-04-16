import React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  CUSTOMER_DEFAULT_ORDER_FILTERS,
  EMPLOYEE_DEFAULT_ORDER_FILTERS,
  ORDER_FILTER_COUNT_EXCLUDED_KEYS,
  ORDER_FILTER_KEYS,
} from '../consts/order';
import { useAuth } from './useAuth';

const buildFiltersKey = (searchParams) => {
  const params = new URLSearchParams();

  // Using the allow list pattern to correctly manage the query
  // params that are not filter-related (offset, search, sort, etc.)
  ORDER_FILTER_KEYS.forEach((key) => {
    searchParams
      .getAll(key)
      .forEach((value) => params.append(key, value));
  });

  params.sort();

  return params.toString();
};

const parseFiltersFromKey = (filtersKey) => {
  const params = new URLSearchParams(filtersKey);
  const uniqueKeys = [...new Set(params.keys())];

  return Object.fromEntries(
    uniqueKeys.map((key) => {
      const values = params.getAll(key);
      return [key, values.length === 1 ? values[0] : values];
    }),
  );
};

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isEmployee } = useAuth();

  const filtersKey = React.useMemo(
    () => buildFiltersKey(searchParams),
    [searchParams],
  );

  const filters = React.useMemo(() => {
    const defaultFilters = isEmployee ? EMPLOYEE_DEFAULT_ORDER_FILTERS : CUSTOMER_DEFAULT_ORDER_FILTERS;

    return { ...defaultFilters, ...parseFiltersFromKey(filtersKey) };
  }, [isEmployee, filtersKey]);

  const filtersCount = React.useMemo(
    () => Object.keys(filters)
      .filter((key) => !ORDER_FILTER_COUNT_EXCLUDED_KEYS.includes(key))
      .length,
    [filters],
  );

  const resetFilters = React.useCallback(() => {
    setSearchParams([]);
  }, [setSearchParams]);

  return {
    filters,
    filtersCount,
    resetFilters,
  };
};
