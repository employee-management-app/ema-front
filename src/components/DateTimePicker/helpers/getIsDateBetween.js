export const getIsDateBeetwen = (date, start, end) => {
  if (!date) {
    return false;
  }

  const isEndAfterStart = end?.isAfter(start);
  const isEndOrBefore = date.isSame(end) || date[isEndAfterStart ? 'isBefore' : 'isAfter'](end);
  const isStartOrAfter = date.isSame(start) || date[isEndAfterStart ? 'isAfter' : 'isBefore'](start);

  return isEndOrBefore && isStartOrAfter;
};
