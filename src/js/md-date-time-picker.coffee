###*
 * @package md-date-time-picker
 * @version [0.0.1]
 * @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
 * @license MIT
 * @website no website right now
###
# TODO write this in a module style
# TODO write another of this script for time picker

class window.mdDateTimePicker
  ###*
   * @private
  ###
  ###*
   * [dialog css classes]
   * @type {Object}
  ###
  @_dialog: {
    'date': {
      'picker': '.md-picker-date '
    },
    'time': ''
  }
  ###*
   * @public
   * [constructor of the module]
   * 					 @param  {[string]}   @type         [type of dialog] ['date','time']
   * @optional @param  {[string]}   @init    = '' [initial value for the dialog date or time, defaults to today]
   * @optional @param  {[string]}   @format  = '' [the format of the moment date e.g 'D MM YYYY' for init 1 1 2016, defaults to the 'YYYY-MM-DD' ISO date format]
   * @optional @param  {[string]}   @display = '' [the document element where the current date is displayed]
   * @optional @param  {[type]}     @args    = '' [additional arguments of the dialog]
   * @return {[mdDateTimePicker]}                 [this component]
  ###
  constructor: (@type, @init, @format = 'YYYY-MM-DD', @display = '', @args = '') ->
    ###*
     * [dialog selected classes has the same structure as dialog but one level down]
     * @type {Object}
     * e.g
     * sDialog = {
     *   picker: 'some-picker-selected'
     * }
    ###
    @_sDialog = {}
    if @ instanceof window.mdDateTimePicker
      if @type
        @_sDialog = selectDialog(@constructor._dialog, @type)
    else
      return new window.mdDateTimePicker(@type, @init, @format, @display, @args)
  toggle: ->
    if @type is 'date'
      initDateDialog(@_sDialog.date)
    else if @type is 'time'
      # TODO implement the time module
      console.log 'init time'
    showDialog(@_sDialog)
    return
  ###*
   * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
   * @param  {[moment]} m [date for today or current]
  ###
  selectDialog = (dialog, type) ->
    sDialog = {}
    sDialog.picker = document.querySelector(dialog[type].picker.trim())
    # init dialog values
    sDialog.view = false
    sDialog.date = if @init then moment(@init, @format) else moment()
    sDialog

  showDialog = (dialog) ->
    # get the dialog class
    dialog.picker.classList.remove('md-picker--inactive')
    dialog.picker.classList.add('zoomIn')
    return

  initDateDialog = (m) ->
    pickerDialog = '.md-picker-date '
    current = '.md-picker__view--current '
    previous = '.md-picker__view--previous '
    next = '.md-picker__view--next '
    document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = m.format('YYYY')
    document.querySelector(pickerDialog + '.md-picker__title').innerHTML = m.format('ddd, MMM D')
    # set everything for the current month
    initMonth(pickerDialog + current, m)
    # set everything for the previous month
    initMonth(pickerDialog + previous, moment(getPreviousMonthString(m)))
    # set everything for the next month
    initMonth(pickerDialog + next, moment(getNextMonthString(m)))
    # add event listeners
    switchToView(pickerDialog, document.querySelector(pickerDialog + '.md-picker__subtitle'))
    return

  # init month
  initMonth = (selector, m) ->
    # set month title
    document.querySelector(selector + '.md-picker__month').innerHTML = m.format('MMMM YYYY')
    cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span')
    # calculate prerequisites
    firstDayOfMonth = parseInt(moment(m).date(1).day(), 10)
    today = -1
    selected = -1
    lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1
    # if this month and year is the same as the today's month and year respectively
    if (not(moment().diff(m, 'month')) and not(moment().diff(m, 'year')))
      today = parseInt(moment().format('D'), 10)
      today += firstDayOfMonth - 1
      selected = parseInt(moment(m).format('D'), 10)
      selected += firstDayOfMonth - 1
    for cell, i in cells
      # if the cell is before this month's first date
      if (i < firstDayOfMonth)
        cell.classList.remove('md-picker__cell')
      # if today add the today class
      if (today is i)
        cell.classList.add('md-picker__today')
      # if the selected date is here
      if (selected is i)
        cell.classList.add('md-picker__selected')
      # if the cell is in this month
      if ((i >= firstDayOfMonth) and (i <= lastDayoFMonth))
        # add cell clickable class
        cell.classList.add('md-picker__cell')
        # add event for cell click
        addCellClickEvent(cell)
      # if the cell is after this month's last date
      if (i > lastDayoFMonth)
        cell.classList.remove('md-picker__cell')
    return

  # event handlers for various elements
  # switch the display view to the other view specified
  switchToView = (pickerDialog, el) ->
    el.addEventListener 'click', () ->
      # make the button unclickable
      el.classList.add('md-button--unclickable')
      # get current view
      current = document.querySelector(pickerDialog.trim())
      viewHolder = document.querySelector(pickerDialog + '.md-picker__viewHolder')
      yearView = document.querySelector(pickerDialog + '.md-picker__years')
      header = document.querySelector(pickerDialog + '.md-picker__header')
      # document
      if @sDialog.view
        viewHolder.classList.add('zoomOut',)
        yearView.classList.remove('md-picker__years--invisible')
        yearView.classList.add('zoomIn')
      else
        yearView.classList.add('zoomOut')
        viewHolder.classList.remove('zoomOut')
        viewHolder.classList.add('zoomIn')
        setTimeout ( ->
          yearView.classList.remove('zoomIn','zoomOut')
          yearView.classList.add('md-picker__years--invisible')
          viewHolder.classList.remove('zoomIn')
          return
        ), 1000
      # toggle class for header
      header.classList.toggle('md-picker__header--invert')
      # toggle attribute
      @sDialog.view = not @sDialog.view;
      setTimeout ( ->
        el.classList.remove('md-button--unclickable')
        return
      ), 1000
      return
    return

  # each cell block in the calendar
  addCellClickEvent = (el) ->
    pickerDialog = '.md-picker-date '
    el.addEventListener 'click', () ->
      # get the current date
      day = el.innerHTML
      monthYear = document.querySelector(pickerDialog + '.md-picker__view--current .md-picker__month').innerHTML
      currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY')
      # remove previous selected style
      document.querySelector(pickerDialog + '.md-picker__selected').classList.remove('md-picker__selected')
      # add selected class to self
      el.classList.add('md-picker__selected')
      # change the current display date and data to the current date
      @sDialog.date = currentDate
      document.querySelector(pickerDialog + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY')
      document.querySelector(pickerDialog + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D')
      return
    return

  # helper functions for ui
  addSelectedCell = (el) ->

    return

  # helper functions for general calculations
  getPreviousMonthString = (moment) ->
    m = moment.clone()
    m.subtract(1,'month')

  getNextMonthString = (moment) ->
    m = moment.clone()
    m.add(1,'month')
