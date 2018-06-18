import React from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width || "350px"
  }

  state = {
    today: moment(),
    currentMonthYear: moment(),
    selectedDate: moment().startOf('day')
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
    let { currentMonthYear, selectedDate} = this.state;

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
        />
      )
      startOfWeek.add(1, "w");
    }
    }

    return weeks;
  }

  render() {
    return (
      <div className="calendar-container">
        {this.renderMonthYearHeader()}
        <WeekDayHeader />
        <div className="calendar">
          {this.renderWeeks()}
        </div>
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

  const { startOfWeek, handleDayClick, selectedDate, currentMonthYear } = props;
  let currentDay = startOfWeek.clone();
  const days = [];

  for (let i = 0; days.length < 7; currentDay = currentDay.clone().add(1, "d")) {

    let selected = currentDay.isSame(selectedDate) ? "selected" : "";
    let displayMonth = currentDay.month() === currentMonthYear.month() ? "display-month" : "trailing-month";

    days.push(
      <span
        key={currentDay.date()}
        onClick={handleDayClick.bind(null, currentDay)}
        className={`${selected} ${displayMonth}`}
      >
        {currentDay.date()}
      </span>);
  }

  return days;
}
