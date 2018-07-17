import React from 'react';
import { Day } from './';
import moment from 'moment';

const Week = props => {
  const {
    startOfWeek,
    handleDayClick,
    selectedDate,
    currentMonthYear,
    events,
    deleteEvent
  } = props;
  let currentDay = startOfWeek.clone();

  //an array of day components
  const days = [];

  for (
    let i = 0;
    days.length < 7;
    currentDay = currentDay.clone().add(1, 'd')
  ) {
    let selected = currentDay.isSame(selectedDate) ? 'selected' : '';
    let displayMonth =
      currentDay.month() === currentMonthYear.month()
        ? 'display-month'
        : 'trailing-month';

    let currentDayEvents = events.filter(event => {
      return (
        moment(event.startTime).date() === currentDay.date() &&
        moment(event.startTime).month() === currentDay.month() &&
        moment(event.startTime).year() === currentDay.year()
      );
    });

    currentDayEvents.sort(
      (a, b) => (moment(a.startTime).isBefore(b.startTime) ? -1 : 1)
    );

    days.push(
      <Day
        key={currentDay.format('YYYY-MM-DD')}
        selected={selected}
        displayMonth={displayMonth}
        currentDay={currentDay}
        handleDayClick={handleDayClick}
        currentDayEvents={currentDayEvents}
        deleteEvent={deleteEvent}
      />
    );
  }

  return days;
};

export default Week;
