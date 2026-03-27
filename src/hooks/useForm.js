import React from 'react';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'This field is invalid',
    required: 'This field is required',
  },
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: 'This field should contain minimum ${min} characters',
    // eslint-disable-next-line no-template-curly-in-string
    max: 'This field should contain maximum ${max} characters',
    email: 'Email must be a valid email',
  },
});

export const useForm = (callback) => {
  const config = callback(yup);

  const defaultFields = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].value }), {});
  const validations = Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: config[key].validation }), {});
  const schema = yup.object().shape(validations);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isShowErrors, setIsShowErrors] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [fields, setFields] = React.useState(defaultFields);

  React.useEffect(() => {
    schema.isValid(defaultFields).then((valid) => setIsValid(valid));
  }, []);

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();

    schema.validate(fields, { abortEarly: false }).catch(({ inner }) => {
      const validation = inner.reduce((acc, { path, message }) => ({ ...acc, [path]: message }), {});
      setErrors(validation);
      setIsShowErrors(true);
    });
  }, [fields, schema]);

  const onValueChange = React.useCallback(async (value, field) => {
    setErrors((errs) => ({ ...errs, [field]: '' }));
    setFields((flds) => {
      const updatedFields = { ...flds, [field]: value };

      schema.isValid(updatedFields).then((valid) => setIsValid(valid));

      if (isShowErrors) {
        schema.validateAt(field, updatedFields).catch(({ message }) => {
          setErrors((errs) => ({ ...errs, [field]: message }));
        });
      }

      return updatedFields;
    });
  }, [schema, isShowErrors]);

  const onFieldChange = React.useCallback(async (e, field) => {
    onValueChange(e.target.value, field);
  }, [onValueChange]);

  const isTouched = React.useMemo(() => (
    JSON.stringify(defaultFields) !== JSON.stringify(fields)
  ), [defaultFields, fields]);

  return {
    fields,
    errors,
    isTouched,
    isValid,
    isLoading,
    setFields,
    setErrors,
    setIsLoading,
    onValueChange,
    onFieldChange,
    onSubmit,
  };
};
