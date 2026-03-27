import React from 'react';
import { useDispatch } from 'react-redux';

import { updateOrder } from '../../services/updateOrder';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { Textarea } from '../Textarea';
import { Field } from '../Field';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { setOrder } from '../../store';

export const EmployeeNotesModal = ({ orderId, notes }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { isVisible, hideModal } = useModalVisibility('EmployeeNotesModal');

  const getConfig = () => ({
    employeeNotes: {
      value: notes,
    },
  });

  const {
    fields,
    isTouched,
    isLoading,
    setIsLoading,
    onFieldChange,
    onSubmit,
  } = useForm(getConfig);

  const handleSubmit = React.useCallback((e) => {
    onSubmit(e);

    if (!isTouched) {
      hideModal();

      return;
    }

    setIsLoading(true);

    updateOrder(orderId, fields)
      .then((data) => {
        dispatch(setOrder(data));
        hideModal();
        pushNotification({
          theme: 'success',
          content: 'Notes successfully updated!',
        });
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, fields, hideModal, isTouched, onSubmit, orderId, pushNotification, setIsLoading]);

  return (
    <Modal
      isOpen={isVisible}
      size="medium"
      title="Edit notes"
      onClose={hideModal}
    >
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid space={SPACES.XL}>
          <GridEl size="12">
            <Field label="Notes">
              <Textarea
                value={fields.employeeNotes}
                placeholder="Notes"
                size="medium"
                onChange={(e) => onFieldChange(e, 'employeeNotes')}
              />
            </Field>
          </GridEl>
          <GridEl size="12">
            <Button type="submit" loading={isLoading}>Confirm</Button>
          </GridEl>
        </Grid>
      </form>
    </Modal>
  );
};
