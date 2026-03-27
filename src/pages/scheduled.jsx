import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { setOrders, getOrders } from '../store';
import { Container } from '../components/Container';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { Input } from '../components/Input';
import { Grid, GridEl, SPACES } from '../components/Grid';
import { Spinner } from '../components/Spinner';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { Filters } from '../components/Filters';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { useFilters } from '../hooks/useFilters';
import { filterOrdersByQuery } from '../utils/filterOrdersByQuery';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';
import { EmployeeTimeline } from '../components/EmployeeTimeline/EmployeeTimeline';

const URL_TABS = {
  '/scheduled/list': 0,
  '/scheduled': 1,
  '/scheduled/timeline': 2,
};

const TAB_URLS = {
  0: '/scheduled/list',
  1: '/scheduled',
  2: '/scheduled/timeline',
};

export const Scheduled = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const { pushNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { filters } = useFilters();
  const pathname = `${location.pathname}/`.slice(0, `${location.pathname}/`.lastIndexOf('/'));

  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(URL_TABS[pathname]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setActiveTab(URL_TABS[pathname]);
  }, [pathname]);

  React.useEffect(() => {
    setIsLoading(true);

    fetchEmployeeOrders(user._id, { scheduledOnly: true, sortBy: 'startDate', orderBy: 'asc', ...filters })
      .then((data) => {
        dispatch(setOrders(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  const handleTabChange = React.useCallback((tabIndex) => {
    const locationSearch = tabIndex === 2 || activeTab === 2
      ? ''
      : location.search;
    navigate(`${TAB_URLS[tabIndex]}${locationSearch}`, { replace: true });
  }, [activeTab, location.search, navigate]);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // Temporary solution on front part for the search
  const filteredOrders = React.useMemo(() => (
    filterOrdersByQuery(orders, search)
  ), [orders, search]);

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
                  placeholder="Search"
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
          {isLoading ? <Spinner /> : <OrdersList orders={filteredOrders} />}
        </TabsItem>
        <TabsItem for={1}>
          <OrdersMap orders={filteredOrders} />
        </TabsItem>
        <TabsItem for={2}>
          <EmployeeTimeline />
        </TabsItem>
      </TabsItems>
    </Container>
  );
};
