import React from 'react'
import moment from 'moment-timezone'
import { isSameDay, isDayDisabled, isSameTime } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    customInput: React.PropTypes.element,
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    disabled: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeDate: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L',
      locale: moment().locale()
    }
  },

  getInitialState () {
    return {
      value: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
      this.setState({
        value: this.safeDateFormat(newProps)
      })
  },

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value)
    }
  },

  handleChangeDate (value) {
    if (this.props.onChangeDate) {
      var date = moment(value, this.props.dateFormat, this.props.locale, true)
      if (date.isValid() && !isDayDisabled(date, this.props)) {
        this.props.onChangeDate(date)
      } else if (value === '') {
        this.props.onChangeDate(null)
      }
    }
    this.setState({value})
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || ''
  },

  handleBlur (event) {
    this.setState({
      value: this.safeDateFormat(this.props)
    })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    const { customInput, date, locale, minDate, maxDate, excludeDates, includeDates, filterDate, dateFormat, onChangeDate, ...rest } = this.props // eslint-disable-line no-unused-vars

    if (customInput) {
      return React.cloneElement(customInput, {
        ...rest,
        ref: 'input',
        value: this.state.value,
        onBlur: this.handleBlur,
        onChange: this.handleChange
      })
    }

    return (<input
        ref='input'
        type='text'
        {...rest}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />);
  }
})

module.exports = DateInput
