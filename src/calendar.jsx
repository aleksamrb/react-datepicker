import React from 'react';
import moment from 'moment-timezone';
import Month from './month';
import YearDropdown from './year_dropdown';
import classnames from 'classnames';
import { isSameDay, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: React.PropTypes.string.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    fixedHeight: React.PropTypes.bool,
    highlightDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onClearClick: React.PropTypes.func.isRequired,
    onClickOutside: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    openToDate: React.PropTypes.object,
    selected: React.PropTypes.object,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    todayButton: React.PropTypes.string,
    utcOffset: React.PropTypes.number
  },

  mixins: [require('react-onclickoutside')],

  getDefaultProps () {
    return {
      dateFormat: 'L',
      locale: moment().locale(),
      utcOffset: moment.utc().utcOffset()
    }
  },

  getInitialState () {
    return {
      date: this.localizeMoment(this.getDateInView())
    }
  },

  componentWillReceiveProps (nextProps) {
    if ((nextProps.selected && !isSameDay(nextProps.selected, this.props.selected)) ||
          nextProps.locale !== this.props.locale ||
          nextProps.dateFormat !== this.props.dateFormat) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      })
    }
  },

  handleClickOutside (event) {
    this.props.onClickOutside(event)
  },

  getDateInView () {
    const { selected, openToDate, utcOffset } = this.props
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const current = moment.utc().utcOffset(utcOffset)
    if (selected) {
      return selected
    } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
      return openToDate
    } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
      return openToDate
    } else if (minDate && minDate.isAfter(current)) {
      return minDate
    } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
      return openToDate
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate
    } else if (openToDate) {
      return openToDate
    } else {
      return current
    }
  },

  localizeMoment (date) {
    return date.clone().locale(this.props.locale || moment.locale());
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
  handleChangeTime(date){
    this.props.onSelect(date);
  },
  changeYear (year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    })
  },
  header () {
    const startOfWeek = this.state.date.clone().startOf('week')
    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <div key={offset} className="react-datepicker__day-name">
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
        {this.state.date.format(this.props.dateFormat)}
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
          currentDate={this.state.date}
          onChange={this.changeYear}
          year={this.state.date.year()}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          includeDates={this.props.includeDates} />
      </div>
    )
  },
  renderTodayButton () {
    if (!this.props.todayButton) {
      return
    }
    return (
      <span onClick={() => this.props.onSelect(moment.utc().utcOffset(this.props.utcOffset).startOf('date'))}>
        {this.props.todayButton}
      </span>
    )
  },
  renderClearButton(){
    if(!this.props.isClearable){
      return
    }
    return (
        <span onClick={this.props.onClearClick}>Clear</span>
    )
  },
  renderButtons(){
    return (
      <div className="react-datepicker__today-button">
          {this.renderTodayButton()}
          {this.renderClearButton()}
      </div>
    );
  },
  render () {
    return (
      <div className="react-datepicker__calendar">
        <div className="react-datepicker__header">
          {this.renderPreviousMonthButton()}
          {this.renderCurrentMonth()}
          {this.renderYearDropdown()}
          {this.renderNextMonthButton()}
          <div className="react-datepicker__day-names">
            {this.header()}
          </div>
        </div>
        <Month
            day={this.state.date}
            onDayClick={this.handleDayClick}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            highlightDates={this.props.highlightDates}
            includeDates={this.props.includeDates}
            fixedHeight={this.props.fixedHeight}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            utcOffset={this.props.utcOffset}/>
          {this.renderButtons()}
      </div>
    )
  }
})

module.exports = Calendar
