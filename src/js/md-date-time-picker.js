/**
 * @package md-date-time-picker
 * @version [0.0.1]
 * @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
 * @license MIT
 * @website no website right now
 */

/**
 * All declarations starting with _ are considered @private
 */

class mdDateTimePicker {
  /**
   * [constructor of the mdDateTimePicker]
   *
   * @method constructor
   *
   * @param  {[string]}    type         [type of dialog] ['date','time']
   * @param  {[string]}    init    = '' [initial value for the dialog date or time, defaults to today]
   * @param  {[string]}    format  = '' [the format of the moment date e.g 'D MM YYYY' for init 1 1 2016, defaults to the 'YYYY-MM-DD' ISO date format]
   * @param  {[string]}    display = '' [the document element where the current date is displayed]
   * @param  {[args]}      args    = '' [additional arguments of the dialog]
   *
   * @return {[type]}    [this component]
   */
  constructor(type, init = '', format = '', display = '', args = '') {
    this.type = type;

    if (this.type) {
      /**
       * [dialog selected classes has the same structure as dialog but one level down]
       * @type {Object}
       * e.g
       * sDialog = {
       *   picker: 'some-picker-selected'
       * }
       */
      this._sDialog = {};
      this._dialog = this.constructor._dialog();
    }
  }

  toggle() {
    this._selectDialog();
    if (this.type === 'date') {
      this._initDateDialog(this._sDialog.date);
    } else if (this.type === 'time') {
      // this._initTimeDialog(this._sDialog.date);
    }
    this._showDialog();
  }

  /**
   * [_dialog to store general values]
   *
   * @method _dialog
   *
   * @return {[type]} [description]
   */
  static _dialog() {
    return {
      date: {
        picker: '.md-picker-date ',
        pickerDialog: '.md-picker-date ',
        current: '.md-picker__view--current ',
        previous: '.md-picker__view--previous ',
        next: '.md-picker__view--next '
      },
      time: {

      }
    };
  }

  /**
   * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
   * @param  {[moment]} m [date for today or current]
   */
  _selectDialog() {
    this._sDialog.picker = document.querySelector(this._dialog[this.type].picker.trim());
    if (this.init) {
      this._sDialog.date = moment(this.init, this.format)
    } else {
      this._sDialog.date = moment();
    }
  }

  _showDialog() {
    this._sDialog.picker.classList.remove('md-picker--inactive');
    this._sDialog.picker.classList.add('zoomIn');
  };

  /**
   * [initDateDialog description]
   * @param  {[type]} m [description]
   * @return {[type]}   [description]
   */

  _initDateDialog(m) {
    var pickerDialog = this._dialog.date.pickerDialog;
    var current = this._dialog.date.current;
    var previous = this._dialog.date.previous;
    var next = this._dialog.date.next;
    document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = m.format('YYYY');
    document.querySelector(pickerDialog + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
    this._initMonth(pickerDialog + current, m);
    this._initMonth(pickerDialog + previous, moment(this._getPreviousMonthString(m)));
    this._initMonth(pickerDialog + next, moment(this._getNextMonthString(m)));
    this._viewDate(pickerDialog, false);
    this._switchToDateView(pickerDialog, document.querySelector(pickerDialog + '.md-picker__subtitle'));
  }

  /**
   * [initMonth description]
   * @param  {[type]} selector [description]
   * @param  {[type]} m        [description]
   * @return {[type]}          [description]
   */

  _initMonth(selector, m) {
    var cell, cells, currentDay, firstDayOfMonth, i, j, lastDayoFMonth, len, selected, selectedClass, today, todayClass;
    document.querySelector(selector + '.md-picker__month').innerHTML = m.format('MMMM YYYY');
    todayClass = document.querySelector(selector + '.md-picker__today');
    selectedClass = document.querySelector(selector + '.md-picker__selected');
    cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span');
    firstDayOfMonth = parseInt(moment(m).date(1).day(), 10);
    today = -1;
    selected = -1;
    lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1;
    if (moment().format('M') === m.format('M') && moment().format('YYYY') === m.format('YYYY')) {
      today = parseInt(moment().format('D'), 10);
      today += firstDayOfMonth - 1;
    }
    if (moment().format('M') === m.format('M') && moment().format('YYYY') === m.format('YYYY')) {
      selected = parseInt(moment(m).format('D'), 10);
      selected += firstDayOfMonth - 1;
    }
    if (todayClass) {
      todayClass.classList.remove('md-picker__today');
    }
    if (selectedClass) {
      selectedClass.classList.remove('md-picker__selected');
    }
    for (i = j = 0, len = cells.length; j < len; i = ++j) {
      cell = cells[i];
      currentDay = i - firstDayOfMonth + 1;
      if (i < firstDayOfMonth) {
        cell.classList.remove('md-picker__cell');
        cell.innerHTML = '';
      }
      if (today === i) {
        cell.classList.add('md-picker__today');
      }
      if (selected === i) {
        cell.classList.add('md-picker__selected');
      }
      if ((i >= firstDayOfMonth) && (i <= lastDayoFMonth)) {
        cell.classList.add('md-picker__cell');
        cell.innerHTML = currentDay;
        this._addCellClickEvent(cell);
      }
      if (i > lastDayoFMonth) {
        cell.classList.remove('md-picker__cell');
        cell.innerHTML = '';
      }
    }
  }
  _switchToDateView(pickerDialog, el) {
    el.addEventListener('click', function() {
      var current, header, viewHolder, yearView;
      el.classList.add('md-button--unclickable');
      current = document.querySelector(pickerDialog.trim());
      viewHolder = document.querySelector(pickerDialog + '.md-picker__viewHolder');
      yearView = document.querySelector(pickerDialog + '.md-picker__years');
      header = document.querySelector(pickerDialog + '.md-picker__header');
      if (viewDate(pickerDialog)) {
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
      setTimeout((function() {
        el.classList.remove('md-button--unclickable');
      }), 1000);
      console.info(!(viewDate(pickerDialog)));
      viewDate(pickerDialog, !(viewDate(pickerDialog)));
    });
  }

  _addCellClickEvent(el) {
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
  }

  _addSelectedCell() {}

  /**
   * [viewDate it stores the current state of the date dialog]
   * @param  {[Boolean]} mode = '' [description]
   * @return {[type]}           [description]
   */

  _viewDate(pickerDialog, mode) {
    var el;
    if (mode == null) {
      mode = '';
    }
    el = document.querySelector(pickerDialog.trim());
    if (mode !== '') {
      return el.setAttribute('data-date', mode);
    } else {
      return el.getAttribute('data-date');
    }
  }

  _getPreviousMonthString(moment) {
    var m;
    m = moment.clone();
    return m.subtract(1, 'month');
  }

  _getNextMonthString(moment) {
    var m;
    m = moment.clone();
    return m.add(1, 'month');
  }
}
