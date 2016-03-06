
/**
 * @package md-date-time-picker
 * @version [0.0.1]
 * @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
 * @license MIT
 * @website no website right now
 */

(function() {
  window.mdDateTimePicker = (function() {

    /**
     * @private
     */

    /**
     * [dialog css classes]
     * @type {Object}
     */
    var addCellClickEvent, addSelectedCell, getNextMonthString, getPreviousMonthString, initDateDialog, initMonth, selectDialog, showDialog, switchToView;

    mdDateTimePicker._dialog = {
      'date': {
        'picker': '.md-picker-date '
      },
      'time': ''
    };


    /**
     * @public
     * [constructor of the module]
     * 					 @param  {[string]}   @type         [type of dialog] ['date','time']
     * @optional @param  {[string]}   @init    = '' [initial value for the dialog date or time, defaults to today]
     * @optional @param  {[string]}   @format  = '' [the format of the moment date e.g 'D MM YYYY' for init 1 1 2016, defaults to the 'YYYY-MM-DD' ISO date format]
     * @optional @param  {[string]}   @display = '' [the document element where the current date is displayed]
     * @optional @param  {[type]}     @args    = '' [additional arguments of the dialog]
     * @return {[mdDateTimePicker]}                 [this component]
     */

    function mdDateTimePicker(type, init, format, display, args) {
      this.type = type;
      this.init = init;
      this.format = format != null ? format : 'YYYY-MM-DD';
      this.display = display != null ? display : '';
      this.args = args != null ? args : '';

      /**
       * [dialog selected classes has the same structure as dialog but one level down]
       * @type {Object}
       * e.g
       * sDialog = {
       *   picker: 'some-picker-selected'
       * }
       */
      this._sDialog = {};
      if (this instanceof window.mdDateTimePicker) {
        if (this.type) {
          this._sDialog = selectDialog(this.constructor._dialog, this.type);
        }
      } else {
        return new window.mdDateTimePicker(this.type, this.init, this.format, this.display, this.args);
      }
    }

    mdDateTimePicker.prototype.toggle = function() {
      if (this.type === 'date') {
        initDateDialog(this._sDialog.date);
      } else if (this.type === 'time') {
        console.log('init time');
      }
      showDialog(this._sDialog);
    };


    /**
     * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
     * @param  {[moment]} m [date for today or current]
     */

    selectDialog = function(dialog, type) {
      var sDialog;
      sDialog = {};
      sDialog.picker = document.querySelector(dialog[type].picker.trim());
      sDialog.view = false;
      sDialog.date = this.init ? moment(this.init, this.format) : moment();
      return sDialog;
    };

    showDialog = function(dialog) {
      dialog.picker.classList.remove('md-picker--inactive');
      dialog.picker.classList.add('zoomIn');
    };

    initDateDialog = function(m) {
      var current, next, pickerDialog, previous;
      pickerDialog = '.md-picker-date ';
      current = '.md-picker__view--current ';
      previous = '.md-picker__view--previous ';
      next = '.md-picker__view--next ';
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
      firstDayOfMonth = parseInt(moment(m).date(1).day(), 10);
      today = -1;
      selected = -1;
      lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1;
      if (!(moment().diff(m, 'month')) && !(moment().diff(m, 'year'))) {
        today = parseInt(moment().format('D'), 10);
        today += firstDayOfMonth - 1;
        selected = parseInt(moment(m).format('D'), 10);
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
          cell.classList.add('md-picker__cell');
          addCellClickEvent(cell);
        }
        if (i > lastDayoFMonth) {
          cell.classList.remove('md-picker__cell');
        }
      }
    };

    switchToView = function(pickerDialog, el) {
      el.addEventListener('click', function() {
        var current, header, viewHolder, yearView;
        el.classList.add('md-button--unclickable');
        current = document.querySelector(pickerDialog.trim());
        viewHolder = document.querySelector(pickerDialog + '.md-picker__viewHolder');
        yearView = document.querySelector(pickerDialog + '.md-picker__years');
        header = document.querySelector(pickerDialog + '.md-picker__header');
        if (this.sDialog.view) {
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
        this.sDialog.view = !this.sDialog.view;
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
        this.sDialog.date = currentDate;
        document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
        document.querySelector(pickerDialog + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
      });
    };

    addSelectedCell = function(el) {};

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
