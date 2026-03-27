import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useAuth } from '../../hooks/useAuth';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';
import { setOrder } from '../../store';

export const OrderButtons = ({ size, order }) => {
  const { assignedEmployee, startDate, disabled } = order;

  const dispatch = useDispatch();
  const { isEmployee } = useAuth();
  const { showModal: showAssignModal } = useModalVisibility('AssignOrder');
  const { showModal: showScheduleModal } = useModalVisibility('ScheduleOrder');

  const openAssignModal = React.useCallback(() => {
    showAssignModal();
    dispatch(setOrder(order));
  }, [dispatch, order, showAssignModal]);

  const openScheduleModal = React.useCallback(() => {
    showScheduleModal();
    dispatch(setOrder(order));
  }, [dispatch, order, showScheduleModal]);

  return (
    <Grid space={SPACES.S}>
      <GridEl size={{ xs: 6, sm: size === 'auto' ? 'auto' : 6 }}>
        <Button
          icon={assignedEmployee ? undefined : UserIcon}
          width="full"
          disabled={((assignedEmployee && isEmployee) || disabled)}
          onClick={openAssignModal}
        >
          {assignedEmployee ? `${assignedEmployee.name} ${assignedEmployee.surname}` : 'Assign'}
        </Button>
      </GridEl>
      <GridEl size={{ xs: 6, sm: size === 'auto' ? 'auto' : 6 }}>
        <Button
          icon={startDate ? undefined : CalendarIcon}
          width="full"
          disabled={disabled}
          onClick={openScheduleModal}
        >
          {startDate ? format(new Date(startDate), 'dd.MM.yy  HH:mm') : 'Schedule'}
        </Button>
      </GridEl>
    </Grid>
  );
};
