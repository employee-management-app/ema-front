import { format } from 'date-fns';
import React from 'react';

import { ReactComponent as AvatarIcon } from '../../../assets/icons/avatar.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { fetchEmployeeSlots } from '../../../services/fetchEmployeeSlots';
import { useNotification } from '../../../hooks/useNotification';
import { Text } from '../../Text';
import { getIntervals } from './consts';
import { Slot } from './Slot';
import styles from './Timeline.module.scss';

export const Timeline = ({ availableOrderIds, color, order, onSelect, onClose }) => {
  const [slots, setSlots] = React.useState([]);

  const intervals = getIntervals(order.startDate);
  const { pushNotification } = useNotification();

  React.useEffect(() => {
    fetchEmployeeSlots(order.assignedEmployee._id, { startDate: order.startDate })
      .then((data) => {
        setSlots(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      });
  }, [order]);

  const date = React.useMemo(() => (
    format(new Date(order.startDate), 'dd.MM.yyyy')
  ), [order.startDate]);

  const handleClick = React.useCallback((id) => () => {
    onSelect?.(id);
  }, [onSelect]);

  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <AvatarIcon />
        <Text className={styles.name} fontWeight="600">
          {order.assignedEmployee.name} {order.assignedEmployee.surname}
        </Text>
        <Text className={styles.date}>{date}</Text>
      </div>
      <div className={styles.intervals}>
        <div className={styles.intervalsInner}>
          {slots.map((slot) => (
            <Slot
              key={slot._id}
              order={slot}
              color={color}
              disabled={!availableOrderIds.includes(slot._id)}
              selected={order._id === slot._id}
              onClick={handleClick(slot._id)}
            />
          ))}
          {intervals.map((interval) => (
            <div key={interval.id} className={styles.interval}>
              <span className={styles.time}>{interval.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
};
