import React from 'react'
import moment from 'moment-timezone'
import Calendar from '../../src/calendar.jsx'
import DateTimePicker from '../../src/datetimepicker.jsx'
import DatePicker from '../../src/datepicker.jsx'
import DatePickerWrapper from '../../src/datepicker_wrapper'

export default React.createClass({
  displayName: 'DateTimePickerExample',

  getInitialState () {
    return{
        currentDate: moment("2016-01-01 00:00")
    };
  },

    componentDidMount(){
      var calendarOptions = {
        dateFormat:'L LT',
        locale: 'nb_no',
        showSeconds: true,
        readOnly: true,
        yearDropdown: true,
        isClearable: true,
        todayButton: 'Today',
        nowButton: 'Now',
        timezone: null
      };
      window.insertDatepicker(
        function(date){
          const temp = date ? date.format() : 'null'; console.log('callback', temp);
        },
        "2016-09-09T00:00:00+00:00",
        calendarOptions,
        document.getElementById('insertDatepicker')
      );
    },
    handleCalendarSelect(date){

    },
    handleDatetimepickerSelect(date){

    },
    handleOkClick(){

    },
    handleCancelClick(){

    },
    renderDatetimepicker(){
      return(
        <DateTimePicker
          locale={'en'}
          dateFormat={'MMMM'}
          selected={Moment()}
          onSelect={this.handleDatetimepickerSelect}
          onClickOk={this.handleOkClick}
          onClickCancel={this.handleCancelClick}
          onClickOutside={function(){}}
          showYearDropdown
          showSeconds
          todayButton={'Today'}
          nowButton={'Now'}
        />
      )
    },
    renderCalendar(){
      return (
        <div>
          <Calendar
            locale={'fr'}
            dateFormat={'MMMM'}
            selected={Moment()}
            onSelect={this.handleCalendarSelect}
            onClickOutside={function(){}}
            showYearDropdown
            showSeconds
            todayButton={'Today'}
          />
        </div>
      )
    },
    onChange(date){
      console.log(date, 'example onchange');
      this.setState({currentDate: date});
    },
    render () {
      return (
        <div id="datetimepicker_example--main">
          <h1>Datetimepicker</h1>
          <div>
            <div id="datetimepicker_example--popup"><div id="insertDatepicker"></div></div>
          </div>
        </div>
    )
  }
})
