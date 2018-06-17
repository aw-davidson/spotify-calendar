import React from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      selected: moment().startOf('day')
    };
  }

  render() {
    return (
      <h2> My Calendar </h2>
    )
  }
}
