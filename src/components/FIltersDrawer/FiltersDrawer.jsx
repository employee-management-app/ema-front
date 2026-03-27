import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';

import { useDrawerVisibility } from '../../hooks/useDrawerVisibility';
import { fetchEmployees } from '../../services/fetchEmployees';
import { getEmployees, getOrdersTotal, setEmployees } from '../../store';
import { getStageOptions, PRIORITY_OPTIONS, getProductTypeOptions } from '../../consts/order';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { Button } from '../Button';
import { Drawer } from '../Drawer';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Multiselect } from '../Multiselect';
import { DateFilter } from '../DateFilter';
import { Checkbox } from '../Checkbox';
import { useAuth } from '../../hooks/useAuth';
import { useFilters } from '../../hooks/useFilters';

export const FiltersDrawer = () => {
  const dispatch = useDispatch();
  const ordersTotal = useSelector(getOrdersTotal);
  const { isVisible, hideDrawer } = useDrawerVisibility('FiltersDrawer');
  const [searchParams, setSearchParams] = useSearchParams();
  const employees = useSelector(getEmployees);
  const { isEmployee, user } = useAuth();
  const { filtersCount, resetFilters } = useFilters();
  const location = useLocation();

  const { companyId } = user;
  const isScheduledPage = location.pathname.startsWith('/scheduled');

  React.useEffect(() => {
    if (isEmployee) {
      return;
    }

    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  const handleMultiFilterChange = (key) => (values) => {
    searchParams.delete(key);
    values.forEach((value) => {
      searchParams.append(key, value);
    });
    setSearchParams(searchParams);
  };

  const handleShowUnassignedChange = React.useCallback((e) => {
    if (!e.target.checked) {
      searchParams.set('unassigned', false);
    } else {
      searchParams.delete('unassigned');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleShowUnscheduledChange = React.useCallback((e) => {
    if (!e.target.checked) {
      searchParams.set('unscheduled', false);
    } else {
      searchParams.delete('unscheduled');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const employeesOptions = employees.map(({ _id, name, surname }) => ({
    label: `${name} ${surname}`,
    value: _id,
  }));

  const drawerTitle = `Filters${filtersCount ? ` (${filtersCount})` : ''}`;

  const closeDrawerLabel = React.useMemo(() => {
    if (ordersTotal > 0) {
      return `See results (${ordersTotal})`;
    }

    return 'No results';
  }, [ordersTotal]);

  const stageOptions = getStageOptions(companyId);

  return (
    <Drawer size="small" title={drawerTitle} isOpen={isVisible} onClose={hideDrawer}>
      <Grid space={SPACES.L}>
        <GridEl size="12">
          <Field label="Scheduled time">
            <DateFilter theme="input" />
          </Field>
        </GridEl>
        {(!isEmployee && !isScheduledPage) && (
          <GridEl size="12">
            <Field label="Employee">
              <Multiselect
                values={searchParams.getAll('employee')}
                options={employeesOptions}
                placeholder="Select employee"
                size="medium"
                onChange={handleMultiFilterChange('employee')}
              />
            </Field>
          </GridEl>
        )}
        {stageOptions.length > 1 && (
          <GridEl size="12">
            <Field label="Stage">
              <Multiselect
                values={searchParams.getAll('stage')}
                options={getStageOptions(companyId)}
                placeholder="Select stage"
                size="medium"
                onChange={handleMultiFilterChange('stage')}
              />
            </Field>
          </GridEl>
        )}
        <GridEl size="12">
          <Field label="Priority">
            <Multiselect
              values={searchParams.getAll('priority')}
              options={PRIORITY_OPTIONS}
              placeholder="Select priority"
              size="medium"
              onChange={handleMultiFilterChange('priority')}
            />
          </Field>
        </GridEl>
        <GridEl size="12">
          <Field label="Product type">
            <Multiselect
              values={searchParams.getAll('type')}
              options={getProductTypeOptions(companyId)}
              placeholder="Select type"
              size="medium"
              onChange={handleMultiFilterChange('type')}
            />
          </Field>
        </GridEl>
        {(!isEmployee && !isScheduledPage) && (
          <GridEl size="12">
            <Grid space={SPACES.S}>
              <GridEl size="12">
                <Checkbox checked={searchParams.get('unassigned') !== 'false'} onChange={handleShowUnassignedChange}>
                  Show unassigned
                </Checkbox>
              </GridEl>
              <GridEl size="12">
                <Checkbox checked={searchParams.get('unscheduled') !== 'false'} onChange={handleShowUnscheduledChange}>
                  Show unscheduled
                </Checkbox>
              </GridEl>
            </Grid>
          </GridEl>
        )}
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="auto">
              <Button onClick={hideDrawer}>{closeDrawerLabel}</Button>
            </GridEl>
            {filtersCount > 0 && (
              <GridEl size="auto">
                <Button icon={TrashIcon} onClick={resetFilters}>Clear filters</Button>
              </GridEl>
            )}
          </Grid>
        </GridEl>
      </Grid>
    </Drawer>
  );
};
