import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { getOverlapOrder, getOverlapOrders } from '../../store';
import { Slot } from '../OrdersMap/Timeline/Slot';
import { getIntervals } from '../OrdersMap/Timeline/consts';
import { ReactComponent as WarningIcon } from '../../assets/icons/statuses/warning.svg';

import styles from './OverlapOrdersModal.module.scss';
import { Button } from '../Button';
import { Text } from '../Text';

export const OverlapOrdersModal = () => {
  const overlapOrders = useSelector(getOverlapOrders);
  const overlapOrder = useSelector(getOverlapOrder);
  const intervals = getIntervals();

  const { isVisible, hideModal } = useModalVisibility('OverlapOrdersModal');

  const [firstOrder] = overlapOrders;

  if (!firstOrder) {
    return null;
  }

  const date = format(new Date(firstOrder.startDate), 'dd.MM.yyyy');

  return (
    <Modal size="large" title="Some of the orders overlap" isOpen={isVisible} onClose={hideModal}>
      <div className={styles.warning}>
        <WarningIcon className={styles.warningIcon} />
        <Text>Some of the orders overlap, review the orders on the timeline below.</Text>
      </div>
      <div className={styles.timelineWrapper}>
        <div className={styles.timeline}>
          <div className={styles.header}>
            <AvatarIcon />
            <Text className={styles.name} fontWeight="600">
              {firstOrder.assignedEmployee.name} {firstOrder.assignedEmployee.surname}
            </Text>
            <Text className={styles.date}>{date}</Text>
          </div>
          <div className={styles.intervals}>
            <div className={styles.intervalsInner}>
              {overlapOrders.map((order) => (
                <Slot
                  key={order._id}
                  order={order}
                  color={firstOrder.assignedEmployee.color}
                />
              ))}
              <Slot
                key={overlapOrder._id}
                order={overlapOrder}
                color={firstOrder.assignedEmployee.color}
                variant="ghost"
              />
              {intervals.map((interval) => (
                <div key={interval.id} className={styles.interval}>
                  <span className={styles.time}>{interval.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={hideModal}>Make changes</Button>
      </div>
    </Modal>
  );
};
