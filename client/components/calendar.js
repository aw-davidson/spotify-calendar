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
    selectDate: moment().startOf('day')
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

  selectDate(day) {
    this.setState({
      selectedDay: day.date,
      month: day.date.clone(),
    });
  }
  //should be a component by itself
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
    if (this.state.currentMonthYear) {
      let startOfWeek = this.state.currentMonthYear.clone().startOf("month").add("w" - 1).day("Sunday");

    //render 5 rows of weeks
    for (let i = 0; i < 5; i++) {
      weeks.push(<Week key={startOfWeek.date()} startOfWeek={startOfWeek.clone()} />)
      startOfWeek.add(1, "w");
    }
    }
    console.log('weeks', weeks)
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
  const { startOfWeek } = props;
  let days = [];

  for (let i = 0; i < 7; i++) {
    let day = {
      number: startOfWeek.date(),
    };

    days.push(<span key={day.number}>{day.number}</span>);
    startOfWeek.add(1, "d");
  }
  return days;
}
