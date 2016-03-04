(function() {
  var addCellClickEvent, getNextMonthString, getPreviousMonthString, initDialog, initMonth;

  initDialog = function(date) {
    var current, m, next, pickerDialog, previous;
    m = moment([2016, 2, 1]);
    pickerDialog = '.md-picker-date ';
    current = '.md-picker__view--current ';
    previous = '.md-picker__view--previous ';
    next = '.md-picker__view--next ';
    document.querySelector(pickerDialog).setAttribute('data-date', moment(date));
    document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = m.format('YYYY');
    document.querySelector(pickerDialog + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
    initMonth(pickerDialog + current, m);
    initMonth(pickerDialog + previous, moment(getPreviousMonthString(m)));
    return initMonth(pickerDialog + next, moment(getNextMonthString(m)));
  };

  initMonth = function(selector, m) {
    var cell, cells, firstDayOfMonth, i, lastDayoFMonth, selected, today, _i, _len, _results;
    document.querySelector(selector + '.md-picker__month').innerHTML = m.format('MMMM YYYY');
    cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span');
    firstDayOfMonth = parseInt(moment(m).date(1).day());
    today = -1;
    selected = -1;
    lastDayoFMonth = parseInt(moment(m).endOf('month').format('D')) + firstDayOfMonth - 1;
    if (!(moment().diff(m, 'month')) && !(moment().diff(m, 'year'))) {
      today = parseInt(moment().format('D'));
      today += firstDayOfMonth - 1;
      selected = parseInt(moment(m).format('D'));
      selected += firstDayOfMonth - 1;
    }
    _results = [];
    for (i = _i = 0, _len = cells.length; _i < _len; i = ++_i) {
      cell = cells[i];
      if (i < firstDayOfMonth) {
        cell.classList.remove('md-picker__cell');
      }
      if (today === i) {
        cell.classList.add('md-picker__today');
      }
      if (selected === i) {
        cell.classList.add('md-picker__selected');
      }
      if ((i >= firstDayOfMonth) && (i <= lastDayoFMonth)) {
        addCellClickEvent(cell);
      }
      if (i > lastDayoFMonth) {
        _results.push(cell.classList.remove('md-picker__cell'));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  addCellClickEvent = function(el) {
    var pickerDialog;
    pickerDialog = '.md-picker-date ';
    return el.addEventListener('click', function(event) {
      var currentDate, day, monthYear;
      day = el.innerHTML;
      monthYear = document.querySelector(pickerDialog + '.md-picker__view--current .md-picker__month').innerHTML;
      currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY');
      document.querySelector(pickerDialog + '.md-picker__selected').classList.remove('md-picker__selected');
      el.classList.add('md-picker__selected');
      document.querySelector(pickerDialog).setAttribute('data-date', currentDate);
      document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
      return document.querySelector(pickerDialog + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
    });
  };

  getPreviousMonthString = function(moment) {
    var m;
    m = moment.clone();
    return m.subtract(1, 'month');
  };

  getNextMonthString = function(moment) {
    var m;
    m = moment.clone();
    return m.add(1, 'month');
  };

  initDialog(moment());

}).call(this);
