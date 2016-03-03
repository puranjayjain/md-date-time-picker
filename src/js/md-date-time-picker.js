//! md-date-time-picker
//! version : 0.0.1
//! authors : Puranjay Jain
//! license : MIT
//! no website right now

//TODO right this in a module style

console.log(moment('29-2-2016', 'DD-MM-YYYY').isValid());

initDialog(moment());

//to initiate the date picker dialog
function initDialog(date) {
  // console.log(moment(date).format('YYYY'));
  var m = moment(date);
  var pickerDialog = '.md-picker-date ';
  var current = '.md-picker__view--current ';
  var previous = '.md-picker__view--previous ';
  var next = '.md-picker__view--next ';
  document.querySelector(pickerDialog).setAttribute('data-date', moment(date));
  document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = m.format('YYYY');
  document.querySelector(pickerDialog + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
  //set evrything for the current month
  document.querySelector(pickerDialog + current + '.md-picker__month').innerHTML = m.format('MMMM YYYY');
  //set everything for the previous month
  document.querySelector(pickerDialog + previous + '.md-picker__month').innerHTML = getPreviousMonthString(m);
  //set everything for the next month
  document.querySelector(pickerDialog + next + '.md-picker__month').innerHTML = getNextMonthString(m);
}

//helper functions for general calculations
function getPreviousMonthString(moment) {
  var m = moment.clone();
  m.subtract(1,'month');
  return m.format('MMMM YYYY');
}
function getNextMonthString(moment) {
  var m = moment.clone();
  m.add(1,'month');
  return m.format('MMMM YYYY');
}
