import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { EmployeesList } from '../components/EmployeesList';
import { Spinner } from '../components/Spinner';
import { getEmployees, setEmployees } from '../store';
import { useNotification } from '../hooks/useNotification';
import { fetchEmployees } from '../services/fetchEmployees';

export const Employees = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const employees = useSelector(getEmployees);
  const { pushNotification } = useNotification();

  React.useEffect(() => {
    fetchEmployees({})
      .then((data) => {
        dispatch(setEmployees(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h2">Employees</Text>
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <EmployeesList employees={employees} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
