import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Moment from 'moment'
import DatePicker from 'react-datepicker';

//ReactDOM.render(<Root />, document.getElementById('app'))
window.insertDatepicker(function(){}, Moment(), {dateFormat:'L LT', locale: 'en_us', showTime: true, showSeconds: true, showConfirm: true, todayButton: 'Today', yearDropdown: true}, document.getElementById('app'));
