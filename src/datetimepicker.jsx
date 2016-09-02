import React from 'react';
import moment from 'moment-timezone';
import TimePicker from './timepicker';
import Calendar from './calendar';
import calendarIcon from './images/calendar.svg';
import timeIcon from './images/time.svg';
import classnames from 'classnames';
import { isSameDay, isSameTime, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'

var DateTimePicker = React.createClass({
  displayName: 'DateTimePicker',

  propTypes: {
    dateFormat: React.PropTypes.string.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    hour24: React.PropTypes.bool,
    includeDates: React.PropTypes.array,
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChangeTime: React.PropTypes.func,
    onClickOutside: React.PropTypes.func,
    onClickOk: React.PropTypes.func.isRequired,
    onClickCancel: React.PropTypes.func.isRequired,
    onClearClick: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object,
    showSeconds: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    todayButton: React.PropTypes.string,
    nowButton: React.PropTypes.string,
    timezone: React.PropTypes.string
  },

  mixins: [require('react-onclickoutside')],

  getInitialState () {
    return {
      selectedDate: this.props.selected,
      calendarActive: true
    }
  },
  getDefaultProps () {
    return {
      dateFormat: 'L',
      locale: moment().locale()
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected && !isSameTime(nextProps.selected, this.props.selected)) {
      this.setState({
        selectedDate: nextProps.selected
      })
    }
  },
  handleCalendarChange (day) {
      if(this.state.selectedDate){
          var newDate = this.state.selectedDate.clone().year(day.year()).month(day.month()).date(day.date());
      }
      else{
        var newDate = day.startOf('day');
      }
      this.setState({selectedDate: newDate});
      if(this.props.onSelect){
          this.props.onSelect(newDate);
      }
  },
  handleTimeChange(date){
    this.setState({selectedDate: date});
    if(this.props.onSelect){
      this.props.onSelect(date);
    }
  },
  handleOkClick (){
      this.props.onClickOk(this.state.selectedDate);
  },
  handleCancelClick (){
      this.setState({selectedDate: this.props.selected || moment()});
      this.props.onClickCancel();
  },
  handleCalendarTabClick(){
    this.setState({
        calendarActive: true
    });
  },
  handleTimeTabClick(){
    this.setState({
        calendarActive: false
    });
  },
  handleClickOutside (event){
    this.setState({selectedDate: this.props.selected || moment()});
    this.props.onClickOutside(event);
  },
  onClearClick(event){
    this.setState({selectedDate: null});
  },
  handleClickOutsideCalendar (event) {
  },
  renderTime(){
      return (
        <div className="react-datepicker__timepicker">
        <TimePicker
          date={this.state.selectedDate}
          dateFormat={this.props.dateFormat}
          hour24={this.props.hour24}
          nowButton={this.props.nowButton}
          onChangeTime={this.handleTimeChange}
          showSeconds={this.props.showSeconds}
          timezone={this.props.timezone}
        />
        </div>
      )
  },
  renderCalendarView(){
    return(
      <Calendar
          locale={this.props.locale}
          dateFormat={this.props.dateFormat}
          selected={this.state.selectedDate}
          onSelect={this.handleCalendarChange}
          openToDate={this.props.openToDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          excludeDates={this.props.excludeDates}
          filterDate={this.props.filterDate}
          onClickOutside={this.handleClickOutsideCalendar}
          onClickOk={this.handleOkClick}
          onClickCancel={this.handleCancelClick}
          onClearClick={this.onClearClick}
          includeDates={this.props.includeDates}
          isClearable={this.props.isClearable}
          showYearDropdown={this.props.showYearDropdown}
          todayButton={this.props.todayButton}
          outsideClickIgnoreClass={outsideClickIgnoreClass} />
    )
  },
  renderConfirmButton(){
      return (
        <div className="react-datepicker__confirm-btn">
          <button className="react-datepicker__cancel-btn" onClick={this.handleCancelClick}>CANCEL</button>
          <button className="react-datepicker__ok-btn" onClick={this.handleOkClick}>OK</button>
        </div>
      )
  },
  render () {
    return (
      <div className="react-datepicker">
        <div className="react-datepicker__tabs">
          <span className={classnames('react-datepicker__tab-calendar', {'react-datepicker__tab-calendar--selected': this.state.calendarActive})} onClick={this.handleCalendarTabClick}>
            <span dangerouslySetInnerHTML={{__html: calendarIcon}}/>
          </span>
          <span className={classnames('react-datepicker__tab-time', {'react-datepicker__tab-time--selected': !this.state.calendarActive})} onClick={this.handleTimeTabClick}>
            <span dangerouslySetInnerHTML={{__html: timeIcon}}/>
          </span>
        </div>
        {this.state.calendarActive ? this.renderCalendarView() : this.renderTime()}
        {this.renderConfirmButton()}
      </div>
    )
  }
})

module.exports = DateTimePicker
