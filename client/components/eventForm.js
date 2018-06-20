import React from 'react';
import moment from 'moment';
import axios from 'axios';

export default class EventForm extends React.Component {

  state = {
    isActive: false,
    name: '',
    description: '',
    startTime: '', //time string format = '1:11' or '14:22' - parsed in handleSubmit
    endTime: ''
  }

  handleFormChange = (evt) => {
    const name = evt.target.name;
    const input = evt.target.value;
    this.setState({ [name]: input });
  }

  handleSubmit = (evt) => {

    evt.preventDefault();
    const { selectedDate, addEventToCalendar } = this.props;
    let { startTime, endTime } = this.state;

    startTime = moment(this.state.startTime, 'HH-mm');
    startTime = selectedDate.hour(startTime.get('hour')).minute(startTime.get('minute')).toDate();

    endTime = moment(this.state.endTime, 'HH-mm');
    endTime = selectedDate.hour(endTime.get('hour')).minute(endTime.get('minute')).toDate();

    let event = Object.assign(this.state, { startTime, endTime });
    axios.post('api/events', event);
    addEventToCalendar(event);

    this.setState({
      isActive: false,
      name: '',
      description: '',
      startTime: '', 
      endTime: ''
    }
  )

  }

  toggleForm = () => {
    let isActive = this.state.isActive ? false : true;
    this.setState({ isActive })
  }

  render() {
    const { isActive, name, description, startTime, endTime } = this.state;
    return (
      isActive ?
        <div>
          <span className="toggle-form-button" onClick={this.toggleForm}>+</span>
          <form method="post" action="/" id="form" className="validate">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="(No Title)" value={name} onChange={this.handleFormChange} />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input type="text" name="description" placeholder="(No Description)" value={description} onChange={this.handleFormChange} />
            </div>
            <div className="form-field">
              <label htmlFor="startTime">Start time: </label>
              <input type="time" name="startTime" onChange={this.handleFormChange} value={startTime} required />
            </div>
            <div className="form-field">
              <label htmlFor="startTime">End time: </label>
              <input type="time" name="endTime" min={startTime} onChange={this.handleFormChange} value={endTime} required />
            </div>
            <div className="form-field">
              <label htmlFor=""></label>
              <input type="submit" name="submit" value="Create event" onClick={this.handleSubmit} />
            </div>
          </form>
        </div>
        :
        <div>
          <span className="toggle-form-button" onClick={this.toggleForm}>+</span>
        </div>
    )
  }
}
