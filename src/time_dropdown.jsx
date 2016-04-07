import React from 'react'
import TimeDropdownOptions from './time_dropdown_options'

var TimeDropdown = React.createClass({
  displayName: 'TimeDropdown',

  propTypes: {
    minValue: React.PropTypes.number,
    maxValue: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },
  renderReadView () {
    return (
      <div>
        <span className="time-dropdown_label" onClick={this.toggleDropdown}>
          {(this.props.value > 9) ? this.props.value.toString() : ('0' + this.props.value.toString())}
        </span>
      </div>
    )
  },

  renderDropdown () {
    if(!this.state.dropdownVisible){
      return
    }
    else{
      return (
        <TimeDropdownOptions
          value={this.props.value}
          minValue={this.props.minValue}
          maxValue={this.props.maxValue}
          onChange={this.onChange}
          onCancel={this.toggleDropdown} />
      )
    }
  },

  onChange (option) {
    this.toggleDropdown()
    if (option === this.props.value) return
    this.props.onChange(option)
  },

  toggleDropdown () {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
  },

  render () {
    return (
      <div className="time-dropdown_main">
        {this.renderReadView()}
        {this.renderDropdown()}
      </div>
    )
  }
})

module.exports = TimeDropdown
