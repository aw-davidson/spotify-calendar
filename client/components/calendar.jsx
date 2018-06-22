import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { EventForm, Week } from '.';

export default class Calendar extends React.Component {
  state = {
    currentMonthYear: moment(),
    selectedDate: moment().startOf('day'),
    events: [],
  };

  componentDidMount() {
    axios
      .get('/api/events')
      .then(res => res.data)
      .then(events => this.setState({ events }));
  }

  deleteEvent = (eventId) => {
    axios.delete(`/api/events/${eventId}`).then(() => {
      let { events } = this.state;
      events = events.filter(event => eventId !== event.id);
      this.setState({ events });
    });
  };

  addEventToCalendar = (event) => {
    axios.post('api/events', event).then((res) => {
      let { events } = this.state;
      events = [...events, res.data];
      this.setState({ events });
    });
  };

  previousMonth = () => {
    const { currentMonthYear } = this.state;
    this.setState({
      currentMonthYear: currentMonthYear.subtract(1, 'month'),
    });
  };

  nextMonth = () => {
    const { currentMonthYear } = this.state;
    this.setState({
      currentMonthYear: currentMonthYear.add(1, 'month'),
    });
  };

  handleDayClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  renderWeeks = () => {
    const weeks = [];
    const { currentMonthYear, selectedDate, events } = this.state;

    if (currentMonthYear) {
      const startOfWeek = currentMonthYear
        .clone()
        .startOf('month')
        .add('w' - 1)
        .day('Sunday');

      // render 5 rows of weeks
      for (let i = 0; i < 5; i += 1) {
        weeks.push(
          <Week
            key={startOfWeek.toDate()}
            startOfWeek={startOfWeek.clone()}
            handleDayClick={this.handleDayClick}
            selectedDate={selectedDate}
            currentMonthYear={currentMonthYear}
            events={events}
            deleteEvent={this.deleteEvent}
          />,
        );
        startOfWeek.add(1, 'w');
      }
    }

    return weeks;
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <div className="app-container">
        <div className="calendar-container">
          <MonthYearHeader
            previousMonth={this.previousMonth}
            nextMonth={this.nextMonth}
            currentMonthYear={this.state.currentMonthYear}
          />
          <WeekDayHeader />
          <div className="calendar">
            {this.renderWeeks()}
          </div>
        </div>
        <EventForm selectedDate={selectedDate} addEventToCalendar={this.addEventToCalendar} />
      </div>
    );
  }
}

const WeekDayHeader = () => (
  <div className="week-day-header">
    {moment.weekdaysShort().map(weekday => (
      <span key={weekday}>
        {weekday}
      </span>
    ))}
  </div>
);

const MonthYearHeader = (props) => {
  const { previousMonth, nextMonth, currentMonthYear } = props;
  return (
    <div className="month-year-header">
      <span className="arrow" onClick={previousMonth}>
        &larr;
      </span>
      <span>
        {currentMonthYear.format('MMMM, YYYY')}
      </span>
      <span className="arrow" onClick={nextMonth}>
        &rarr;
      </span>
    </div>
  );
};

