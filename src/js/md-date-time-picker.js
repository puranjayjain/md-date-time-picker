//! md-date-time-picker
//! version : 0.0.1
//! authors : Puranjay Jain
//! license : MIT
//! no website right now

//TODO right this in a module style

console.log();

initDialog(moment());

//to initiate the date picker dialog
function initDialog(date) {
  // console.log(moment(date).format('YYYY'));
  //TODO REPLACE [2016, 2, 1] with date
  var m = moment([2016, 2, 1]);
  var pickerDialog = '.md-picker-date ';
  var current = '.md-picker__view--current ';
  var previous = '.md-picker__view--previous ';
  var next = '.md-picker__view--next ';
  document.querySelector(pickerDialog).setAttribute('data-date', moment(date));
  document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = m.format('YYYY');
  document.querySelector(pickerDialog + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
  //set everything for the current month
  initMonth(pickerDialog + current, m);
  //set everything for the previous month
  initMonth(pickerDialog + previous, moment(getPreviousMonthString(m)));
  //set everything for the next month
  initMonth(pickerDialog + next, moment(getNextMonthString(m)));
}

//init month
function initMonth(selector, m) {
  //set month title
  document.querySelector(selector + '.md-picker__month').innerHTML = m.format('MMMM YYYY');
  var cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span');
  //calculate prerequisites
  var firstDayOfMonth = parseInt(moment(m).date(1).day());
  var today = -1;
  var selected = -1;
  var lastDayoFMonth = parseInt(moment(m).endOf('month').format('D')) + firstDayOfMonth - 1;
  //if this month and year is the same as the today's month and year respectively
  if (!(moment().diff(m, 'month')) && !(moment().diff(m, 'year'))) {
    today = parseInt(moment().format('D'));
    today += firstDayOfMonth - 1;
    selected = parseInt(moment(m).format('D'));
    selected += firstDayOfMonth - 1;
  }
  for (var i in cells) {
    var cell = cells[i];
    //if the cell is before this month's first date
    if (i < firstDayOfMonth) {
      cell.classList.remove('md-picker__cell');
    }
    //if today add the today class
    if (today == i) {
      cell.classList.add('md-picker__today');
    }
    //if the selected date is here
    if (selected == i) {
      cell.classList.add('md-picker__selected');
    }
    //if the cell is in this month
    if ((i >= firstDayOfMonth) && (i <= lastDayoFMonth)) {
      //add event for cell click
      addCellClickEvent(cell);
    }
    //if the cell is after this month's last date
    if (i > lastDayoFMonth) {
      cell.classList.remove('md-picker__cell');
    }
  }
}

//event handlers for various elements
function addCellClickEvent(el) {
  var pickerDialog = '.md-picker-date ';
  el.addEventListener('click', function() {
    //get the current date
    var day = el.innerHTML;
    var monthYear = document.querySelector(pickerDialog +'.md-picker__view--current .md-picker__month').innerHTML;
    var currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY');
    //remove previous selected style
    document.querySelector(pickerDialog + '.md-picker__selected').classList.remove('md-picker__selected');
    //add selected class to self
    el.classList.add('md-picker__selected');
    //change the current display date and data to the current date
    document.querySelector(pickerDialog).setAttribute('data-date', currentDate);
    document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
    document.querySelector(pickerDialog + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
  });
}

//helper functions for general calculations
function getPreviousMonthString(moment) {
  var m = moment.clone();
  return m.subtract(1,'month');
}
function getNextMonthString(moment) {
  var m = moment.clone();
  return m.add(1,'month');
}
