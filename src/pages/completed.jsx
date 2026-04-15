import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';

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
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';

const PAGE_SIZE = 12;

export const Completed = () => {
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(getCompletedOrders);
  const { user, isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const { filters } = useFilters();

  const fetchData = React.useCallback((_page) => {
    setIsLoading(true);

    const params = {
      status: 'completed',
      offset: (_page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
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
    setPage(1, 'pushIn');
    debouncedFetchData(1);
  }, [debouncedFetchData, setPage]);

  const handleSearchClear = React.useCallback(() => {
    setSearch('');
    setPage(1, 'pushIn');
    debouncedFetchData(1);
  }, [debouncedFetchData, setPage]);

  const handlePageChange = React.useCallback((newOffset) => {
    const newPage = Math.floor(newOffset / PAGE_SIZE) + 1;
    setPage(newPage, 'pushIn');
    fetchData(newPage);
  }, [fetchData, setPage]);

  React.useEffect(() => {
    fetchData(page); // Initial fetch takes the page from the url "?page=X"
  }, []);

  useUpdateEffect(() => {
    setPage(1, 'pushIn');
    fetchData(1);
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
              <Pagination offset={(page - 1) * PAGE_SIZE} limit={PAGE_SIZE} total={total} onChange={handlePageChange} />
            </GridEl>
          </Grid>
        </GridEl>
      </Grid>
    </Container>
  );
};
