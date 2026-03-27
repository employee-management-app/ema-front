import React from 'react';
import { format, parse } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { DateFilter } from '../DateFilter';
import { useNotification } from '../../hooks/useNotification';
import { getIntervals } from '../OrdersMap/Timeline/consts';
import { Slot } from '../OrdersMap/Timeline/Slot';
import { Spinner } from '../Spinner';
import { EmptyState } from '../EmptyState';

import styles from './EmployeeTimeline.module.scss';
import { fetchEmployeeSlots } from '../../services/fetchEmployeeSlots';
import { useAuth } from '../../hooks/useAuth';

export const EmployeeTimeline = () => {
  const intervals = getIntervals();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [slots, setSlots] = React.useState({});
  const { pushNotification } = useNotification();
  const [searchParams] = useSearchParams({
    startDate: format(new Date(), 'dd-MM-yyyy'),
    endDate: format(new Date(), 'dd-MM-yyyy'),
  });

  React.useEffect(() => {
    setIsLoading(true);

    const startDateParam = searchParams.get('startDate');
    const startDate = parse(startDateParam, 'dd-MM-yyyy', new Date());

    fetchEmployeeSlots(user._id, { startDate: format(startDate, 'yyyy-MM-dd') })
      .then((data) => {
        setSlots(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <div className={styles.dateFilter}>
        <DateFilter defaultValue={[new Date(), new Date()]} required dayRange />
      </div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <Spinner />
      ) : slots.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.rows}>
            <div className={styles.intervals}>
              {intervals.map((interval) => (
                <div key={interval.id} className={styles.interval}>
                  <span className={styles.time}>{interval.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.row}>
              <div className={styles.slots}>
                {slots.map((slot) => (
                  <Slot key={slot._id} order={slot} color="#1352A1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState text="There are no scheduled tasks for this day." />
      )}
    </>
  );
};
