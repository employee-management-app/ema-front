import dayjs from 'dayjs';
import { eachMinuteOfInterval } from 'date-fns';

export const getTimeOptions = (date) => {
  const year = date.year();
  const month = date.month();
  const day = date.date();

  const values = eachMinuteOfInterval({
    start: new Date(year, month, day, 7),
    end: new Date(year, month, day, 22, 0),
  }, { step: 15 });

  return values.map((value) => ({
    label: dayjs(value).format('HH:mm'),
    value: dayjs(value),
  }));
};
