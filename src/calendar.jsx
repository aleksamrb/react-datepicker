import moment from 'moment'
import YearDropdown from './year_dropdown'
import Month from './month'
import React from 'react'
import TimePicker from './timepicker'
import calendarIcon from './images/calendar.svg'
import calendarIconWhite from './images/calendar_white.svg'
import timeIcon from './images/clock.svg'
import timeIconWhite from './images/clock_white.svg'
import classnames from 'classnames'
import { isSameDay, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    hour24: React.PropTypes.bool,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChangeTime: React.PropTypes.func,
    onClickOutside: React.PropTypes.func.isRequired,
    onClickOk: React.PropTypes.func.isRequired,
    onClickCancel: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object,
    showConfirmButtons: React.PropTypes.bool,
    showTime: React.PropTypes.bool,
    showSeconds: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    todayButton: React.PropTypes.string
  },

  mixins: [require('react-onclickoutside')],

  getInitialState () {
    return {
      date: this.localizeMoment(this.getDateInView()),
      calendarActive: true
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected && !isSameDay(nextProps.selected, this.props.selected)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      })
    }
  },

  handleClickOutside (event) {
    this.props.onClickOutside(event)
  },

  getDateInView () {
    const { selected } = this.props
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const current = moment()
    if (selected) {
      return selected
    } else if (minDate && minDate.isAfter(current)) {
      return minDate
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate
    } else {
      return current
    }
  },

  localizeMoment (date) {
    return date.clone().locale(this.props.locale || moment.locale())
  },

  increaseMonth () {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    })
  },

  decreaseMonth () {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    })
  },

  increaseYear () {
    this.setState({
      date: this.state.date.clone().add(1, 'year')
    })
  },
  decreaseYear () {
    this.setState({
      date: this.state.date.clone().subtract(1, 'year')
    })
  },
  handleDayClick (day) {
      this.props.onSelect(day)
  },
  handleOkClick (){
      this.props.onClickOk();
  },
  handleCancelClick (){
      this.props.onClickCancel();
  },
  handleChangeTime(date){
    this.props.onSelect(date);
  },
  changeYear (year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    })
  },
  handleCalendarTabClick(){
    this.setState({
        calendarActive: true
    });
  },
  handleCalendarTimeClick(){
    this.setState({
        calendarActive: false
    });
  },
  handleTodayClick(){
    if(this.props.showTime){
      var now = moment();
      var newDate = this.state.date.clone().year(now.year()).month(now.month()).date(now.date());
      this.props.onSelect(newDate);
    }
    else{
        this.props.onSelect(moment());
    }
  },
  header () {
    const startOfWeek = this.state.date.clone().startOf('week')
    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <div key={offset} className="react-datepicker__day">
          {day.localeData().weekdaysMin(day)}
        </div>
      )
    })
  },

  renderPreviousMonthButton () {
    if (allDaysDisabledBefore(this.state.date, 'month', this.props)) {
      return
    }
    return <a
        className='react-datepicker__navigation react-datepicker__navigation--previous'
        onClick={this.decreaseMonth} />
  },

  renderNextMonthButton () {
    if (allDaysDisabledAfter(this.state.date, 'month', this.props)) {
      return
    }
    return <a
        className='react-datepicker__navigation react-datepicker__navigation--next'
        onClick={this.increaseMonth} />
  },

  renderCurrentMonth () {
    var classes = ['react-datepicker__current-month']
    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown')
    }
    return (
      <div className={classes.join(' ')}>
        {this.state.date.format(this.props.dateFormatCalendar)}
      </div>
    )
  },

  renderYearDropdown () {
    if (!this.props.showYearDropdown) {
      return
    }
    return (
      <div>
      <YearDropdown
          onChange={this.changeYear}
          year={this.state.date.year()} />
      </div>
    )
  },
  renderTodayButton () {
    if (!this.props.todayButton) {
      return
    }
    return (
      <div className="react-datepicker__today-button" onClick={this.handleTodayClick}>
        {this.props.todayButton}
      </div>
    )
  },
  renderTime(){
    if(!this.props.showTime){
      return
    }
    else{
      return (
        <TimePicker
          date={this.props.selected}
          dateFormat={this.props.dateFormat}
          hour24={this.props.hour24}
          onChangeTime={this.handleChangeTime}
          showSeconds={this.props.showSeconds}
        />
      )
    }
  },
  renderConfirmButton(){
    if(this.props.showConfirmButtons){
      return (
        <div className="react-datepicker__confirm-btn">
          <button className="react-datepicker__cancel-btn" onClick={this.handleCancelClick}>CANCEL</button>
          <button className="react-datepicker__ok-btn" onClick={this.handleOkClick}>OK</button>
        </div>
      )
    }
    else {
      return
    }
  },
  renderCalendarView(){
    return(
      <div>
        <div className="react-datepicker__header">
          {this.renderPreviousMonthButton()}
          {this.renderCurrentMonth()}
          {this.renderYearDropdown()}
          {this.renderNextMonthButton()}
          <div>
            {this.header()}
          </div>
        </div>
        <Month
            day={this.state.date}
            onDayClick={this.handleDayClick}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
          {this.renderTodayButton()}
      </div>
    )
  },
  getClassNames () {
    return classnames('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
    })
  },
  render () {
    return (
      <div className="react-datepicker">
        <div className="react-datepicker__triangle"></div>
        {this.props.showTime ?
          <div className="react-datepicker__tabs">
            <span className={classnames('react-datepicker__tab-calendar', {'react-datepicker__tab-calendar--selected': this.state.calendarActive})} onClick={this.handleCalendarTabClick}>
              <span className="react-datepicker__tabs-calIcon" dangerouslySetInnerHTML={this.state.calendarActive ? {__html: calendarIconWhite} : {__html: calendarIcon}}/>
            </span>
            <span className={classnames('react-datepicker__tab-time', {'react-datepicker__tab-time--selected': !this.state.calendarActive})} onClick={this.handleCalendarTimeClick}>
              <span className="react-datepicker__tabs-timeIcon" dangerouslySetInnerHTML={this.state.calendarActive ? {__html: timeIcon} : {__html: timeIconWhite}}/>
            </span>
          </div>
        : false}
        {this.state.calendarActive ? this.renderCalendarView() : this.renderTime()}

        {this.renderConfirmButton()}
      </div>
    )
  }
})

module.exports = Calendar
