import React from 'react'
import DatePicker from './datepicker'
import moment from 'moment'

var DateTimePicker = React.createClass({
  displayName: 'DateTimePicker',

  propTypes: {
    date: React.PropTypes.object.isRequired,
    onDateChange: React.PropTypes.func.isRequired
  },
  getInitialState () {
    return {
      currentDate: this.props.date
    }
  },
  handleChange (date) {
    console.log('change');
    this.setState({
      currentDate: date
    })
    if(this.props.onDateChange){
      this.props.onDateChange(date);
    }
  },
  render () {
    console.log('render');
    return (
    <div>
      <div style={{marginBottom: '10px'}}> Dato: {this.state.currentDate ? this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a') : false}</div>
      <DatePicker
          selected={this.state.currentDate}
          onChange={this.handleChange}
          {...this.props}
       />
    </div>
    )
  }
})

module.exports = DateTimePicker
