import cx from 'classnames';
import { format, differenceInMinutes, set } from 'date-fns';
import React from 'react';

import { useOrderPriority } from '../../../hooks/useOrderPriority';
import { Tooltip } from '../../Tooltip';
import { Grid, GridEl, SPACES } from '../../Grid';
import { Text } from '../../Text';

import styles from './Timeline.module.scss';

export const Slot = ({ color, order, selected, disabled, variant, onClick }) => {
  const { address, priority, startDate, status, endDate } = order;

  const time = React.useMemo(() => (
    `${format(new Date(startDate), 'HH:mm')}-${format(new Date(endDate), 'HH:mm')}`
  ), [startDate, endDate]);

  const { icon: Icon } = useOrderPriority(priority);

  const style = React.useMemo(() => {
    const difference = differenceInMinutes(new Date(endDate), new Date(startDate));
    const start = differenceInMinutes(new Date(startDate), set(new Date(startDate), { hours: 7, minutes: 0 }));

    return {
      width: `calc(${(difference * 100) / (15 * 60)}% - 1px)`,
      left: `calc(${(start * 100) / (15 * 60)}% + 1px)`,
      backgroundColor: selected || variant === 'ghost' ? `${color}4C` : `${color}26`,
      borderColor: variant === 'ghost' ? color : (selected ? 'transparent' : `${color}4C`),
      zIndex: variant === 'ghost' ? 1 : undefined,
      backdropFilter: variant === 'ghost' ? 'blur(1px)' : undefined,
    };
  }, [selected, color, startDate, endDate, variant]);

  const tooltipContent = React.useMemo(() => {
    if (status === 'completed') {
      return (
        <Text fontWeight={500}>
          This order was completed
        </Text>
      );
    }

    return (
      <Grid space={SPACES.S}>
        <GridEl>
          <Text fontWeight={500}>
            {address.street || <Text italic inline>No street</Text>} {address.house}
            <br />
            {address.code} {address.city}
          </Text>
        </GridEl>
        <GridEl>
          <Text size="small">{time}</Text>
        </GridEl>
      </Grid>
    );
  }, [address, status, time]);

  return (
    <Tooltip content={tooltipContent} placement="top-start">
      <button
        type="button"
        className={cx(styles.slot, { [styles.ghost]: variant === 'ghost' })}
        style={style}
        disabled={disabled}
        onClick={status === 'completed' ? () => null : onClick}
      >
        <span className={cx(styles.slotPriority, styles[`priority-${priority}`])}>
          <Icon />
        </span>
        <span className={styles.slotTime}>
          {time}
        </span>
      </button>
    </Tooltip>
  );
};
