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
  constructor(type, init = '', format = 'YYYY-MM-DD', display = '', args = '') {
    this.type = type
    this.init = init
    this.format = format
    this.display = display
    this.args = args

    if (this.type) {
      /**
       * [dialog selected classes has the same structure as dialog but one level down]
       * @type {Object}
       * e.g
       * sDialog = {
       *   picker: 'some-picker-selected'
       * }
       */
      this._sDialog = {}
      this._dialog = this.constructor._dialog()
    }
  }

  /**
   * [toggle toggle the dialog's between the visible and invisible state]
   *
   * @method toggle
   *
   * @return {[type]} [description]
   */
  toggle() {
    var me = this
    this._selectDialog()
      // work according to the current state of the dialog
    if (this._dialog.state) {
      me._hideDialog()
    } else {
      if (this.type === 'date') {
        this._initDateDialog(this._sDialog.date)
      } else if (this.type === 'time') {
        // this._initTimeDialog(this._sDialog.date)
      }
      me._showDialog()
    }
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
        current: '.md-picker__view--current ',
        previous: '.md-picker__view--previous ',
        next: '.md-picker__view--next ',
        view: true
      },
      time: {},
      common: {
        state: false,
        cancel: '.md-button--cancel',
        ok: '.md-button--ok'
      }
    }
  }

  /**
   * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
   * @param  {[moment]} m [date for today or current]
   */
  _selectDialog() {
    // clone elements and add them again to clear events attached to them
    let picker = document.getElementById('md-picker__' + [this.type])
    let pickerClone = picker.cloneNode(true)
    picker.parentNode.replaceChild(pickerClone, picker)
    // now do what you normally would do
    this._sDialog.picker = document.getElementById('md-picker__' + [this.type])
    this._sDialog.cancel = document.getElementById('md-' + [this.type] + '__cancel')
    this._sDialog.ok = document.getElementById('md-' + [this.type] + '__ok')

    if (!this._sDialog.date) {
      if (this.init) {
        this._sDialog.date = moment(this.init, this.format)
      } else {
        this._sDialog.date = moment()
      }
    }
    this._sDialog.tDate = this._sDialog.date
  }

  /**
   * [_showDialog make the dialog visible with animation]
   *
   * @method _showDialog
   *
   * @return {[type]}    [description]
   */
  _showDialog() {
    this._dialog.state = true
    this._sDialog.picker.classList.remove('md-picker--inactive')
    this._sDialog.picker.classList.add('zoomIn')
  }

  /**
   * [_hideDialog make the dialog invisible with animation]
   *
   * @method _hideDialog
   *
   * @return {[type]}    [description]
   */
  _hideDialog() {
    let me = this
    this._dialog.state = false
    this._sDialog.picker.classList.add('zoomOut')
    setTimeout(function() {
      me._sDialog.picker.classList.remove('zoomOut', 'zoomIn')
      me._sDialog.picker.classList.add('md-picker--inactive')
    }, 300)
  }

  /**
   * [initDateDialog description]
   * @param  {[type]} m [description]
   * @return {[type]}   [description]
   */

  _initDateDialog(m) {
    let picker = this._dialog.date.picker
    let current = this._dialog.date.current
    let previous = this._dialog.date.previous
    let next = this._dialog.date.next
    document.querySelector(picker + '.md-picker__subtitle').innerHTML = m.format('YYYY')
    document.querySelector(picker + '.md-picker__title').innerHTML = m.format('ddd, MMM D')
    this._initMonth(picker + current, m)
    this._initMonth(picker + previous, moment(this._getPreviousMonthString(m)))
    this._initMonth(picker + next, moment(this._getNextMonthString(m)))
    this._attachEventHandlers()
    this._switchToDateView(picker, document.querySelector(picker + '.md-picker__subtitle'))
  }

  /**
   * [initMonth description]
   * @param  {[type]} selector [description]
   * @param  {[type]} m        [description]
   * @return {[type]}          [description]
   */

  _initMonth(selector, m) {
    let displayMonth = m.format('MMMM YYYY')
    document.querySelector(selector + '.md-picker__month').innerHTML = displayMonth
    let todayClass = document.querySelector(selector + '.md-picker__today')
    let selectedClass = document.querySelector(selector + '.md-picker__selected')
    let cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span')
    let firstDayOfMonth = parseInt(moment(m).date(1).day(), 10)
    let today = -1
    let selected = -1
    let lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1
    if (todayClass) {
      todayClass.classList.remove('md-picker__today')
    }
    if (selectedClass) {
      selectedClass.classList.remove('md-picker__selected')
    }
    if (moment().format('MMMM YYYY') === displayMonth) {
      today = parseInt(moment().format('D'), 10)
      today += firstDayOfMonth - 1
    }
    if (selector.indexOf(this._dialog.date.current.trim()) >= 0) {
      selected = parseInt(moment(m).format('D'), 10)
      selected += firstDayOfMonth - 1
    }
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i]
      let currentDay = i - firstDayOfMonth + 1
      if (i < firstDayOfMonth) {
        cell.classList.remove('md-picker__cell')
        cell.innerHTML = ''
      }
      if (today === i) {
        cell.classList.add('md-picker__today')
      }
      if (selected === i) {
        cell.classList.add('md-picker__selected')
      }
      if ((i >= firstDayOfMonth) && (i <= lastDayoFMonth)) {
        cell.classList.add('md-picker__cell')
        cell.innerHTML = currentDay
        this._addCellClickEvent(cell)
      }
      if (i > lastDayoFMonth) {
        cell.classList.remove('md-picker__cell')
        cell.innerHTML = ''
      }
    }
  }
  _switchToDateView(picker, el) {
    var me = this
    // attach the view change button
    el.addEventListener('click', function() {
      el.classList.add('md-button--unclickable')
      let current = document.querySelector(picker.trim())
      let viewHolder = document.querySelector(picker + '.md-picker__viewHolder')
      let yearView = document.querySelector(picker + '.md-picker__years')
      let header = document.querySelector(picker + '.md-picker__header')
      if (me._dialog.date.view) {
        viewHolder.classList.add('zoomOut')
        yearView.classList.remove('md-picker__years--invisible')
        yearView.classList.add('zoomIn')
      } else {
        yearView.classList.add('zoomOut')
        viewHolder.classList.remove('zoomOut')
        viewHolder.classList.add('zoomIn')
        setTimeout((function() {
          yearView.classList.remove('zoomIn', 'zoomOut')
          yearView.classList.add('md-picker__years--invisible')
          viewHolder.classList.remove('zoomIn')
        }), 300)
      }
      header.classList.toggle('md-picker__header--invert')
      me._dialog.date.view = !me._dialog.date.view
      setTimeout((function() {
        el.classList.remove('md-button--unclickable')
      }), 300)
    })
  }

  _addCellClickEvent(el) {
    let me = this
    el.addEventListener('click', function() {
      let picker = '.md-picker-date '
      let day = el.innerHTML
      let monthYear = document.querySelector(picker + '.md-picker__view--current .md-picker__month').innerHTML
      let currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY')
      let selected = document.querySelector(picker + '.md-picker__selected')
      if (selected) {
        selected.classList.remove('md-picker__selected')
      }
      el.classList.add('md-picker__selected')

      // update temp date object with the date selected
      me._sDialog.tDate = currentDate

      document.querySelector(picker + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY')
      document.querySelector(picker + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D')
    })
  }

  /**
   * [_attachEventHandlers attach event handlers for actions to the date or time picker dialog]
   *
   * @method _attachEventHandlers
   *
   */
  _attachEventHandlers() {
    let me = this
    let cancel = this._sDialog.cancel
    let ok = this._sDialog.ok
    cancel.addEventListener('click', function() {
      me.toggle()
    })
    ok.addEventListener('click', function() {
      me._sDialog.date = me._sDialog.tDate
      me.toggle()
    })
  }

  /**
   * [_getPreviousMonthString get the previous month in a moment format]
   *
   * @method _getPreviousMonthString
   *
   * @param  {[type]}                moment [description]
   *
   * @return {[type]}                [description]
   */
  _getPreviousMonthString(moment) {
    let m
    m = moment.clone()
    return m.subtract(1, 'month')
  }

  /**
   * [_getNextMonthString get the next month in a moment format]
   *
   * @method _getNextMonthString
   *
   * @param  {[type]}            moment [description]
   *
   * @return {[type]}            [description]
   */
  _getNextMonthString(moment) {
    let m
    m = moment.clone()
    return m.add(1, 'month')
  }
}
