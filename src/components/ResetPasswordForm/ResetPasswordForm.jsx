import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { resetPassword } from '../../services/resetPassword';

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
});

export const ResetPasswordForm = () => {
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    console.log(fields);

    resetPassword(fields)
      .then(() => {
        navigate('/login');
        pushNotification({ theme: 'success', content: 'Check your email for reset link!' });
      })
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
            <Text size="h2" center>Reset your password</Text>
          </GridEl>
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
            <Grid>
              <GridEl size="12">
                <Button
                  type="submit"
                  size="medium"
                  width="full"
                  loading={isLoading}
                >
                  Send reset link
                </Button>
              </GridEl>
              <GridEl size="12">
                <Link to="/login">Log in</Link>
              </GridEl>
            </Grid>
          </GridEl>
        </Grid>
      </form>
    </Container>
  );
};
