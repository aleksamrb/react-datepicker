import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import TetherComponent from 'react-tether'
import classnames from 'classnames'
import { isSameDay } from './date_utils'
import Moment from 'moment';

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'

/**
 * General datepicker component.
 */

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
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
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    renderCalendarTo: React.PropTypes.any,
    required: React.PropTypes.bool,
    selected: React.PropTypes.object,
    showConfirmButtons: React.PropTypes.bool,
    showTime: React.PropTypes.bool,
    showSeconds: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    tetherConstraints: React.PropTypes.array,
    title: React.PropTypes.string,
    todayButton: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      onFocus () {},
      onBlur () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ]
    }
  },

  getInitialState () {
    return {
      open: false,
      selected: this.props.selected || Moment() // default to now
    }
  },

  setOpen (open) {
    this.setState({ open })
  },

  handleFocus (event) {
    this.props.onFocus(event)
    this.setOpen(true)
  },

  handleBlur (event) {
    if (this.state.open) {
      this.refs.input.focus()
    } else {
      this.props.onBlur(event)
    }
  },

  handleCalendarClickOutside (event) {
    this.setState({selected: this.props.selected || Moment()});
    this.setOpen(false)
  },

  handleSelect (date) {
    this.setState({selected: new Moment(date)});

    if(!this.props.showConfirmButtons){
      this.setSelected(date)
      //this.setOpen(false)
    }
  },

  setSelected (date) {
      this.props.onChange(date);
  },
  onInputClick () {
    this.setOpen(true)
  },

  onInputKeyDown (event) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
  },
  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null)
  },
  handleOkClick (){
    this.props.onChange(this.state.selected)
    this.setOpen(false)
  },
  handleCancelClick (){
    this.setState({selected: this.props.selected || Moment()});
    this.setOpen(false);
  },
  renderCalendar () {
    if (!this.state.open || this.props.disabled) {
      return null
    }
    return <Calendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormat}
        dateFormatCalendar={this.props.dateFormatCalendar}
        selected={this.state.selected}
        onSelect={this.handleSelect}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        hour24={this.props.hour24}
        onClickOutside={this.handleCalendarClickOutside}
        onClickOk={this.handleOkClick}
        onClickCancel={this.handleCancelClick}
        includeDates={this.props.includeDates}
        showConfirmButtons={this.props.showConfirmButtons}
        showTime={this.props.showTime}
        showSeconds={this.props.showSeconds}
        showYearDropdown={this.props.showYearDropdown}
        todayButton={this.props.todayButton}
        outsideClickIgnoreClass={outsideClickIgnoreClass} />
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })
    return <DateInput
        ref='input'
        id={this.props.id}
        name={this.props.name}
        date={this.props.selected}
        locale={this.props.locale}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        excludeDates={this.props.excludeDates}
        includeDates={this.props.includeDates}
        filterDate={this.props.filterDate}
        dateFormat={this.props.dateFormat}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.onInputClick}
        onKeyDown={this.onInputKeyDown}
        onChangeDate={this.setSelected}
        placeholder={this.props.placeholderText}
        disabled={this.props.disabled}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        showTime={this.props.showTime} />
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick}></a>
    } else {
      return null
    }
  },
  render () {
    return (
        <TetherComponent
            classPrefix={"react-datepicker__tether"}
            attachment={this.props.popoverAttachment}
            targetAttachment={this.props.popoverTargetAttachment}
            targetOffset={this.props.popoverTargetOffset}
            renderElementTo={this.props.renderCalendarTo}
            constraints={this.props.tetherConstraints}>
          <div className="react-datepicker__input-container">
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
          {this.renderCalendar()}
        </TetherComponent>
      )
  }
})

module.exports = DatePicker
