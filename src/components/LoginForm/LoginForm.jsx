import React from 'react';

import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

import { Container } from '../Container';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Text } from '../Text';
import { Input } from '../Input';
import { Button } from '../Button';
import { Link } from '../Link';

const getConfig = (yup) => ({
  email: {
    value: '',
    validation: yup.string().email().max(100).required(),
  },
  password: {
    value: '',
    validation: yup.string().required().max(100),
  },
});

export const LoginForm = () => {
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const { onLogin } = useAuth(fields);
  const { pushNotification } = useNotification();

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    onLogin(fields)
      .catch((err) => {
        pushNotification({ theme: 'error', content: err.message || 'Something went wrong...' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container height="full">
      <form
        noValidate
        style={{ maxWidth: '400px', textAlign: 'center' }}
        onSubmit={handleSubmit}
      >
        <Grid space={SPACES.XL}>
          <GridEl size="12">
            <Text size="h2" center>Log in to your account</Text>
          </GridEl>
          <GridEl size="12">
            <Grid>
              <GridEl size="12">
                <Field error={errors.email}>
                  <Input
                    value={fields.email}
                    size="medium"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => onFieldChange(e, 'email')}
                  />
                </Field>
              </GridEl>
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
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Grid>
              <GridEl size="12">
                <Button
                  type="submit"
                  size="medium"
                  width="full"
                  loading={isLoading}
                >
                  Log in
                </Button>
              </GridEl>
              <GridEl size="12">
                <Link to="/forgot-password">Forgot password?</Link>
              </GridEl>
            </Grid>
          </GridEl>
        </Grid>
      </form>
    </Container>
  );
};
