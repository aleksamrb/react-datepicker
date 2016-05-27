import React from 'react'
import moment from 'moment'
import { isSameDay, isDayDisabled, isSameTime } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeDate: React.PropTypes.func,
    showTime: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormat: 'L',
      locale: moment().locale(),
      showTime: false
    }
  },

  getInitialState () {
    return {
      maybeDate: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
    if(this.props.showTime){
      if (!isSameTime(newProps.date, this.props.date) ||
            newProps.locale !== this.props.locale ||
            newProps.dateFormat !== this.props.dateFormat) {
        this.setState({
          maybeDate: this.safeDateFormat(newProps)
        })
      }
    }
    else{
      if (!isSameDay(newProps.date, this.props.date) ||
            newProps.locale !== this.props.locale ||
            newProps.dateFormat !== this.props.dateFormat) {
        this.setState({
          maybeDate: this.safeDateFormat(newProps)
        })
      }
    }
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
    this.setState({
      maybeDate: value
    })
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
     .locale(props.locale || moment().locale())
     .format(props.dateFormat) || ''
  },

  handleBlur (event) {
    this.setState({
      maybeDate: this.safeDateFormat(this.props)
    })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    return <input
        ref='input'
        type='text'
        {...this.props}
        value={this.state.maybeDate}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />
  }
})

module.exports = DateInput
