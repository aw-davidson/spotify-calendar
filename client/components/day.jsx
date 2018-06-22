import React from 'react'
import moment from 'moment'

const Day = (props) => {

  let { selected, displayMonth, currentDay, handleDayClick, currentDayEvents, deleteEvent } = props;

  return (
    <span
      onClick={handleDayClick.bind(null, currentDay)}
      className={`day ${selected} ${displayMonth}`}
    >
      {currentDay.date()}
      <div>{currentDayEvents.map((event) => {
        let startTime = moment(event.startTime).format('hA')
        let endTime = moment(event.endTime).format('hA')
        return (
          <p key={event.id} className="event">
            <span>{`${startTime}-${endTime} ${event.description}`}</span>
            <button type="button" onClick={() => deleteEvent(event.id)}>&times;</button>
          </p>
        )
      })}
      </div>
    </span>
  )
}

export default Day;
