import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment-timezone'
import DatePicker from './datepicker'
import {isSame} from './date_utils'

var DatePickerWrapper = React.createClass({

  propTypes: {
    autoComplete: React.PropTypes.string,
    calendarOnly: React.PropTypes.bool,
    className: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    hour24: React.PropTypes.bool,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    inline: React.PropTypes.bool,
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    name: React.PropTypes.string,
    nowButton: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    openToDate: React.PropTypes.object,
    placeholderText: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    renderCalendarTo: React.PropTypes.any,
    required: React.PropTypes.bool,
    selected: React.PropTypes.string,
    showConfirmButtons: React.PropTypes.bool,
    showSeconds: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    tetherConstraints: React.PropTypes.array,
    timezone: React.PropTypes.string,
    title: React.PropTypes.string,
    todayButton: React.PropTypes.string
  },

  getInitialState () {
    return {
      selected: this.setDateTimezone(this.props)
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected) {
      this.setState({ selected: this.setDateTimezone(nextProps) })
    }
  },

  setDateTimezone (props) {
    if (props.selected) {
      var tempDate = moment.utc(props.selected)
      if (props.timezone) {
        tempDate.tz(props.timezone)
      }
      else{
        tempDate.local()
      }
      return tempDate
    }
    return null
  },

  onChangeDate (date) {
    if (this.props.onChange && (!isSame(this.state.selected, date) || !date)) {
      if (date) {
        var returnDate = date.clone()
        if (!this.state.selected && this.props.timezone) {
          returnDate.tz(this.props.timezone)
        }
        this.props.onChange(returnDate.utc())
      } else {
        this.props.onChange(date)
      }
    }
    this.setState({selected: date})
  },
  getUtcOffset () {
    if (this.state.selected) {
      return this.state.selected.utcOffset()
    } else {
      if (this.props.timezone) {
        return moment().tz(this.props.timezone).utcOffset()
      }
      return moment().utcOffset()
    }
  },
  render () {
    return (
      <DatePicker
          {...this.props}
          selected={this.state.selected}
          onCancel={this.onCancelDate}
          onChange={this.onChangeDate}
          utcOffset={this.getUtcOffset()}/>
    )
  }
})

module.exports = DatePickerWrapper;

window.insertDatepicker = function(onChangeCallback, date, options, el) {
  ReactDOM.render(<DatePickerWrapper
    onChange={onChangeCallback}
    selected={date || null}
    calendarOnly={options.calendarOnly || false}
    dateFormatCalendar={options.yearDropdown ? 'MMMM' : 'MMMM YYYY'}
    dateFormat={options.dateFormat || 'DD/MM/YYYY HH:mm:ss'}
    disabled={options.disabled || false}
    endDate={options.endDate || null}
    hour24={options.hour24 || false}
    isClearable={options.isClearable || false}
    locale={options.locale || moment().locale()}
    maxDate={options.maxDate || null}
    minDate={options.minDate || null}
    nowButton={options.nowButton || null}
    placeholderText={options.placeholder || 'Select date'}
    popoverAttachment={options.popoverAttachment || 'top left'}
    popoverTargetAttachment={options.popoverTargetAttachment || 'bottom left'}
    popoverTargetOffset={options.popoverTargetOffset || '10px 0'}
    showSeconds={options.showSeconds || false}
    showYearDropdown={options.yearDropdown || false}
    startDate={options.startDate || null}
    readOnly={options.readOnly || false}
    tetherConstraints={options.tetherConstraints || [{to: 'window', attachment: 'together'}]}
    timezone={options.timezone || null}
    todayButton={options.todayButton || null}
  />, el);
}
