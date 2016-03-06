'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var mdDateTimePicker = function () {
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

  function mdDateTimePicker(type) {
    var init = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var format = arguments.length <= 2 || arguments[2] === undefined ? 'YYYY-MM-DD' : arguments[2];
    var display = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
    var args = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];

    _classCallCheck(this, mdDateTimePicker);

    this.type = type;
    this.init = init;
    this.format = format;
    this.display = display;
    this.args = args;

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

  _createClass(mdDateTimePicker, [{
    key: 'toggle',
    value: function toggle() {
      this._selectDialog();
      if (this.type === 'date') {
        this._initDateDialog(this._sDialog.date);
      } else if (this.type === 'time') {
        // this._initTimeDialog(this._sDialog.date)
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

  }, {
    key: '_selectDialog',


    /**
     * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
     * @param  {[moment]} m [date for today or current]
     */
    value: function _selectDialog() {
      this._sDialog.picker = document.querySelector(this._dialog[this.type].picker.trim());
      if (this.init) {
        this._sDialog.date = moment(this.init, this.format);
      } else {
        this._sDialog.date = moment();
      }
    }
  }, {
    key: '_showDialog',
    value: function _showDialog() {
      this._sDialog.picker.classList.remove('md-picker--inactive');
      this._sDialog.picker.classList.add('zoomIn');
    }

    /**
     * [initDateDialog description]
     * @param  {[type]} m [description]
     * @return {[type]}   [description]
     */

  }, {
    key: '_initDateDialog',
    value: function _initDateDialog(m) {
      var picker = this._dialog.date.picker;
      var current = this._dialog.date.current;
      var previous = this._dialog.date.previous;
      var next = this._dialog.date.next;
      document.querySelector(picker + '.md-picker__subtitle').innerHTML = m.format('YYYY');
      document.querySelector(picker + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
      this._initMonth(picker + current, m);
      this._initMonth(picker + previous, moment(this._getPreviousMonthString(m)));
      this._initMonth(picker + next, moment(this._getNextMonthString(m)));
      this._viewDate(picker, false);
      this._switchToDateView(picker, document.querySelector(picker + '.md-picker__subtitle'));
    }

    /**
     * [initMonth description]
     * @param  {[type]} selector [description]
     * @param  {[type]} m        [description]
     * @return {[type]}          [description]
     */

  }, {
    key: '_initMonth',
    value: function _initMonth(selector, m) {
      var displayMonth = m.format('MMMM YYYY');
      document.querySelector(selector + '.md-picker__month').innerHTML = displayMonth;
      var todayClass = document.querySelector(selector + '.md-picker__today');
      var selectedClass = document.querySelector(selector + '.md-picker__selected');
      var cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span');
      var firstDayOfMonth = parseInt(moment(m).date(1).day(), 10);
      var today = -1;
      var selected = -1;
      var lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1;
      if (todayClass) {
        todayClass.classList.remove('md-picker__today');
      }
      if (selectedClass) {
        selectedClass.classList.remove('md-picker__selected');
      }
      if (moment().format('MMMM YYYY') === displayMonth) {
        today = parseInt(moment().format('D'), 10);
        today += firstDayOfMonth - 1;
      }
      if (selector.indexOf(this._dialog.date.current.trim()) >= 0) {
        selected = parseInt(moment(m).format('D'), 10);
        selected += firstDayOfMonth - 1;
      }
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var currentDay = i - firstDayOfMonth + 1;
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
        if (i >= firstDayOfMonth && i <= lastDayoFMonth) {
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
  }, {
    key: '_switchToDateView',
    value: function _switchToDateView(picker, el) {
      el.addEventListener('click', function () {
        el.classList.add('md-button--unclickable');
        var current = document.querySelector(picker.trim());
        var viewHolder = document.querySelector(picker + '.md-picker__viewHolder');
        var yearView = document.querySelector(picker + '.md-picker__years');
        var header = document.querySelector(picker + '.md-picker__header');
        if (viewDate(picker)) {
          viewHolder.classList.add('zoomOut');
          yearView.classList.remove('md-picker__years--invisible');
          yearView.classList.add('zoomIn');
        } else {
          yearView.classList.add('zoomOut');
          viewHolder.classList.remove('zoomOut');
          viewHolder.classList.add('zoomIn');
          setTimeout(function () {
            yearView.classList.remove('zoomIn', 'zoomOut');
            yearView.classList.add('md-picker__years--invisible');
            viewHolder.classList.remove('zoomIn');
          }, 1000);
        }
        header.classList.toggle('md-picker__header--invert');
        setTimeout(function () {
          el.classList.remove('md-button--unclickable');
        }, 1000);
        viewDate(picker, !viewDate(picker));
      });
    }
  }, {
    key: '_addCellClickEvent',
    value: function _addCellClickEvent(el) {
      el.addEventListener('click', function () {
        var picker = '.md-picker-date ';
        var day = el.innerHTML;
        var monthYear = document.querySelector(picker + '.md-picker__view--current .md-picker__month').innerHTML;
        var currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY');
        var selected = document.querySelector(picker + '.md-picker__selected');
        if (selected) {
          selected.classList.remove('md-picker__selected');
        }
        el.classList.add('md-picker__selected');
        // REVIEW the code below to the correct way to set date
        // this.sDialog.date = currentDate
        document.querySelector(picker + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
        document.querySelector(picker + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
      });
    }
  }, {
    key: '_addSelectedCell',
    value: function _addSelectedCell() {}

    /**
     * [viewDate it stores the current state of the date dialog]
     * @param  {[Boolean]} mode = '' [description]
     * @return {[type]}           [description]
     */

  }, {
    key: '_viewDate',
    value: function _viewDate(picker, mode) {
      var el;
      if (mode == null) {
        mode = '';
      }
      el = document.querySelector(picker.trim());
      if (mode !== '') {
        return el.setAttribute('data-date', mode);
      } else {
        return el.getAttribute('data-date');
      }
    }
  }, {
    key: '_getPreviousMonthString',
    value: function _getPreviousMonthString(moment) {
      var m;
      m = moment.clone();
      return m.subtract(1, 'month');
    }
  }, {
    key: '_getNextMonthString',
    value: function _getNextMonthString(moment) {
      var m;
      m = moment.clone();
      return m.add(1, 'month');
    }
  }], [{
    key: '_dialog',
    value: function _dialog() {
      return {
        date: {
          picker: '.md-picker-date ',
          current: '.md-picker__view--current ',
          previous: '.md-picker__view--previous ',
          next: '.md-picker__view--next '
        },
        time: {}
      };
    }
  }]);

  return mdDateTimePicker;
}();