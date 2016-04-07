import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'DateTimePicker',

  getInitialState () {
    return {
      currentDate: moment()
    }
  },
  handleChange (date) {
    this.setState({
      currentDate: date
    })
  },
  render () {
    return (
    <div>
      <div style={{marginBottom: '10px'}}> Dato: {this.state.currentDate ? this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a') : false}</div>
      <DatePicker
          selected={this.state.currentDate}
          onChange={this.handleChange}
          dateFormatCalendar="MMMM"
          dateFormat={"DD/MM/YYYY h:mm:ss a"}
          locale='en-gb'
          showSeconds
          showTime
          showYearDropdown
          readOnly
          todayButton={'Today'}
       />
    </div>
  )
  }
})
