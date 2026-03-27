const prepareCell = (date, dayNumber, type) => ({
  label: String(dayNumber),
  value: date
    .clone()
    .set('date', dayNumber)
    .set('h', 0)
    .set('m', 0)
    .set('s', 0)
    .set('ms', 0),
  type,
});

export const getCalendarCells = (date) => {
  const daysInMonth = date.daysInMonth();
  const calendarCells = [];

  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(date, i + 1, 'current'));
  }

  const lastMonth = date.subtract(1, 'month');

  const startCellsToAdd = (calendarCells[0].value.day() + 6) % 7;

  for (let i = 0; i < startCellsToAdd; i++) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i, 'prev'));
  }

  const nextMonth = date.add(1, 'month');
  const endCellsToAdd = 42 - calendarCells.length;

  for (let i = 0; i < endCellsToAdd; i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1, 'next'));
  }

  calendarCells.unshift(...['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => ({
    label: day,
    type: 'day',
  })));

  return calendarCells;
};
