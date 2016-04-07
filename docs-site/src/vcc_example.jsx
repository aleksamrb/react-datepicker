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
    console.log('set selected in example: '+date.format());
    this.setState({
      currentDate: date
    })
  },

  render () {
    return (

    <div>
      <div style={{marginBottom: '10px'}}> Dato: {this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a')}</div>
      <DatePicker
          selected={this.state.currentDate}
          onChange={this.handleChange}
          dateFormatCalendar="MMMM"
          dateFormat={"DD/MM/YYYY HH:mm:ss"}
          hour24={false}
          isClearable={true}
          locale='en-gb'
          popoverAttachment='bottom center'
          popoverTargetAttachment='top center'
          showConfirmButtons={true}
          showSeconds={true}
          showTime={true}
          showYearDropdown
          readOnly
          todayButton={'Today'}
       />
    </div>
  )

  }
})
