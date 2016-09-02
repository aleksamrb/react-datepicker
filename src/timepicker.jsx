import moment from 'moment-timezone'
import React from 'react'
import classnames from 'classnames'
import TimeDropdown from './time_dropdown'

var TimePicker = React.createClass({
  displayName: 'TimePicker',
  propTypes: {
    date: React.PropTypes.object,
    hour24: React.PropTypes.bool,
    onChangeTime: React.PropTypes.func.isRequired,
    nowButton: React.PropTypes.string,
    showSeconds: React.PropTypes.bool,
    timezone: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      date: moment().startOf('day')
    }
  },
  getInitialState () {
    return {
      selectedDate: this.props.date || moment().startOf('day')
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      selectedDate: nextProps.date || moment().startOf('day')
    });
  },
  handleNowClick(){
    var now = moment();
    var temp = this.state.selectedDate.clone().hour(now.hour()).minute(now.minute()).second(now.second()).millisecond(now.millisecond());
    this.props.onChangeTime(temp);
  },
  onIncreaseHour(){
    if(this.props.hour24){
      if(this.state.selectedDate.hour() < 23){
        this.props.onChangeTime(this.state.selectedDate.clone().add(1,'h'));
      }
    }
    else{
      if(this.state.selectedDate.format('hh') < 12){
        if(this.state.selectedDate.hour() === 11){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(0));
        }
        else if(this.state.selectedDate.hour() === 23){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(12));
        }
        else{
            this.props.onChangeTime(this.state.selectedDate.clone().add(1,'h'));
        }
      }
    }
  },
  onDecreaseHour(){
    if(this.props.hour24){
      if(this.state.selectedDate.hour() > 0){
        this.props.onChangeTime(this.state.selectedDate.clone().subtract(1, 'h'));
      }
    }
    else{
      if(this.state.selectedDate.format('hh') > 1){
        if(this.state.selectedDate.hour() === 12){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(23));
        }
        else if(this.state.selectedDate.hour() === 0){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(11));
        }
        else{
            this.props.onChangeTime(this.state.selectedDate.clone().subtract(1, 'h'));
        }
      }
    }
  },
  onIncreaseMinute(){
    if(this.state.selectedDate.minute() < 59){
      this.props.onChangeTime(this.state.selectedDate.clone().add(1, 'm'));
    }
  },
  onDecreaseMinute(){
      if(this.state.selectedDate.minute() > 0){
        this.props.onChangeTime(this.state.selectedDate.clone().subtract(1, 'm'));
      }
  },
  onIncreaseSecond(){
    if(this.state.selectedDate.second() < 59){
      this.props.onChangeTime(this.state.selectedDate.clone().add(1, 's'));
    }
  },
  onDecreaseSecond(){
      if(this.state.selectedDate.second() > 0){
        this.props.onChangeTime(this.state.selectedDate.clone().subtract(1, 's'));
      }
  },
  onAmpmChange(){
    if(this.state.selectedDate.hour() === 12){

      this.props.onChangeTime(this.state.selectedDate.clone().hour(0));
    }
    else if(this.state.selectedDate.hour() < 12){
      this.props.onChangeTime(this.state.selectedDate.clone().add(12, 'h'));
    }
    else{
      this.props.onChangeTime(this.state.selectedDate.clone().subtract(12, 'h'));
    }
  },
  onOptionHourChange(hour){
    if(this.props.hour24){
      this.props.onChangeTime(this.state.selectedDate.clone().hour(hour));
    }
    else{
      if(this.state.selectedDate.hour() < 12){ //AM
        if(hour === 12){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(0));
        }
        else{
          this.props.onChangeTime(this.state.selectedDate.clone().hour(hour));
        }
      }
      else { //PM
        if(hour === 12){
          this.props.onChangeTime(this.state.selectedDate.clone().hour(12));
        }
        else{
          this.props.onChangeTime(this.state.selectedDate.clone().hour(hour + 12));
        }
      }
    }
  },
  onOptionMinuteChange(minute){
    this.props.onChangeTime(this.state.selectedDate.clone().minute(minute));
  },
  onOptionSecondChange(second){
    this.props.onChangeTime(this.state.selectedDate.clone().second(second));
  },
  renderGrid(){
    var currentDate = this.state.selectedDate;
    return(
    <div className="grid">
      <div className="grid__column">
          <div className="grid__item"><div className="triangle-up-time" onClick={this.onIncreaseHour}></div></div>
          <div className="grid__item">
            <TimeDropdown value={this.props.hour24 ? parseInt(currentDate.format('HH')) : parseInt(currentDate.format('hh'))} minValue={this.props.hour24 ? 0 : 1} maxValue={this.props.hour24 ? 23 : 12} onChange={this.onOptionHourChange}/>
          </div>
          <div className="grid__item"><div className="triangle-down-time" onClick={this.onDecreaseHour}></div></div>
      </div>

      <div className="grid__column--small">
        <div className="grid__item"><span>:</span></div>
      </div>

      <div className="grid__column">
        <div className="grid__item"><div className="triangle-up-time" onClick={this.onIncreaseMinute}></div></div>
        <div className="grid__item">
          <TimeDropdown value={parseInt(currentDate.format('mm'))} minValue={0} maxValue={59} onChange={this.onOptionMinuteChange}/>
        </div>
        <div className="grid__item"><div className="triangle-down-time" onClick={this.onDecreaseMinute}></div></div>
      </div>

      {this.props.showSeconds ?
      <div className="grid__column--small">
        <div className="grid__item"><span>:</span></div>
      </div>
      : false}

      {this.props.showSeconds ?
      <div className="grid__column">
        <div className="grid__item"><div className="triangle-up-time" onClick={this.onIncreaseSecond}></div></div>
        <div className="grid__item">
          <TimeDropdown value={parseInt(currentDate.format('ss'))} minValue={0} maxValue={59} onChange={this.onOptionSecondChange}/>
        </div>
        <div className="grid__item"><div className="triangle-down-time" onClick={this.onDecreaseSecond}></div></div>
      </div>
      :false}

      {!this.props.hour24 ?
      <div className="grid__column">
        <div className="grid__item"><div className="triangle-up-time" onClick={this.onAmpmChange}></div></div>
        <div className="grid__item">
          <span className="amPm-label">{(currentDate.hour() >= 12) ? "PM" : "AM"}</span>
        </div>
        <div className="grid__item"><div className="triangle-down-time" onClick={this.onAmpmChange}></div></div>
      </div>
      : false }

    </div>
  )},
  renderNowButton(){
      if (!this.props.nowButton) {
        return
      }
      return (
        <div className="react-datepicker__now-button">
          <span onClick={this.handleNowClick}>{this.props.nowButton}</span>
        </div>
      )
  },
  render () {
    return (
      <div className="react-datepicker__time">
        {this.renderGrid()}
        {this.renderNowButton()}
      </div>
    )
  }
})
module.exports = TimePicker
