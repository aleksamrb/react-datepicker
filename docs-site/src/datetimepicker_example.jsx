import React from 'react'
import ExampleComponents from './example_components.jsx'
import HeroExample from './hero_example.jsx'
import Moment from 'moment'
import Calendar from '../../src/calendar.jsx'
import DateTimePicker from '../../src/datetimepicker.jsx'

export default React.createClass({
  displayName: 'DateTimePickerExample',

  componentDidMount(){
    window.insertDatepicker(
      function(){},
      Moment(),
      {dateFormat:'L LT', locale: 'en_us', showTime: true, showSeconds: true, showConfirm: true, todayButton: 'Today', yearDropdown: true},
      document.getElementById('insertDatepicker'));
    },
    handleCalendarSelect(date){
      console.log(date.format());
    },
    handleDatetimepickerSelect(date){
      console.log(date, 'example on select')
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
          onClickOutside={function(){console.log('click outside picker example');}}
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
    render () {
      return (
        <div id="datetimepicker_example--main">
          <h1>Datetimepicker</h1>
          <div>
            <div id="datetimepicker_example--popup"><div id="insertDatepicker"></div></div>

            {/*<div id="datetimepicker_example--onlyCalendar">{this.renderCalendar()}</div>
          <div>{this.renderDatetimepicker()}</div>*/}
          </div>
        </div>
    )
  }
})
