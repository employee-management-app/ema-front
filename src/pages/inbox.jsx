import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';

import { setOrders, getOrders, setEmployees } from '../store';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useFilters } from '../hooks/useFilters';
import { filterOrdersByQuery } from '../utils/filterOrdersByQuery';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployees } from '../services/fetchEmployees';
import { Container } from '../components/Container';
import { Grid, GridEl, SPACES } from '../components/Grid';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { CreateOrderButton } from '../components/CreateOrderButton';
import { Input } from '../components/Input';
import { Filters } from '../components/Filters';
import { Timeline } from '../components/Timeline';

const URL_TABS = {
  '/list': 0,
  '/': 1,
  '/timeline': 2,
};

const TAB_URLS = {
  0: '/list',
  1: '/',
  2: '/timeline',
};

export const Inbox = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getOrders);

  const { isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const { filters } = useFilters();
  const pathname = `${location.pathname}/`.slice(0, `${location.pathname}/`.lastIndexOf('/'));

  const [activeTab, setActiveTab] = React.useState(URL_TABS[pathname]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setActiveTab(URL_TABS[pathname]);
  }, [pathname]);

  React.useEffect(() => {
    if (isEmployee) {
      navigate('/anytime');
      return;
    }

    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  React.useEffect(() => {
    if (isEmployee) {
      return;
    }

    fetchOrders(filters)
      .then((data) => {
        dispatch(setOrders(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      });
  }, [filters]);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearchClear = () => {
    setSearch('');
  };

  // Temporary solution on front part for the search
  const filteredOrders = React.useMemo(() => (
    filterOrdersByQuery(orders, search)
  ), [orders, search]);

  const handleTabChange = React.useCallback((tabIndex) => {
    const locationSearch = tabIndex === 2 || activeTab === 2
      ? ''
      : location.search;
    navigate(`${TAB_URLS[tabIndex]}${locationSearch}`, { replace: true });
  }, [activeTab, location.search, navigate]);

  if (isEmployee) {
    return null;
  }

  return (
    <Container {...(activeTab === 1 && { width: 'full' })}>
      <Grid>
        <GridEl size="12">
          <Container withoutPaddings>
            <Grid space={SPACES.S} alignItems="flex-end">
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
              {activeTab < 2 && (
                <GridEl size={{ xs: 'auto', md: 0 }}>
                  <Filters />
                </GridEl>
              )}
              <GridEl size={{ xs: 12, md: 'fluid' }}>
                <Tabs active={activeTab} onChange={handleTabChange}>
                  <Tab id={0} icon={ListIcon}>List</Tab>
                  <Tab id={1} icon={MapMarkerIcon}>Map</Tab>
                  <Tab id={2} icon={TimelineIcon}>Timeline</Tab>
                </Tabs>
              </GridEl>
              {activeTab < 2 && (
                <GridEl size={{ xs: 0, md: 'auto' }}>
                  <Filters />
                </GridEl>
              )}
            </Grid>
          </Container>
        </GridEl>
        <GridEl />
      </Grid>
      <TabsItems active={activeTab}>
        <TabsItem for={0}>
          <OrdersList orders={filteredOrders} />
        </TabsItem>
        <TabsItem for={1}>
          <OrdersMap orders={filteredOrders} />
        </TabsItem>
        <TabsItem for={2}>
          <Timeline />
        </TabsItem>
      </TabsItems>
      <CreateOrderButton />
    </Container>
  );
};
