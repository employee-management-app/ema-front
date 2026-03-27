import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { ManagersList } from '../components/ManagersList';
import { Spinner } from '../components/Spinner';
import { getManagers, setManagers } from '../store';
import { useNotification } from '../hooks/useNotification';
import { fetchManagers } from '../services/fetchManagers';

export const Managers = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const managers = useSelector(getManagers);
  const { pushNotification } = useNotification();

  React.useEffect(() => {
    fetchManagers({})
      .then((data) => {
        dispatch(setManagers(data));
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
          <Text size="h2">Managers</Text>
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <ManagersList managers={managers} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
