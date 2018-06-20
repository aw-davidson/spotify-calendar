import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { EventForm } from './'


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px"
  }

  state = {
    today: moment(),
    currentMonthYear: moment(),
    selectedDate: moment().startOf('day'),
    events: []
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => res.data)
      .then(events => this.setState({ events }));
  }

  //not necessary
  addEventToCalendar = (event) => {
    this.setState({ events: [...this.state.events, event] })
  }

  deleteEvent = (eventId) => {
    axios.delete(`/api/events/${eventId}`)
  }

  previousMonth = () => {
    const { currentMonthYear } = this.state;
    this.setState({
      currentMonthYear: currentMonthYear.subtract(1, 'month'),
    });
  }

  nextMonth = () => {
    const { currentMonthYear } = this.state;
    this.setState({
      currentMonthYear: currentMonthYear.add(1, 'month'),
    });
  }

  handleDayClick = (day) => {
    this.setState({
      selectedDate: day
    });
  }

  //should be a component by itself ??
  renderMonthYearHeader = () => {
    return (
      <div className="month-year-header">
        {<span>{this.state.currentMonthYear.format("MMMM, YYYY")}</span>}
        <i className="fa fa-angle-left" onClick={this.previousMonth}></i>
        <i className="fa fa-angle-right" onClick={this.nextMonth}></i>
      </div>
    )
  }

  renderWeeks = () => {

    const weeks = []
    let { currentMonthYear, selectedDate, events } = this.state;

    if (currentMonthYear) {
      let startOfWeek = currentMonthYear.clone().startOf("month").add("w" - 1).day("Sunday");

      //render 5 rows of weeks
      for (let i = 0; i < 5; i++) {
        weeks.push(
          <Week
            key={startOfWeek.date()}
            startOfWeek={startOfWeek.clone()}
            handleDayClick={this.handleDayClick}
            selectedDate={selectedDate}
            currentMonthYear={currentMonthYear}
            events={events}
            deleteEvent={this.deleteEvent}
          />
        )
        startOfWeek.add(1, "w");
      }
    }

    return weeks;
  }

  render() {

    const { selectedDate } = this.state;

    return (
      <div className="calendar-container">
        {this.renderMonthYearHeader()}
        <WeekDayHeader />
        <div className="calendar">
          {this.renderWeeks()}
        </div>
        <EventForm selectedDate={selectedDate} addEventToCalendar={this.addEventToCalendar} />
      </div>
    )
  }
}

const WeekDayHeader = () => {
  return (
    <div className="week-day-header">
      {moment.weekdaysShort().map((weekday) => {
        return <span className="day" key={weekday}>{weekday}</span>
      })}
    </div>
  )
}

const Week = (props) => {

  const { startOfWeek, handleDayClick, selectedDate, currentMonthYear, events, deleteEvent } = props;
  let currentDay = startOfWeek.clone();
  const days = [];

  for (let i = 0; days.length < 7; currentDay = currentDay.clone().add(1, "d")) {

    let selected = currentDay.isSame(selectedDate) ? "selected" : "";
    let displayMonth = currentDay.month() === currentMonthYear.month() ? "display-month" : "trailing-month";

    let currentDayEvents = events.filter((event) => {
      return moment(event.startTime).date() === currentDay.date() && moment(event.startTime).month() === currentDay.month() && moment(event.startTime).year() === currentDay.year();
    })

    currentDayEvents.sort((a, b) => moment(a.startTime).isBefore(b.startTime) ? -1 : 1)

    days.push(<Day
      selected={selected} displayMonth={displayMonth} currentDay={currentDay} handleDayClick={handleDayClick} currentDayEvents={currentDayEvents}
    />
    );
  }

  return days;
}

class Day extends React.Component {


  state = {
    events: this.props.currentDayEvents

  }


  deleteEvent = (eventId) => {
    axios.delete(`/api/events/${eventId}`)
    let events = this.state.events.filter((event) => eventId !== event.id)
    console.log(events)
    this.setState({ events })
  }
  
  render() {
    console.log(this.props.currentDayEvents)
    let { selected, displayMonth, currentDay, handleDayClick, currentDayEvents } = this.props;



    return (
      <span
        key={currentDay.date()}
        onClick={handleDayClick.bind(null, currentDay)}
        className={`${selected} ${displayMonth}`}
      >
        {currentDay.date()}
        <div>{currentDayEvents.map((event) => {
          return (
            <p>
              <span key={event.id}>{event.name}</span>
              <button onClick={() => this.deleteEvent(event.id)}>&times;</button>
            </p>
          )
        })}
        </div>
      </span>
    )
  }
}
