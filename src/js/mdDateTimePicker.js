/**
* @package md-date-time-picker
* @version [2.2.0]
* @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
* @license MIT
* @website https://puranjayjain.github.io/md-date-time-picker
*/

/**
* import necessary components
*/
import moment from 'moment'
import Draggabilly from 'Draggabilly'

class mdDateTimePicker {
	/**
	* [constructor of the mdDateTimePicker]
	*
	* @method constructor
	*
	* @param  {String}   type = 'date' or 'time 				[type of dialog]
	* @param  {moment}   init 						[initial value for the dialog date or time, defaults to today] [@default = today]
	* @param  {moment}   past 						[the past moment till which the calendar shall render] [@default = exactly 21 Years ago from init]
	* @param  {moment}   future	 					[the future moment till which the calendar shall render] [@default = init]
	* @param  {Boolean}  mode 						[this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default = false]
	* @param  {String}   orientation = 'LANDSCAPE' or 'PORTRAIT'		[force the orientation of the picker @default = 'LANDSCAPE']
	* @param  {element}  trigger						[element on which all the events will be dispatched e.g var foo = document.getElementById('bar'), here element = foo]
	* @param  {String}  ok = 'ok'						[ok button's text]
	* @param  {String}  cancel = 'cancel'					[cancel button's text]
	* @param  {Boolean} colon = true					[add an option to enable quote in 24 hour mode]
	* @param  {Boolean} autoClose = false					[close dialog on date/time selection]
	* @param  {Boolean} inner24 = false					[if 24-hour mode and (true), the PM hours shows in an inner dial]
	* @param  {String} prevHandle = <div class="mddtp-prev-handle"></div>	[The HTML content of the handle to go to previous month]
	* @param  {String} nextHandle = <div class="mddtp-next-handle"></div>	[The HTML content of the handle to go to next month]
	*
	* @return {Object}							[mdDateTimePicker]
	*/
	constructor({
		type,
		init = moment(),
		past = moment().subtract(21, 'years'),
		future = init,
		mode = false,
		orientation = 'LANDSCAPE',
		trigger = '',
		ok = 'ok',
		cancel = 'cancel',
		colon = true,
		autoClose = false,
		inner24 = false,
		prevHandle = '<div class="mddtp-prev-handle"></div>',
		nextHandle = '<div class="mddtp-next-handle"></div>',
	}) {
		this._type = type
		this._init = init
		this._past = past
		this._future = future
		this._mode = mode
		this._orientation = orientation
		this._trigger = trigger
		this._ok = ok
		this._cancel = cancel
		this._colon = colon
		this._autoClose = autoClose
		this._inner24 = inner24
		this._prevHandle = prevHandle
		this._nextHandle = nextHandle

		/**
		* [dialog selected classes have the same structure as dialog but one level down]
		* @type {Object}
		* All declarations starting with _ are considered @private
		* e.g
		* sDialog = {
		*   picker: 'some-picker-selected'
		* }
		*/
		this._sDialog = {}
		// attach the dialog if not present
		if (!document.getElementById('mddtp-picker__' + this._type)) {
			this._buildDialog()
		}
	}

	/**
	* [time to get or set the current picker's moment]
	*
	* @method time
	*
	* @param  {moment} m
	*
	*/
	get time() {
		return this._init
	}

	set time(m) {
		if (m) {
			this._init = m
		}
	}

	/**
	* [trigger sets a new trigger for the dialog]
	*
	* @method trigger
	*
	* @param  {type} el [element e.g var foo = document.getElementById('bar'), here el = foo]
	*
	*/
	get trigger() {
		return this._trigger
	}

	set trigger(el) {
		if (el) {
			this._trigger = el
		}
	}

	/**
	* [hide hide the dialog]
	*
	* @method hide
	*
	*/
	hide() {
		this._selectDialog()
		this._hideDialog()
	}

	/**
	* [show show the dialog]
	*
	* @method show
	*
	*/
	show() {
		this._selectDialog()
		if (this._type === 'date') {
			this._initDateDialog(this._init)
		} else if (this._type === 'time') {
			this._initTimeDialog(this._init)
		}
		this._showDialog()
	}

	/**
	* [toggle toggle the dialog's between the visible and invisible state]
	*
	* @method toggle
	*
	*/
	toggle() {
		this._selectDialog()
		// work according to the current state of the dialog
		if (mdDateTimePicker.dialog.state) {
			this.hide()
		} else {
			this.show()
		}
	}

	/**
	* [dialog getter and setter for _dialog value]
	*
	* @method dialog
	*
	* @return {_dialog} [static or prototype value for the _dialog of the component]
	*/
	static get dialog() {
		return mdDateTimePicker._dialog
	}

	static set dialog(value) {
		mdDateTimePicker.dialog = value
	}

	_selectDialog() {
		// now do what you normally would do
		this._sDialog.picker = document.getElementById('mddtp-picker__' + [this._type])
		/**
		* [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
		*
		* @type {Array}
		*/
		let sDialogEls = [
			'viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth', 'AM', 'PM', 'needle', 'hourView', 'minuteView', 'hour', 'minute', 'fakeNeedle', 'circularHolder', 'circle', 'dotSpan'
		]
		let i = sDialogEls.length
		while (i--) {
			this._sDialog[sDialogEls[i]] = document.getElementById('mddtp-' + this._type + '__' + sDialogEls[i])
		}

		this._sDialog.tDate = this._init.clone()
		this._sDialog.sDate = this._init.clone()
	}

	/**
	* [_showDialog make the dialog visible with animation]
	*
	* @method _showDialog
	*
	*/
	_showDialog() {
		let me = this
		let zoomIn = 'zoomIn'
		mdDateTimePicker.dialog.state = true
		this._sDialog.picker.classList.remove('mddtp-picker--inactive')
		this._sDialog.picker.classList.add(zoomIn)
		// if the dialog is forced into portrait mode
		if (this._orientation === 'PORTRAIT') {
			this._sDialog.picker.classList.add('mddtp-picker--portrait')
		}
		setTimeout(function () {
			me._sDialog.picker.classList.remove(zoomIn)
		}, 300)
	}

	/**
	* [_hideDialog make the dialog invisible with animation]
	*
	* @method _hideDialog
	*
	*/
	_hideDialog() {
		let me = this
		let years = this._sDialog.years
		let title = me._sDialog.title
		let subtitle = me._sDialog.subtitle
		let viewHolder = this._sDialog.viewHolder
		let AM = this._sDialog.AM
		let PM = this._sDialog.PM
		let minute = this._sDialog.minute
		let hour = this._sDialog.hour
		let minuteView = this._sDialog.minuteView
		let hourView = this._sDialog.hourView
		let picker = this._sDialog.picker
		let needle = this._sDialog.needle
		let dotSpan = this._sDialog.dotSpan
		let active = 'mddtp-picker__color--active'
		let inactive = 'mddtp-picker--inactive'
		let invisible = 'mddtp-picker__years--invisible'
		let zoomIn = 'zoomIn'
		let zoomOut = 'zoomOut'
		let hidden = 'mddtp-picker__circularView--hidden'
		let selection = 'mddtp-picker__selection'
		mdDateTimePicker.dialog.state = false
		mdDateTimePicker.dialog.view = true
		this._sDialog.picker.classList.add(zoomOut)
		// reset classes
		if (this._type === 'date') {
			years.classList.remove(zoomIn, zoomOut)
			years.classList.add(invisible)
			title.classList.remove(active)
			subtitle.classList.add(active)
			viewHolder.classList.remove(zoomOut)
		}
		else {
			AM.classList.remove(active)
			PM.classList.remove(active)
			minute.classList.remove(active)
			hour.classList.add(active)
			minuteView.classList.add(hidden)
			hourView.classList.remove(hidden)
			subtitle.setAttribute('style', 'display: none')
			dotSpan.setAttribute('style', 'display: none')
			needle.className = selection
		}
		setTimeout(function () {
			// remove portrait mode
			me._sDialog.picker.classList.remove('mddtp-picker--portrait')
			me._sDialog.picker.classList.remove(zoomOut)
			me._sDialog.picker.classList.add(inactive)
			// clone elements and add them again to clear events attached to them
			let pickerClone = picker.cloneNode(true)
			picker.parentNode.replaceChild(pickerClone, picker)
		}, 300)
	}

	/**
	* [_buildDialog make the dialog elements and add them to the document]
	*
	* @method _buildDateDialog
	*
	*/
	_buildDialog() {
		let type = this._type
		let docfrag = document.createDocumentFragment()
		// outer most container of the picker
		let container = document.createElement('div')
		// header container of the picker
		let header = document.createElement('div')
		// body container of the picker
		let body = document.createElement('div')
		// action elements container
		let action = document.createElement('div')
		let cancel = document.createElement('button')
		let ok = document.createElement('button')
		// ... add properties to them
		container.id = 'mddtp-picker__' + type
		container.classList.add('mddtp-picker')
		container.classList.add('mddtp-picker-' + type)
		container.classList.add('mddtp-picker--inactive')
		container.classList.add('animated')
		this._addId(header, 'header')
		this._addClass(header, 'header')
		// add header to container
		container.appendChild(header)
		this._addClass(body, 'body')
		body.appendChild(action)
		// add body to container
		container.appendChild(body)
		// add stuff to header and body according to dialog type
		if (this._type === 'date') {
			let subtitle = document.createElement('div')
			let title = document.createElement('div')
			let titleDay = document.createElement('div')
			let titleMonth = document.createElement('div')
			let viewHolder = document.createElement('div')
			let views = document.createElement('ul')
			let previous = document.createElement('li')
			let current = document.createElement('li')
			let next = document.createElement('li')
			let left = document.createElement('button')
			let right = document.createElement('button')
			let years = document.createElement('ul')
			// inside header
			// adding properties to them
			this._addId(subtitle, 'subtitle')
			this._addClass(subtitle, 'subtitle')
			this._addId(title, 'title')
			this._addClass(title, 'title', ['mddtp-picker__color--active'])
			this._addId(titleDay, 'titleDay')
			this._addId(titleMonth, 'titleMonth')
			// add title stuff to it
			title.appendChild(titleDay)
			title.appendChild(titleMonth)
			// add them to header
			header.appendChild(subtitle)
			header.appendChild(title)
			// inside body
			// inside viewHolder
			this._addId(viewHolder, 'viewHolder')
			this._addClass(viewHolder, 'viewHolder', ['animated'])
			this._addClass(views, 'views')
			this._addId(previous, 'previous')
			previous.classList.add('mddtp-picker__view')
			this._addId(current, 'current')
			current.classList.add('mddtp-picker__view')
			this._addId(next, 'next')
			next.classList.add('mddtp-picker__view')
			// fill the views
			this._addView(previous)
			this._addView(current)
			this._addView(next)
			// add them
			viewHolder.appendChild(views)
			views.appendChild(previous)
			views.appendChild(current)
			views.appendChild(next)
			// inside body again
			this._addId(left, 'left')
			left.classList.add('mddtp-button')
			this._addClass(left, 'left')
			left.setAttribute('type', 'button')
			left.innerHTML = this._prevHandle;

			this._addId(right, 'right')
			right.classList.add('mddtp-button')
			this._addClass(right, 'right')
			right.setAttribute('type', 'button')
			right.innerHTML = this._nextHandle;

			this._addId(years, 'years')
			this._addClass(years, 'years', ['mddtp-picker__years--invisible', 'animated'])
			// add them to body
			body.appendChild(viewHolder)
			body.appendChild(left)
			body.appendChild(right)
			body.appendChild(years)
		}
		else {
			let title = document.createElement('div')
			let hour = document.createElement('span')
			let span = document.createElement('span')
			let minute = document.createElement('span')
			let subtitle = document.createElement('div')
			let AM = document.createElement('div')
			let PM = document.createElement('div')
			let circularHolder = document.createElement('div')
			let needle = document.createElement('div')
			let dot = document.createElement('span')
			let line = document.createElement('span')
			let circle = document.createElement('span')
			let minuteView = document.createElement('div')
			let fakeNeedle = document.createElement('div')
			let hourView = document.createElement('div')
			// add properties to them
			// inside header
			this._addId(title, 'title')
			this._addClass(title, 'title')
			this._addId(hour, 'hour')
			hour.classList.add('mddtp-picker__color--active')
			span.textContent = ':'
			this._addId(span, 'dotSpan')
			span.setAttribute('style', 'display: none')
			this._addId(minute, 'minute')
			this._addId(subtitle, 'subtitle')
			this._addClass(subtitle, 'subtitle')
			subtitle.setAttribute('style', 'display: none')
			this._addId(AM, 'AM')
			//AM.textContent = 'AM'
			// Change to 'AM' to Locale Meridiem
			AM.textContent = moment().localeData().meridiem(1, 1, true);
			this._addId(PM, 'PM')
			//PM.textContent = 'PM'
			// Change to 'PM' to Locale Meridiem
			PM.textContent = moment().localeData().meridiem(13, 1, true);
			// add them to title and subtitle
			title.appendChild(hour)
			title.appendChild(span)
			title.appendChild(minute)
			subtitle.appendChild(AM)
			subtitle.appendChild(PM)
			// add them to header
			header.appendChild(title)
			header.appendChild(subtitle)
			// inside body
			this._addId(circularHolder, 'circularHolder')
			this._addClass(circularHolder, 'circularHolder')
			this._addId(needle, 'needle')
			needle.classList.add('mddtp-picker__selection')
			this._addClass(dot, 'dot')
			this._addClass(line, 'line')
			this._addId(circle, 'circle')
			this._addClass(circle, 'circle')
			this._addId(minuteView, 'minuteView')
			minuteView.classList.add('mddtp-picker__circularView')
			minuteView.classList.add('mddtp-picker__circularView--hidden')
			this._addId(fakeNeedle, 'fakeNeedle')
			fakeNeedle.classList.add('mddtp-picker__circle--fake')
			this._addId(hourView, 'hourView')
			hourView.classList.add('mddtp-picker__circularView')
			// add them to needle
			needle.appendChild(dot)
			needle.appendChild(line)
			needle.appendChild(circle)
			// add them to circularHolder
			circularHolder.appendChild(needle)
			circularHolder.appendChild(minuteView)
			circularHolder.appendChild(fakeNeedle)
			circularHolder.appendChild(hourView)
			// add them to body
			body.appendChild(circularHolder)
		}
		action.classList.add('mddtp-picker__action')

		if (this._autoClose === true) {
			action.style.display = "none"
		}

		this._addId(cancel, 'cancel')
		cancel.classList.add('mddtp-button')
		cancel.setAttribute('type', 'button')
		this._addId(ok, 'ok')
		ok.classList.add('mddtp-button')
		ok.setAttribute('type', 'button')
		// add actions
		action.appendChild(cancel)
		action.appendChild(ok)
		// add actions to body
		body.appendChild(action)
		docfrag.appendChild(container)
		// add the container to the end of body
		document.getElementsByTagName('body').item(0).appendChild(docfrag)
	}

	/**
	* [_initTimeDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
	* @param  {moment} m [date for today or current]
	*/
	_initTimeDialog(m) {
		let hour = this._sDialog.hour
		let minute = this._sDialog.minute
		let subtitle = this._sDialog.subtitle
		let dotSpan = this._sDialog.dotSpan
		// switch according to 12 hour or 24 hour mode
		if (this._mode) {
			// CHANGED exception case for 24 => 0 issue #57
			let text = parseInt(m.format('H'), 10)
			if (text === 0) {
				text = '00'
			}
			this._fillText(hour, text)
			// add the configurable colon in this mode issue #56
			if (this._colon) {
				dotSpan.removeAttribute('style')
			}
		}
		else {
			this._fillText(hour, m.format('h'))
			//this._sDialog[m.format('A')].classList.add('mddtp-picker__color--active')
			// Using isPM function for Find PM
			if (m._locale.isPM(m.format('A'))){
				this._sDialog['PM'].classList.add('mddtp-picker__color--active')
			}else{
				this._sDialog['AM'].classList.add('mddtp-picker__color--active')
			}
			subtitle.removeAttribute('style')
			dotSpan.removeAttribute('style')
		}
		this._fillText(minute, m.format('mm'))
		this._initHour()
		this._initMinute()
		this._attachEventHandlers()
		this._changeM()
		this._dragDial()
		this._switchToView(hour)
		this._switchToView(minute)
		this._addClockEvent()
		this._setButtonText()
	}

	_initHour() {
		let hourView = this._sDialog.hourView
		let needle = this._sDialog.needle
		let hour = 'mddtp-hour__selected'
		let selected = 'mddtp-picker__cell--selected'
		let rotate = 'mddtp-picker__cell--rotate-'
		let rotate24 = 'mddtp-picker__cell--rotate24'
		let cell = 'mddtp-picker__cell'
		let docfrag = document.createDocumentFragment()
		let hourNow
		if (this._mode) {
			let degreeStep = (this._inner24 === true) ? 10 : 5
			hourNow = parseInt(this._sDialog.tDate.format('H'), 10)
			for (let i = 1,j = degreeStep; i <= 24; i++, j += degreeStep) {
				let div = document.createElement('div')
				let span = document.createElement('span')
				div.classList.add(cell)
				// CHANGED exception case for 24 => 0 issue #57
				if (i === 24) {
					span.textContent = '00'
				}
				else {
					span.textContent = i
				}

				let position = j
				if (this._inner24 === true && i > 12) {
					position -= 120
					div.classList.add(rotate24)
				}

				div.classList.add(rotate + position)
				if (hourNow === i) {
					div.id = hour
					div.classList.add(selected)
					needle.classList.add(rotate + position)
				}
				// CHANGED exception case for 24 => 0 issue #58
				if (i === 24 && hourNow === 0) {
					div.id = hour
					div.classList.add(selected)
					needle.classList.add(rotate + position)
				}
				div.appendChild(span)
				docfrag.appendChild(div)
			}
		}
		else {
			hourNow = parseInt(this._sDialog.tDate.format('h'), 10)
			for (let i = 1,j = 10; i <= 12; i++, j += 10) {
				let div = document.createElement('div')
				let span = document.createElement('span')
				div.classList.add(cell)
				span.textContent = i
				div.classList.add(rotate + j)
				if (hourNow === i) {
					div.id = hour
					div.classList.add(selected)
					needle.classList.add(rotate + j)
				}
				div.appendChild(span)
				docfrag.appendChild(div)
			}
		}
		//empty the hours
		while (hourView.lastChild) {
			hourView.removeChild(hourView.lastChild)
		}
		// set inner html accordingly
		hourView.appendChild(docfrag)
	}

	_initMinute() {
		let minuteView = this._sDialog.minuteView
		let minuteNow = parseInt(this._sDialog.tDate.format('m'), 10)
		let sMinute = 'mddtp-minute__selected'
		let selected = 'mddtp-picker__cell--selected'
		let rotate = 'mddtp-picker__cell--rotate-'
		let cell = 'mddtp-picker__cell'
		let docfrag = document.createDocumentFragment()
		for (let i = 5,j = 10; i <= 60; i += 5, j += 10) {
			let div = document.createElement('div')
			let span = document.createElement('span')
			div.classList.add(cell)
			if (i === 60) {
				span.textContent = this._numWithZero(0)
			}
			else {
				span.textContent = this._numWithZero(i)
			}
			if (minuteNow === 0) {
				minuteNow = 60
			}
			div.classList.add(rotate + j)
			// (minuteNow === 1 && i === 60) for corner case highlight 00 at 01
			if ((minuteNow === i) || (minuteNow - 1 === i) || (minuteNow + 1 === i) || (minuteNow === 1 && i === 60)) {
				div.id = sMinute
				div.classList.add(selected)
			}
			div.appendChild(span)
			docfrag.appendChild(div)
		}
		//empty the hours
		while (minuteView.lastChild) {
			minuteView.removeChild(minuteView.lastChild)
		}
		// set inner html accordingly
		minuteView.appendChild(docfrag)
	}

	/**
	* [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
	* @param  {moment} m [date for today or current]
	*/
	_initDateDialog(m) {
		let subtitle = this._sDialog.subtitle
		let title = this._sDialog.title
		let titleDay = this._sDialog.titleDay
		let titleMonth = this._sDialog.titleMonth
		this._fillText(subtitle, m.format('YYYY'))
		this._fillText(titleDay, m.format('ddd, '))
		this._fillText(titleMonth, m.format('MMM D'))
		this._initYear()
		this._initViewHolder()
		this._attachEventHandlers()
		this._changeMonth()
		this._switchToView(subtitle)
		this._switchToView(title)
		this._setButtonText()
	}

	_initViewHolder() {
		let m = this._sDialog.tDate
		let current = this._sDialog.current
		let previous = this._sDialog.previous
		let next = this._sDialog.next
		let past = this._past
		let future = this._future
		if (m.isBefore(past, 'month')) {
			m = past.clone()
		}
		if (m.isAfter(future, 'month')) {
			m = future.clone()
		}
		this._sDialog.tDate = m
		this._initMonth(current, m)
		this._initMonth(next, moment(this._getMonth(m, 1)))
		this._initMonth(previous, moment(this._getMonth(m, -1)))
		this._toMoveMonth()
	}

	_initMonth(view, m) {
		let displayMonth = m.format('MMMM YYYY')
		// get the .mddtp-picker__month element using innerDivs[0]
		let innerDivs = view.getElementsByTagName('div')
		this._fillText(innerDivs[0], displayMonth)
		let docfrag = document.createDocumentFragment()
		// get the .mddtp-picker__tr element using innerDivs[3]
		let tr = innerDivs[3]
		let firstDayOfMonth = moment.weekdays( true ).indexOf ( moment.weekdays(false, moment(m).date(1).day() ) )
		/*
		* @netTrek - first day of month dependented from moment.locale
		*/
		let today = -1
		let selected = -1
		let lastDayOfMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1
		let past = firstDayOfMonth
		let cellClass = 'mddtp-picker__cell'
		let future = lastDayOfMonth
		if (moment().isSame(m, 'month')) {
			today = parseInt(moment().format('D'), 10)
			today += firstDayOfMonth - 1
		}
		if (this._past.isSame(m, 'month')) {
			past = parseInt(this._past.format('D'), 10)
			past += firstDayOfMonth - 1
		}
		if (this._future.isSame(m, 'month')) {
			future = parseInt(this._future.format('D'), 10)
			future += firstDayOfMonth - 1
		}
		if (this._sDialog.sDate.isSame(m, 'month')) {
			selected = parseInt(moment(m).format('D'), 10)
			selected += firstDayOfMonth - 1
		}
		for (let i = 0; i < 42; i++) {
			// create cell
			let cell = document.createElement('span')
			let currentDay = i - firstDayOfMonth + 1
			if ((i >= firstDayOfMonth) && (i <= lastDayOfMonth)) {
				if (i > future || i < past) {
					cell.classList.add(cellClass + '--disabled')
				} else {
					cell.classList.add(cellClass)
				}
				this._fillText(cell, currentDay)
			}
			if (today === i) {
				cell.classList.add(cellClass + '--today')
			}
			if (selected === i) {
				cell.classList.add(cellClass + '--selected')
				cell.id = 'mddtp-date__selected'
			}
			docfrag.appendChild(cell)
		}
		//empty the tr
		while (tr.lastChild) {
			tr.removeChild(tr.lastChild)
		}
		// set inner html accordingly
		tr.appendChild(docfrag)
		this._addCellClickEvent(tr)
	}

	/**
	* [_initYear Adds year elements]
	*
	* @method _initYear
	*
	* @return {type}  [description]
	*/
	_initYear() {
		let years = this._sDialog.years
		let currentYear = this._sDialog.tDate.year()
		let docfrag = document.createDocumentFragment()
		let past = this._past.year()
		let future = this._future.year()
		for (let year = past; year <= future; year++) {
			let li = document.createElement('li')
			li.textContent = year
			if (year === currentYear) {
				li.id = 'mddtp-date__currentYear'
				li.classList.add('mddtp-picker__li--current')
			}
			docfrag.appendChild(li)
		}
		//empty the years ul
		while (years.lastChild) {
			years.removeChild(years.lastChild)
		}
		// set inner html accordingly
		years.appendChild(docfrag)
		// attach event handler to the ul to get the benefit of event delegation
		this._changeYear(years)
	}

  /**
   * Points the needle to the correct hour or minute
   */
  _pointNeedle(me) {
    let spoke = 60
    let value
    let circle = this._sDialog.circle
		let fakeNeedle = this._sDialog.fakeNeedle
		let circularHolder = this._sDialog.circularHolder
    let selection = 'mddtp-picker__selection'
    let needle = me._sDialog.needle
    // move the needle to correct position
		needle.className = ''
		needle.classList.add(selection)
		if (!mdDateTimePicker.dialog.view) {
			value = me._sDialog.sDate.format('m')

			// Need to desactivate for the autoClose mode as it mess things up.  If you have an idea, feel free to give it a shot !
			if (me._autoClose !== true) {
				// move the fakeNeedle to correct position
				setTimeout(function () {
					let hOffset = circularHolder.getBoundingClientRect()
					let cOffset = circle.getBoundingClientRect()
					fakeNeedle.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px')
				}, 300)
			}
		}
		else {
			if (me._mode) {
				spoke = 24
				value = parseInt(me._sDialog.sDate.format('H'), 10)
				// CHANGED exception for 24 => 0 issue #58
				if (value === 0) {
					value = 24
				}
			}
			else {
				spoke = 12
				value = me._sDialog.sDate.format('h')
			}
		}
		let rotationClass = me._calcRotation(spoke,	parseInt(value, 10))
		if (rotationClass) {
			needle.classList.add(rotationClass)
		}
  }

	/**
	* [_switchToView Adds event handler for the feature: switch between date and year view in date dialog]
	*
	* @method _switchToView
	*
	* @param  {type} picker [description]
	*
	* @param  {type} el     [description]
	*
	*/
	_switchToView(el) {
		let me = this
		// attach the view change button
		if (this._type == 'date') {
			el.onclick = function () {
				me._switchToDateView(el, me)
			}
		}
		else {
			if (this._inner24 === true && me._mode) {
				if (parseInt(me._sDialog.sDate.format('H'), 10) > 12) {
					me._sDialog.needle.classList.add('mddtp-picker__cell--rotate24')
				} else {
					me._sDialog.needle.classList.remove('mddtp-picker__cell--rotate24')
				}
			}

			el.onclick = function () {
				me._switchToTimeView(me)
			}
		}
	}

	/**
	* [_switchToTimeView the actual switchToDateView function so that it can be called by other elements as well]
	*
	* @method _switchToTimeView
	*
	* @param  {type}          me [context]
	*
	*/
	_switchToTimeView(me) {
		let hourView = me._sDialog.hourView
		let minuteView = me._sDialog.minuteView
		let hour = me._sDialog.hour
		let minute = me._sDialog.minute
		let activeClass = 'mddtp-picker__color--active'
		let hidden = 'mddtp-picker__circularView--hidden'
		let selection = 'mddtp-picker__selection'
		// toggle view classes
		hourView.classList.toggle(hidden)
		minuteView.classList.toggle(hidden)
		hour.classList.toggle(activeClass)
		minute.classList.toggle(activeClass)
		// move the needle to correct position
		// toggle the view type
		mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view
    me._pointNeedle(me)
	}
	/**
	* [_switchToDateView the actual switchToDateView function so that it can be called by other elements as well]
	*
	* @method _switchToDateView
	*
	* @param  {type}	el [element to attach event to]
	* @param  {type}	me [context]
	*
	*/
	_switchToDateView(el, me) {
		el.setAttribute('disabled', '')
		let viewHolder = me._sDialog.viewHolder
		let years = me._sDialog.years
		let title = me._sDialog.title
		let subtitle = me._sDialog.subtitle
		let currentYear = document.getElementById('mddtp-date__currentYear')
		if (mdDateTimePicker.dialog.view) {
			viewHolder.classList.add('zoomOut')
			years.classList.remove('mddtp-picker__years--invisible')
			years.classList.add('zoomIn')
			// scroll into the view
			currentYear.scrollIntoViewIfNeeded && currentYear.scrollIntoViewIfNeeded()
		} else {
			years.classList.add('zoomOut')
			viewHolder.classList.remove('zoomOut')
			viewHolder.classList.add('zoomIn')
			setTimeout((function () {
				years.classList.remove('zoomIn', 'zoomOut')
				years.classList.add('mddtp-picker__years--invisible')
				viewHolder.classList.remove('zoomIn')
			}), 300)
		}
		title.classList.toggle('mddtp-picker__color--active')
		subtitle.classList.toggle('mddtp-picker__color--active')
		mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view
		setTimeout((function () {
			el.removeAttribute('disabled')
		}), 300)
	}

	_addClockEvent() {
		let me = this
		let hourView = this._sDialog.hourView
		let minuteView = this._sDialog.minuteView
		let sClass = 'mddtp-picker__cell--selected'
		hourView.onclick = function (e) {
			let sHour = 'mddtp-hour__selected'
			let selectedHour = document.getElementById(sHour)
			let setHour = 0
			if (e.target && e.target.nodeName == 'SPAN') {
				// clear the previously selected hour
				selectedHour.id = ''
				selectedHour.classList.remove(sClass)
				// select the new hour
				e.target.parentNode.classList.add(sClass)
				e.target.parentNode.id = sHour
				// set the sDate according to 24 or 12 hour mode
				if (me._mode) {
					setHour = parseInt(e.target.textContent, 10)
				}
				else {
					if (me._sDialog.sDate.format('A') === 'AM') {
						setHour = e.target.textContent
					}
					else {
						setHour = parseInt(e.target.textContent, 10) + 12
					}
				}
				me._sDialog.sDate.hour(setHour)
				// set the display hour
				me._sDialog.hour.textContent = e.target.textContent
				// switch the view
        me._pointNeedle(me)
        setTimeout(function() {
          me._switchToTimeView(me)
        }, 700);
			}
		}
		minuteView.onclick = function (e) {
			let sMinute = 'mddtp-minute__selected'
			let selectedMinute = document.getElementById(sMinute)
			let setMinute = 0
			if (e.target && e.target.nodeName == 'SPAN') {
				// clear the previously selected hour
				if (selectedMinute) {
					selectedMinute.id = ''
					selectedMinute.classList.remove(sClass)
				}
				// select the new minute
				e.target.parentNode.classList.add(sClass)
				e.target.parentNode.id = sMinute
				// set the sDate minute
				setMinute = e.target.textContent
				me._sDialog.sDate.minute(setMinute)
				// set the display minute
				me._sDialog.minute.textContent = setMinute
        me._pointNeedle(me)

				if (me._autoClose === true) {
					me._sDialog.ok.onclick()
				}
			}
		}
	}

	_addCellClickEvent(el) {
		let me = this
		el.onclick = function (e) {
			if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('mddtp-picker__cell')) {
				let day = e.target.textContent
				let currentDate = me._sDialog.tDate.date(day)
				let sId = 'mddtp-date__selected'
				let sClass = 'mddtp-picker__cell--selected'
				let selected = document.getElementById(sId)
				let subtitle = me._sDialog.subtitle
				let titleDay = me._sDialog.titleDay
				let titleMonth = me._sDialog.titleMonth
				if (selected) {
					selected.classList.remove(sClass)
					selected.id = ''
				}
				e.target.classList.add(sClass)
				e.target.id = sId

				// update temp date object with the date selected
				me._sDialog.sDate = currentDate.clone()

				me._fillText(subtitle, currentDate.year())
				me._fillText(titleDay, currentDate.format('ddd, '))
				me._fillText(titleMonth, currentDate.format('MMM D'))

				if (me._autoClose === true) {
					me._sDialog.ok.onclick()
				}
			}
		}
	}

	_toMoveMonth() {
		let m = this._sDialog.tDate
		let left = this._sDialog.left
		let right = this._sDialog.right
		let past = this._past
		let future = this._future
		left.removeAttribute('disabled')
		right.removeAttribute('disabled')
		left.classList.remove('mddtp-button--disabled')
		right.classList.remove('mddtp-button--disabled')
		if (m.isSame(past, 'month')) {
			left.setAttribute('disabled', '')
			left.classList.add('mddtp-button--disabled')
		}
		if (m.isSame(future, 'month')) {
			right.setAttribute('disabled', '')
			right.classList.add('mddtp-button--disabled')
		}
	}

	_changeMonth() {
		let me = this
		let left = this._sDialog.left
		let right = this._sDialog.right
		let mLeftClass = 'mddtp-picker__view--left'
		let mRightClass = 'mddtp-picker__view--right'
		let pause = 'mddtp-picker__view--pause'
		left.onclick = function () {
			moveStep(mRightClass, me._sDialog.previous)
		}

		right.onclick = function () {
			moveStep(mLeftClass, me._sDialog.next)
		}

		function moveStep(aClass, to) {
			/**
			* [stepBack to know if the to step is going back or not]
			*
			* @type {Boolean}
			*/
			let stepBack = false
			let next = me._sDialog.next
			let current = me._sDialog.current
			let previous = me._sDialog.previous
			left.setAttribute('disabled', '')
			right.setAttribute('disabled', '')
			current.classList.add(aClass)
			previous.classList.add(aClass)
			next.classList.add(aClass)
			let clone = to.cloneNode(true)
			let del
			if (to === next) {
				del = previous
				current.parentNode.appendChild(clone)
				next.id = current.id
				current.id = previous.id
				previous = current
				current = next
				next = clone
			} else {
				stepBack = true
				del = next
				previous.id = current.id
				current.id = next.id
				next = current
				current = previous
			}
			setTimeout(function () {
				if (to === previous) {
					current.parentNode.insertBefore(clone, current)
					previous = clone
				}
				// update real values to match these values
				me._sDialog.next = next
				me._sDialog.current = current
				me._sDialog.previous = previous
				current.classList.add(pause)
				next.classList.add(pause)
				previous.classList.add(pause)
				current.classList.remove(aClass)
				next.classList.remove(aClass)
				previous.classList.remove(aClass)
				del.parentNode.removeChild(del)
			}, 300)
			// REVIEW replace below code with requestAnimationFrame
			setTimeout(function () {
				current.classList.remove(pause)
				next.classList.remove(pause)
				previous.classList.remove(pause)
				if (stepBack) {
					me._sDialog.tDate = me._getMonth(me._sDialog.tDate, -1)
				} else {
					me._sDialog.tDate = me._getMonth(me._sDialog.tDate, 1)
				}
				me._initViewHolder()
			}, 350)
			setTimeout(function () {
				if (!(left.classList.contains('mddtp-button--disabled'))) {
					left.removeAttribute('disabled')
				}
				if (!(right.classList.contains('mddtp-button--disabled'))) {
					right.removeAttribute('disabled')
				}
			}, 400)
		}
	}

	/**
	* [_changeYear the on click event handler for year]
	*
	* @method _changeYear
	*
	* @param  {type}    el [description]
	*
	*/
	_changeYear(el) {
		let me = this
		el.onclick = function (e) {
			if (e.target && e.target.nodeName == 'LI') {
				let selected = document.getElementById('mddtp-date__currentYear')
				// clear previous selected
				selected.id = ''
				selected.classList.remove('mddtp-picker__li--current')
				// add the properties to the newer one
				e.target.id = 'mddtp-date__currentYear'
				e.target.classList.add('mddtp-picker__li--current')
				// switch view
				me._switchToDateView(el, me)
				// set the tdate to it
				me._sDialog.tDate.year(parseInt(e.target.textContent, 10))
				// update the dialog
				me._initViewHolder()
			}
		}
	}

	/**
	* [_changeM switch between am and pm modes]
	*
	* @method _changeM
	*
	* @return {type} [description]
	*/
	_changeM() {
		let me = this
		let AM = this._sDialog.AM
		let PM = this._sDialog.PM
		AM.onclick = function (e) {
			//let m = me._sDialog.sDate.format('A')
			// Change Locale Meridiem to AM/PM String
			let m = 'AM'
			if (me._sDialog.sDate._locale.isPM(me._sDialog.sDate.format('A'))){
				m = 'PM'
			}
			if (m === 'PM') {
				me._sDialog.sDate.subtract(12, 'h')
				AM.classList.toggle('mddtp-picker__color--active')
				PM.classList.toggle('mddtp-picker__color--active')
			}
		}
		PM.onclick = function (e) {
			//let m = me._sDialog.sDate.format('A')
			// Change Locale Meridiem to AM/PM String
			let m = 'AM'
			if (me._sDialog.sDate._locale.isPM(me._sDialog.sDate.format('A'))){
				m = 'PM'
			}
			if (m === 'AM') {
				me._sDialog.sDate.add(12, 'h')
				AM.classList.toggle('mddtp-picker__color--active')
				PM.classList.toggle('mddtp-picker__color--active')
			}
		}
	}

	_dragDial() {
		let me = this
		let needle = this._sDialog.needle
		let circle = this._sDialog.circle
		let fakeNeedle = this._sDialog.fakeNeedle
		let circularHolder = this._sDialog.circularHolder
		let minute = this._sDialog.minute
		let quick = 'mddtp-picker__selection--quick'
		let selection = 'mddtp-picker__selection'
		let selected = 'mddtp-picker__cell--selected'
		let rotate = 'mddtp-picker__cell--rotate-'
		let hOffset = circularHolder.getBoundingClientRect()
		let divides
		let fakeNeedleDraggabilly = new Draggabilly(fakeNeedle, {
			containment: true
		})
		fakeNeedleDraggabilly.on('pointerDown', function( e ) {
			//console.info ( 'pointerDown' , e );
			hOffset = circularHolder.getBoundingClientRect()
		})
		/**
		 * netTrek
		 * fixes for iOS - drag
		 */
		fakeNeedleDraggabilly.on('pointerMove', function(e) {

			var clientX = e.clientX
			var clientY = e.clientY

			if ( clientX === undefined ) {

				if ( e.pageX === undefined ) {
					if ( e.touches && e.touches.length > 0 )
					{
						clientX = e.touches [0].clientX
						clientY = e.touches [0].clientY
					} else {
						console.error( 'coult not detect pageX, pageY')
					}
				} else {
					clientX = pageX - document.body.scrollLeft - document.documentElement.scrollLeft
					clientY = pageY - document.body.scrollTop - document.documentElement.scrollTop
				}
			}
			//console.info ( 'Drag clientX' , clientX, clientY, e );

			let xPos = clientX - hOffset.left - (hOffset.width / 2)
			let yPos = clientY - hOffset.top - (hOffset.height / 2)

			let slope = Math.atan2(-yPos, xPos)
			needle.className = ''
			if (slope < 0) {
				slope += 2 * Math.PI
			}
			slope *= 180 / Math.PI
			slope = 360 - slope
			if (slope > 270) {
				slope -= 360
			}
			divides = parseInt(slope / 6)
			let same = Math.abs((6 * divides) - slope)
			let upper = Math.abs((6 * (divides + 1)) - slope)
			if (upper < same) {
				divides++
			}
			divides += 15
			needle.classList.add(selection)
			needle.classList.add(quick)
			needle.classList.add(rotate + (divides * 2))
		})
		/**
		 * netTrek
		 * fixes for iOS - drag
		 */
		let onDragEnd = function ( e ) {
			let minuteViewChildren = me._sDialog.minuteView.getElementsByTagName('div')
			let sMinute = 'mddtp-minute__selected'
			let selectedMinute = document.getElementById(sMinute)
			let cOffset = circle.getBoundingClientRect()
			fakeNeedle.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px')
			needle.classList.remove(quick)
			let select = divides
			if (select === 1) {
				select = 60
			}
			select = me._nearestDivisor(select, 5)
			// normalize 60 => 0
			if (divides === 60) {
				divides = 0
			}
			// remove previously selected value
			if (selectedMinute) {
				selectedMinute.id = ''
				selectedMinute.classList.remove(selected)
			}
			// add the new selected
			if (select > 0) {
				select /= 5
				select--
				minuteViewChildren[select].id = sMinute
				minuteViewChildren[select].classList.add(selected)
			}
			minute.textContent = me._numWithZero(divides)
			me._sDialog.sDate.minutes(divides)
		}

		fakeNeedleDraggabilly.on('pointerUp', onDragEnd);
		fakeNeedleDraggabilly.on('dragEnd', onDragEnd);
	}

	/**
	* [_attachEventHandlers attach event handlers for actions to the date or time picker dialog]
	*
	* @method _attachEventHandlers
	*
	*/
	_attachEventHandlers() {
		let me = this
		let ok = this._sDialog.ok
		let cancel = this._sDialog.cancel
		// create cutom events to dispatch
		let onCancel = new CustomEvent('onCancel')
		let onOk = new CustomEvent('onOk')
		cancel.onclick = function() {
			me.toggle()
			if (me._trigger) {
				me._trigger.dispatchEvent(onCancel)
			}
		}
		ok.onclick = function () {
			me._init = me._sDialog.sDate
			me.toggle()
			if (me._trigger) {
				me._trigger.dispatchEvent(onOk)
			}
		}
	}

	/**
	* [_setButtonText Set the ok and cancel button text]
	* @method _setButtonText
	*/
	_setButtonText() {
		this._sDialog.cancel.textContent = this._cancel
		this._sDialog.ok.textContent = this._ok
	}

	/**
	* [_getMonth get the next or previous month]
	*
	* @method _getMonth
	*
	* @param  {type}  moment [description]
	* @param  {type}  count  [pass -ve values for past months and positive ones for future values]
	*
	* @return {moment}  [returns the relative moment]
	*/
	_getMonth(moment, count) {
		let m
		m = moment.clone()
		if (count > 0) {
			return m.add(Math.abs(count), 'M')
		} else {
			return m.subtract(Math.abs(count), 'M')
		}
	}

	/**
	* [_nearestDivisor gets the nearest number which is divisible by a number]
	*
	* @method _nearestDivisor
	*
	* @param  {int}        number  [number to check]
	* @param  {int}        divided [number to be divided by]
	*
	* @return {int}        [returns -1 if not found]
	*/
	_nearestDivisor(number, divided) {
		if (number % divided === 0)  {
			return number
		}
		else if ((number - 1) % divided === 0) {
			return number - 1
		}
		else if ((number + 1) % divided === 0) {
			return number + 1
		}
		return -1
	}

	/**
	* [_numWithZero returns string number (n) with a prefixed 0 if 0 <= n <= 9]
	*
	* @method _numWithZero
	*
	* @param  {int}     n [description]
	*
	* @return {String}     [description]
	*/
	_numWithZero(n) {
		return n > 9 ? '' + n: '0' + n
	}

	/**
	* [_fillText fills element with text]
	*
	* @method _fillText
	*
	* @param  {type}  el   [description]
	* @param  {type}  text [description]
	*
	* @return {type}  [description]
	*/
	_fillText(el, text) {
		if ( el.firstChild ) {
			el.firstChild.nodeValue = text
		} else {
			el.appendChild(document.createTextNode(text))
		}
	}

	/**
	* [_addId add id to picker element]
	*
	* @method _addId
	*
	* @param  {type} el [description]
	*/
	_addId(el, id) {
		el.id = 'mddtp-' + this._type + '__' + id
	}

	/**
	* [_addClass add the default class to picker element]
	*
	* @method _addClass
	*
	* @param  {type}  el    [description]
	* @param  {type}  class [description]
	* @param  {type}  more [description]
	*/
	_addClass(el, aClass, more) {
		el.classList.add('mddtp-picker__' + aClass)
		let i = 0
		if (more) {
			i = more.length
			more.reverse()
		}
		while (i--) {
			el.classList.add(more[i])
		}
	}

	/**
	* [_addView add view]
	*
	* @method _addView
	*
	* @param  {type} view [description]
	*/
	_addView (view) {
		let month = document.createElement('div')
		let grid = document.createElement('div')
		let th = document.createElement('div')
		let tr = document.createElement('div')
		/**
		* @netTrek - weekday dependented from moment.locale
		*/

		let weekDays = moment.weekdaysMin(true).reverse()

		let week = 7
		while (week--) {
			let span = document.createElement('span')
			span.textContent = weekDays[week]
			th.appendChild(span)
		}
		// add properties to them
		this._addClass(month, 'month')
		this._addClass(grid, 'grid')
		this._addClass(th, 'th')
		this._addClass(tr, 'tr')
		// add them to the view
		view.appendChild(month)
		view.appendChild(grid)
		grid.appendChild(th)
		grid.appendChild(tr)
	}

	/**
	* [_calcRotation calculate rotated angle and return the appropriate class for it]
	*
	* @method _calcRotation
	*
	* @param  {int}      spoke [spoke is the spoke count = [12,24,60]]
	*
	* @param  {int}      value [value for the spoke]
	*
	* @return {String}      [appropriate class]
	*/
	_calcRotation(spoke, value) {
		// set clocks top and right side value
		if (spoke === 12) {
			value *= 10
		}
		else if (spoke === 24) {
			value *= 5
		}
		else {
			value *= 2
		}
		// special case for 00 => 60
		if (spoke === 60 && value === 0) {
			value = 120
		}
		return 'mddtp-picker__cell--rotate-' + value
	}
}

mdDateTimePicker._dialog = {
	view: true,
	state: false
}

export default mdDateTimePicker
