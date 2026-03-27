import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Container } from '../components/Container';
import { Grid, GridEl, SPACES } from '../components/Grid';
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import axios from '../services/axios';
import { Field } from '../components/Field';

export const Invitation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const { pushNotification } = useNotification();

  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onValueChange,
    onSubmit,
  } = useForm((yup) => ({
    password: {
      value: '',
      validation: yup.string().required().min(8).max(100),
    },
    repeatPassword: {
      value: '',
      validation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required(),
    },
    acceptPolicy: {
      value: false,
      validation: yup.boolean().equals([true]),
    },
  }));

  const handleSubmit = React.useCallback((e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_API_URL}/auth/invitation`, { token, password: fields.password })
      .then(() => {
        navigate('/login');
        pushNotification({ theme: 'success', content: 'Your password has been saved, you can log in to the system!' });
      })
      .catch((error) => {
        const content = error.response?.data.message ?? 'Something went wrong';
        pushNotification({ theme: 'error', content });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fields.password, isValid, navigate, onSubmit, pushNotification, setIsLoading, token]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Grid space={SPACES.S}>
            <GridEl size="12">
              <Text size="h2">Complete registration</Text>
            </GridEl>
            <GridEl size="12">
              <Text size="medium">Enter the password you will use to log into the system.</Text>
            </GridEl>
          </Grid>
        </GridEl>
        <GridEl size={{ xs: 12, lg: 6, xl: 5 }}>
          <form noValidate onSubmit={handleSubmit}>
            <Grid space={SPACES.L}>
              <GridEl size="12">
                <Grid>
                  <GridEl size="12">
                    <Field error={errors.password}>
                      <Input
                        value={fields.password}
                        size="medium"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => onFieldChange(e, 'password')}
                      />
                    </Field>
                  </GridEl>
                  <GridEl size="12">
                    <Field error={errors.repeatPassword}>
                      <Input
                        value={fields.repeatPassword}
                        size="medium"
                        type="password"
                        placeholder="Repeat password"
                        onChange={(e) => onFieldChange(e, 'repeatPassword')}
                      />
                    </Field>
                  </GridEl>
                </Grid>
              </GridEl>
              <GridEl size="12">
                <Checkbox
                  checked={fields.acceptPolicy}
                  invalid={errors.acceptPolicy}
                  onChange={(e) => onValueChange(e.target.checked, 'acceptPolicy')}
                >
                  <span>
                    I accept {' '}
                    <a href="https://technik-w-terenie.pl/terms" target="_blank" rel="noreferrer">
                      regulations and privacy policy
                    </a>
                  </span>
                </Checkbox>
              </GridEl>
              <GridEl size="12">
                <Button type="submit" loading={isLoading}>
                  Complete registration
                </Button>
              </GridEl>
            </Grid>
          </form>
        </GridEl>
      </Grid>
    </Container>
  );
};
