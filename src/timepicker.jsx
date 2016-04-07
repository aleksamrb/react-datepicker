import moment from 'moment'
import React from 'react'
import classnames from 'classnames'
import TimeDropdown from './time_dropdown'

var TimePicker = React.createClass({
  displayName: 'TimePicker',
  propTypes: {
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    hour24: React.PropTypes.bool,
    onChangeTime: React.PropTypes.func.isRequired,
    showSeconds: React.PropTypes.bool
  },
  getDefaultProps () {
    return {
      date: moment(),
      dateFormat: "DD/MM/YYYY HH:mm:ss"
    }
  },
  getInitialState () {
    return {};
  },
  handleNowClick(){
    var now = moment();
    var temp = this.props.date.clone().hour(now.hour()).minute(now.minute()).second(now.second()).millisecond(now.millisecond());
    this.props.onChangeTime(temp);
  },
  onIncreaseHour(){
    if(this.props.hour24){
      if(this.props.date.hour() < 23){
        this.props.onChangeTime(this.props.date.clone().add(1,'h'));
      }
    }
    else{
      if(this.props.date.format('hh') < 12){
        if(this.props.date.hour() === 11){
          this.props.onChangeTime(this.props.date.clone().hour(0));
        }
        else if(this.props.date.hour() === 23){
          this.props.onChangeTime(this.props.date.clone().hour(12));
        }
        else{
            this.props.onChangeTime(this.props.date.clone().add(1,'h'));
        }
      }
    }
  },
  onDecreaseHour(){
    if(this.props.hour24){
      if(this.props.date.hour() > 0){
        this.props.onChangeTime(this.props.date.clone().subtract(1, 'h'));
      }
    }
    else{
      if(this.props.date.format('hh') > 1){
        if(this.props.date.hour() === 12){
          this.props.onChangeTime(this.props.date.clone().hour(23));
        }
        else if(this.props.date.hour() === 0){
          this.props.onChangeTime(this.props.date.clone().hour(11));
        }
        else{
            this.props.onChangeTime(this.props.date.clone().subtract(1, 'h'));
        }
      }
    }
  },
  onIncreaseMinute(){
    if(this.props.date.minute() < 59){
      this.props.onChangeTime(this.props.date.clone().add(1, 'm'));
    }
  },
  onDecreaseMinute(){
      if(this.props.date.minute() > 0){
        this.props.onChangeTime(this.props.date.clone().subtract(1, 'm'));
      }
  },
  onIncreaseSecond(){
    if(this.props.date.second() < 59){
      this.props.onChangeTime(this.props.date.clone().add(1, 's'));
    }
  },
  onDecreaseSecond(){
      if(this.props.date.second() > 0){
        this.props.onChangeTime(this.props.date.clone().subtract(1, 's'));
      }
  },
  onAmpmChange(){
    if(this.props.date.hour() === 12){

      this.props.onChangeTime(this.props.date.clone().hour(0));
    }
    else if(this.props.date.hour() < 12){
      this.props.onChangeTime(this.props.date.clone().add(12, 'h'));
    }
    else{
      this.props.onChangeTime(this.props.date.clone().subtract(12, 'h'));
    }
  },
  onOptionHourChange(hour){
    if(this.props.hour24){
      this.props.onChangeTime(this.props.date.clone().hour(hour));
    }
    else{
      if(this.props.date.hour() < 12){ //AM
        if(hour === 12){
          this.props.onChangeTime(this.props.date.clone().hour(0));
        }
        else{
          this.props.onChangeTime(this.props.date.clone().hour(hour));
        }
      }
      else { //PM
        if(hour === 12){
          this.props.onChangeTime(this.props.date.clone().hour(12));
        }
        else{
          this.props.onChangeTime(this.props.date.clone().hour(hour + 12));
        }
      }
    }
  },
  onOptionMinuteChange(minute){
    this.props.onChangeTime(this.props.date.clone().minute(minute));
  },
  onOptionSecondChange(second){
    this.props.onChangeTime(this.props.date.clone().second(second));
  },
  renderGrid(){
    return(
    <div className="grid">
      <div className="grid__column">
          <div className="grid__item"><div className="triangle-up-time" onClick={this.onIncreaseHour}></div></div>
          <div className="grid__item">
            <TimeDropdown value={this.props.hour24 ? parseInt(this.props.date.format('HH')) : parseInt(this.props.date.format('hh'))} minValue={this.props.hour24 ? 0 : 1} maxValue={this.props.hour24 ? 23 : 12} onChange={this.onOptionHourChange}/>
          </div>
          <div className="grid__item"><div className="triangle-down-time" onClick={this.onDecreaseHour}></div></div>
      </div>

      <div className="grid__column--small">
        <div className="grid__item"><span>:</span></div>
      </div>

      <div className="grid__column">
        <div className="grid__item"><div className="triangle-up-time" onClick={this.onIncreaseMinute}></div></div>
        <div className="grid__item">
          <TimeDropdown value={parseInt(this.props.date.format('mm'))} minValue={0} maxValue={59} onChange={this.onOptionMinuteChange}/>
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
          <TimeDropdown value={parseInt(this.props.date.format('ss'))} minValue={0} maxValue={59} onChange={this.onOptionSecondChange}/>
        </div>
        <div className="grid__item"><div className="triangle-down-time" onClick={this.onDecreaseSecond}></div></div>
      </div>
      :false}

      {!this.props.hour24 ?
      <div className="grid__column">
        <div className="grid__item"><div className="triangle-up-time" onClick={this.onAmpmChange}></div></div>
        <div className="grid__item">
          <span className="amPm-label">{(this.props.date.hour() >= 12) ? "PM" : "AM"}</span>
        </div>
        <div className="grid__item"><div className="triangle-down-time" onClick={this.onAmpmChange}></div></div>
      </div>
      : false }

    </div>
  )},
  render () {
    return (
      <div className="react-datepicker__time">
        {this.renderGrid()}
        <div className="react-datepicker__time-label">{this.props.date.format(this.props.dateFormat)}</div>
        <div className="react-datepicker__now-button" onClick={this.handleNowClick}>NOW</div>
      </div>
    )
  }
})
module.exports = TimePicker
