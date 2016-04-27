import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Moment from 'moment'

function test(date){
  console.log('test: ' + date.format());
}
//ReactDOM.render(<Root />, document.getElementById('app'))
window.insertDatepicker(test, null, {showTime: true, showSeconds: true, showConfirm: true, todayButton: 'Today', yearDropdown: true}, document.getElementById('app'));
