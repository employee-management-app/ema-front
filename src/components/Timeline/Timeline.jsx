import React from 'react';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { DateFilter } from '../DateFilter';
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';
import { fetchSlots } from '../../services/fetchSlots';
import { useNotification } from '../../hooks/useNotification';
import { getIntervals } from '../OrdersMap/Timeline/consts';
import { Slot } from '../OrdersMap/Timeline/Slot';
import { Spinner } from '../Spinner';
import { EmptyState } from '../EmptyState';

import styles from './Timeline.module.scss';

export const Timeline = () => {
  const intervals = getIntervals();
  const [isLoading, setIsLoading] = React.useState(true);
  const [slotsPerEmployee, setSlotsPerEmployee] = React.useState({});
  const { pushNotification } = useNotification();
  const [searchParams] = useSearchParams({
    startDate: format(new Date(), 'dd-MM-yyyy'),
    endDate: format(new Date(), 'dd-MM-yyyy'),
  });

  React.useEffect(() => {
    fetchSlots({ startDate: searchParams.get('startDate'), endDate: searchParams.get('endDate') })
      .then((data) => {
        setSlotsPerEmployee(data.reduce((acc, slot) => ({
          ...acc,
          [slot.assignedEmployee?._id]: [...(acc[slot.assignedEmployee?._id] ?? []), slot],
        }), {}));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  const getEmployeeName = React.useCallback((id) => {
    const employee = slotsPerEmployee[id][0].assignedEmployee;

    if (!employee) {
      return 'Unassigned';
    }

    return `${employee.name} ${employee.surname}`;
  }, [slotsPerEmployee]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.dateFilter}>
        <DateFilter
          defaultValue={[new Date(), new Date()]}
          required
          dayRange
        />
      </div>
      {Object.keys(slotsPerEmployee).length > 0 && (
        <div className={styles.wrapper}>
          <div className={styles.rows}>
            <div className={styles.intervals}>
              {intervals.map((interval) => (
                <div key={interval.id} className={styles.interval}>
                  <span className={styles.time}>{interval.label}</span>
                </div>
              ))}
            </div>
            {Object.keys(slotsPerEmployee).sort().map((employee) => (
              <div className={styles.row}>
                <div className={styles.employee}>
                  <AvatarIcon />
                  {getEmployeeName(employee)}
                </div>
                <div className={styles.slots}>
                  {slotsPerEmployee[employee].map((slot) => (
                    <Slot
                      key={slot._id}
                      order={slot}
                      color={slot.assignedEmployee?.color ?? '#212121'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {Object.keys(slotsPerEmployee).length === 0 && (
        <EmptyState text="There are no scheduled tasks for this day." />
      )}
    </>
  );
};
