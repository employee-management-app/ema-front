import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';

import { Container } from '../Container';
import { Grid, GridEl, SPACES } from '../Grid';
import { Field } from '../Field';
import { Text } from '../Text';
import { Input } from '../Input';
import { Button } from '../Button';
import { changePassword } from '../../services/changePassword';

const getConfig = (yup) => ({
  password: {
    value: '',
    validation: yup.string().required().min(8).max(100),
  },
  passwordRepeat: {
    value: '',
    validation: yup.string().required().oneOf([yup.ref('password')], 'Passwords do not match'),
  },
});

export const ChangePasswordForm = () => {
  const {
    fields,
    errors,
    isValid,
    isLoading,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const [searchParams] = useSearchParams();

  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    onSubmit(e);

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    changePassword({ ...fields, token: searchParams.get('token') })
      .then(() => {
        navigate('/login');
        pushNotification({
          theme: 'success',
          content: 'Your password has been updated, you can log in to the system!',
        });
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
            <Text size="h2" center>Change your password</Text>
          </GridEl>
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
                <Field error={errors.passwordRepeat}>
                  <Input
                    value={fields.passwordRepeat}
                    size="medium"
                    type="password"
                    placeholder="Repeat password"
                    onChange={(e) => onFieldChange(e, 'passwordRepeat')}
                  />
                </Field>
              </GridEl>
            </Grid>
          </GridEl>
          <GridEl size="12">
            <Button
              type="submit"
              size="medium"
              width="full"
              loading={isLoading}
            >
              Change
            </Button>
          </GridEl>
        </Grid>
      </form>
    </Container>
  );
};
