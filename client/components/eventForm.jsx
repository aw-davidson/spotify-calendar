import React from 'react';
import moment from 'moment';

export default class EventForm extends React.Component {
  state = {
    isActive: false,
    description: '',
    startTime: '', //time string format = '1:11' or '14:22' - parsed in handleSubmit
    endTime: ''
  };

  handleFormChange = evt => {
    const name = evt.target.name;
    const input = evt.target.value;
    //es6 computed property names
    this.setState({ [name]: input });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { selectedDate, addEventToCalendar } = this.props;
    let { startTime, endTime } = this.state;

    //converting to a moment
    startTime = moment(this.state.startTime, 'HH-mm');
    startTime = selectedDate
      .hour(startTime.get('hour'))
      .minute(startTime.get('minute'))
      .toDate();

    endTime = moment(this.state.endTime, 'HH-mm');
    endTime = selectedDate
      .hour(endTime.get('hour'))
      .minute(endTime.get('minute'))
      .toDate();

    let event = Object.assign(this.state, { startTime, endTime });

    addEventToCalendar(event);

    //reseting form
    this.setState({
      isActive: false,
      description: '',
      startTime: '',
      endTime: ''
    });
  };

  toggleForm = () => {
    let isActive = !this.state.isActive;
    this.setState({ isActive });
  };

  render() {
    const { isActive, description, startTime, endTime } = this.state;
    return isActive ? (
      <div className="event-form">
        <button
          type="button"
          className="create-event-button"
          onClick={this.toggleForm}
        >
          <span>Create Event</span>
        </button>
        <form method="post" action="/" id="form" className="validate">
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="startTime">Start time: </label>
            <input
              type="time"
              name="startTime"
              onChange={this.handleFormChange}
              value={startTime}
            />
          </div>
          <div className="form-field">
            <label htmlFor="startTime">End time: </label>
            <input
              type="time"
              name="endTime"
              onChange={this.handleFormChange}
              value={endTime}
            />
          </div>
          <div className="form-field">
            <label htmlFor="" />
            <input
              type="submit"
              name="submit"
              value="Create event"
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    ) : (
      <div className="event-form">
        <button
          type="button"
          className="create-event-button"
          onClick={this.toggleForm}
        >
          <span>Create Event</span>
        </button>
      </div>
    );
  }
}
