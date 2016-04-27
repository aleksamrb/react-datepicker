import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'VccExample',
  handleChange (date) {
    console.log('on change test: ' + date.format());
  },
  render () {
    return (
    <div>
      <DatePicker
          selected={moment()}
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
