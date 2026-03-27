import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { Text } from '../components/Text';
import { Spinner } from '../components/Spinner';
import { CompaniesList } from '../components/CompaniesList';
import { getCompanies, setCompanies } from '../store';
import { useNotification } from '../hooks/useNotification';
import { fetchCompanies } from '../services/fetchCompanies';
import { Button } from '../components/Button';
import { useModalVisibility } from '../hooks/useModalVisibility';

export const Companies = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const companies = useSelector(getCompanies);
  const { showModal } = useModalVisibility('AddCompany');
  const { pushNotification } = useNotification();

  React.useEffect(() => {
    fetchCompanies({})
      .then((data) => {
        dispatch(setCompanies(data));
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
        <GridEl size="fluid">
          <Text size="h2">Companies</Text>
        </GridEl>
        <GridEl size="auto">
          <Button icon={PlusIcon} onClick={showModal}>Add company</Button>
        </GridEl>
        <GridEl size="12">
          {isLoading ? <Spinner /> : <CompaniesList companies={companies} />}
        </GridEl>
      </Grid>
    </Container>
  );
};
