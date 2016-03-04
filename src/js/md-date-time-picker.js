(function() {
  window.mdDateTimePicker = (function() {
    var addCellClickEvent, getNextMonthString, getPreviousMonthString, initDialog, initMonth, switchToView;

    function mdDateTimePicker(type, trigger, display, init, format, args) {
      this.type = type;
      this.trigger = trigger != null ? trigger : '';
      this.display = display != null ? display : '';
      this.init = init != null ? init : '';
      this.format = format != null ? format : '';
      this.args = args != null ? args : '';
      if (this.type === 'date') {
        console.log('init date');
      } else if (this.type === 'time') {
        console.log('init time');
      } else {
        console.error('a dialog type is required');
      }
    }

    mdDateTimePicker.prototype.open = function() {
      return alert(this.value);
    };

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
      initMonth(pickerDialog + next, moment(getNextMonthString(m)));
      switchToView(pickerDialog, document.querySelector(pickerDialog + '.md-picker__subtitle'));
    };

    initMonth = function(selector, m) {
      var cell, cells, firstDayOfMonth, i, lastDayoFMonth, selected, today, _i, _len;
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
          cell.classList.remove('md-picker__cell');
        }
      }
    };

    switchToView = function(pickerDialog, el) {
      el.addEventListener('click', function() {
        var current, header, view, viewHolder, yearView;
        el.classList.add('md-button--unclickable');
        current = document.querySelector(pickerDialog.trim());
        view = false;
        if (current.getAttribute('data-view') === 'true') {
          view = true;
        }
        viewHolder = document.querySelector(pickerDialog + '.md-picker__viewHolder');
        yearView = document.querySelector(pickerDialog + '.md-picker__years');
        header = document.querySelector(pickerDialog + '.md-picker__header');
        if (view) {
          viewHolder.classList.add('zoomOut');
          yearView.classList.remove('md-picker__years--invisible');
          yearView.classList.add('zoomIn');
        } else {
          yearView.classList.add('zoomOut');
          viewHolder.classList.remove('zoomOut');
          viewHolder.classList.add('zoomIn');
          setTimeout((function() {
            yearView.classList.remove('zoomIn', 'zoomOut');
            yearView.classList.add('md-picker__years--invisible');
            viewHolder.classList.remove('zoomIn');
          }), 1000);
        }
        header.classList.toggle('md-picker__header--invert');
        view = !view;
        current.setAttribute('data-view', view);
        setTimeout((function() {
          el.classList.remove('md-button--unclickable');
        }), 1000);
      });
    };

    addCellClickEvent = function(el) {
      var pickerDialog;
      pickerDialog = '.md-picker-date ';
      el.addEventListener('click', function() {
        var currentDate, day, monthYear;
        day = el.innerHTML;
        monthYear = document.querySelector(pickerDialog + '.md-picker__view--current .md-picker__month').innerHTML;
        currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY');
        document.querySelector(pickerDialog + '.md-picker__selected').classList.remove('md-picker__selected');
        el.classList.add('md-picker__selected');
        document.querySelector(pickerDialog).setAttribute('data-date', currentDate);
        document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
        document.querySelector(pickerDialog + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
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

    return mdDateTimePicker;

  })();

}).call(this);
