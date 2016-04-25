import React from 'react'

function generateOptions(min, max) {
  var list = []
  for (var i = min; i <= max; i++) {
    list.push(i)
  }
  return list
}

var TimeDropdownOptions = React.createClass({
  displayName: 'TimeDropdownOptions',

  propTypes: {
    minValue: React.PropTypes.number,
    maxValue: React.PropTypes.number,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired
  },

  mixins: [require('react-onclickoutside')],

  getInitialState () {
    return {
      optionsList: generateOptions(this.props.minValue, this.props.maxValue)
    }
  },

  renderOptions () {
    var selectedValue = this.props.value
    var options = this.state.optionsList.map(option =>
      <div className={selectedValue === option ? "time-dropdown_option--selected" : "time-dropdown_option"}
          key={option}
          onClick={this.onChange.bind(this, option)}>
        {option}
      </div>
    )

    /*options.unshift(
      <div className="react-datepicker__year-option"
          ref={"upcoming"}
          key={"upcoming"}
          onClick={this.incrementYears}>
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"></a>
      </div>
    )
    options.push(
      <div className="react-datepicker__year-option"
          ref={"previous"}
          key={"previous"}
          onClick={this.decrementYears}>
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"></a>
      </div>
    )*/
    return options
  },

  onChange (value) {
    this.props.onChange(value)
  },

  handleClickOutside () {
    this.props.onCancel()
  },

  /*shiftYears (amount) {
    var years = this.state.yearsList.map(function (year) {
      return year + amount
    })

    this.setState({
      yearsList: years
    })
  },

  incrementYears () {
    return this.shiftYears(1)
  },

  decrementYears () {
    return this.shiftYears(-1)
  },*/

  render () {
    return (
      <div className="time-dropdown_dropdown">
        {this.renderOptions()}
      </div>
    )
  }
})

module.exports = TimeDropdownOptions
