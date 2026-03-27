import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Grid, GridEl, SPACES } from '../components/Grid';
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { OrdersList } from '../components/OrdersList';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { getCompletedOrders, setCompletedOrders } from '../store';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useFilters } from '../hooks/useFilters';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';

export const Completed = () => {
  const [offset, setOffset] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(getCompletedOrders);
  const { user, isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const { filters } = useFilters();

  const fetchData = React.useCallback((_offset) => {
    setIsLoading(true);

    const params = {
      status: 'completed',
      offset: _offset,
      limit: 9,
      ...(search && { search }),
      ...filters,
    };

    (isEmployee
      ? fetchEmployeeOrders(user._id, params)
      : fetchOrders(params)
    )
      .then((data) => {
        dispatch(setCompletedOrders(data));
        setTotal(data.total);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, filters, isEmployee, user._id, dispatch, pushNotification]);

  const debouncedFetchData = useDebouncedCallback(fetchData);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
    setOffset(0);
    debouncedFetchData();
  }, [debouncedFetchData]);

  const handleSearchClear = React.useCallback(() => {
    setSearch('');
    setOffset(0);
    debouncedFetchData();
  }, [debouncedFetchData]);

  const handleOffsetChange = React.useCallback((newOffset) => {
    setOffset(newOffset);
    fetchData(newOffset);
  }, [fetchData]);

  React.useEffect(() => {
    setOffset(0);
    fetchData(0);
  }, [filters]);

  return (
    <Container>
      <Grid space={SPACES.S}>
        <GridEl size="12">
          <Text size="h2">Completed tasks ({total})</Text>
        </GridEl>
        <GridEl size="12">
          <Grid justifyContent="space-between" alignItems="center">
            <GridEl size={{ xs: 'fluid', md: 5, lg: 3 }}>
              <Input
                value={search}
                icon={SearchIcon}
                clearable
                placeholder="Search"
                onClear={handleSearchClear}
                onChange={handleSearchChange}
              />
            </GridEl>
            <GridEl size="auto">
              <Filters />
            </GridEl>
            <GridEl size="12">
              {isLoading ? <Spinner /> : <OrdersList disabled orders={orders} />}
            </GridEl>
            <GridEl size="12">
              <Pagination offset={offset} limit={9} total={total} onChange={handleOffsetChange} />
            </GridEl>
          </Grid>
        </GridEl>
      </Grid>
    </Container>
  );
};
