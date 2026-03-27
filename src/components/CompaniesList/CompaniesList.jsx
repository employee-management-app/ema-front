import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { Grid, GridEl, SPACES } from '../Grid';
import { Text } from '../Text';
import { Tabs, Tab, TabsItems, TabsItem } from '../Tabs';
import { fetchCompanyManagers } from '../../services/fetchCompanyManagers';
import { fetchCompanyEmployees } from '../../services/fetchCompanyEmployees';
import { Spinner } from '../Spinner';
import { ManagersList } from '../ManagersList';
import { EmployeesList } from '../EmployeesList';
import { getEmployees, getManagers, setCompany, setCompanies, setEmployees, setManagers } from '../../store';
import { GeneralInformation } from './GeneralInformation';
import { fetchCompanies } from '../../services/fetchCompanies';

export const CompaniesList = ({ companies }) => {
  const dispatch = useDispatch();
  const managers = useSelector(getManagers);
  const employees = useSelector(getEmployees);
  const [activeCompanyIndex, setActiveCompanyIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const activeCompanyId = companies[activeCompanyIndex]._id;
      const [_managers, _employees] = await Promise.all([
        fetchCompanyManagers(activeCompanyId),
        fetchCompanyEmployees(activeCompanyId),
      ]);

      dispatch(setManagers(_managers));
      dispatch(setEmployees(_employees));
      setIsLoading(false);
    };

    dispatch(setCompany(companies[activeCompanyIndex]));
    setIsLoading(true);
    fetchData();
  }, [activeCompanyIndex, companies, dispatch]);

  const handleSuccess = () => {
    fetchCompanies({})
      .then((data) => {
        dispatch(setCompanies(data));
      });
  };

  return (
    <Grid space={SPACES.L}>
      <GridEl size="12">
        <Tabs active={activeCompanyIndex} onChange={setActiveCompanyIndex}>
          {companies.map((company, index) => (
            <Tab id={index} key={company._id}>
              {company.name}
            </Tab>
          ))}
        </Tabs>
      </GridEl>
      <GridEl size="12">
        <TabsItems active={activeCompanyIndex}>
          {companies.map((company, index) => (
            <TabsItem for={index} key={company._id}>
              <GeneralInformation company={company} onSuccess={handleSuccess} />
            </TabsItem>
          ))}
        </TabsItems>
      </GridEl>
      <GridEl size="12">
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text fontWeight="600" size="medium" inline>Managers</Text>
          </GridEl>
          <GridEl size="12">
            {isLoading ? <Spinner /> : <ManagersList managers={managers} />}
          </GridEl>
        </Grid>
      </GridEl>
      <GridEl size="12">
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text fontWeight="600" size="medium" inline>Employees</Text>
          </GridEl>
          <GridEl size="12">
            {isLoading ? <Spinner /> : <EmployeesList employees={employees} />}
          </GridEl>
        </Grid>
      </GridEl>
    </Grid>
  );
};
