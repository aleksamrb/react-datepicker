import React from 'react'
import YearDropdownOptions from './year_dropdown_options'
import {allDaysDisabledBefore, allDaysDisabledAfter} from './date_utils'

var YearDropdown = React.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    currentDate: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    year: React.PropTypes.number.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    includeDates: React.PropTypes.object
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  increaseYear () {
    this.props.onChange(this.props.year + 1);
  },

  decreaseYear () {
    this.props.onChange(this.props.year - 1);
  },
  renderReadView () {
    return (
      <div className="react-datepicker__year-read-view">
        {!allDaysDisabledBefore(this.props.currentDate, 'year', this.props) ? <a className="react-datepicker__nav-year react-datepicker__nav-year--previous" onClick={this.decreaseYear}/> : false}
        <span className="react-datepicker__year-read-view--selected-year" onClick={this.toggleDropdown}>{this.props.year}</span>

        {!allDaysDisabledAfter(this.props.currentDate, 'year', this.props) ? <a className="react-datepicker__nav-year react-datepicker__nav-year--next"  onClick={this.increaseYear}/> :false}
        {/*<span className="react-datepicker__year-read-view--down-arrow"></span>*/}
      </div>
    )
  },

  renderDropdown () {
    if(!this.state.dropdownVisible){
      return
    }
    else{
      return (
        <YearDropdownOptions
            ref="options"
            year={this.props.year}
            onChange={this.onChange}
            onCancel={this.toggleDropdown} />
      )
    }

  },

  onChange (year) {
    this.toggleDropdown()
    if (year === this.props.year) return
    this.props.onChange(year)
  },

  toggleDropdown () {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
  },

  render () {
    return (
      <div className="react-datepicker__year">
        {this.renderReadView()}
        {this.renderDropdown()}
      </div>
    )
  }
})

module.exports = YearDropdown
