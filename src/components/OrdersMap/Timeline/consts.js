import { set } from 'date-fns';

export const getIntervals = (date) => {
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  return hours.map((hour) => ({
    id: `${hour.toString().padStart(2, '0')}:00`,
    label: `${hour.toString().padStart(2, '0')}:00`,
    value: set(new Date(date), { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 }),
  }));
};
