export const changeDateMonth = (date, isNextMonth) => {
  if (date.month() === 0 && !isNextMonth) {
    return date.set('year', date.year() - 1).set('month', 11);
  }

  if (date.month() === 11 && isNextMonth) {
    return date.set('year', date.year() + 1).set('month', 0);
  }

  return date.add(isNextMonth ? 1 : -1, 'month');
};
