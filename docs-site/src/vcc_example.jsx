import React from 'react'
import DateTimePicker from '../../src/datetimepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'VccExample',
  handleChange (date) {
    console.log('on change: ' + date);
  },
  render () {
    return (
    <div>
      <DateTimePicker
          date={moment()}
          onDateChange={this.handleChange}
          dateFormatCalendar="MMMM"
          dateFormat={"DD/MM/YYYY h:mm:ss a"}
          locale='en-gb'
          
          showConfirmButtons
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
