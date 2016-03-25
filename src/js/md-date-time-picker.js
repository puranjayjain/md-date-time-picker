/**
* @package md-date-time-picker
* @version [0.1.0]
* @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
* @license MIT
* @website puranjayjain.github.io/md-date-time-picker/demo.html
*/

/**
* All declarations starting with _ are considered @private
*/
let _dialog = {
	view: true,
	state: false
}
class mdDateTimePicker {
	/**
	* [constructor of the mdDateTimePicker]
	*
	* @method constructor
	*
	* @param  {[string]}   type = 'date' or 'time 									[type of dialog]
	* @param  {[moment]}   init 																		[initial value for the dialog date or time, defaults to today] [@default = today]
	* @param  {[moment]}   past 																		[the past moment till which the calendar shall render] [@default = exactly 21 Years ago from init]
	* @param  {[moment]}   future = moment() 												[the future moment till which the calendar shall render] [@default = init]
	* @param	{[Boolean]}  mode 																		[this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default = false]
	* @param  {[string]}    orientation = 'LANDSCAPE' or 'PORTRAIT' [force the orientation of the picker @default = 'LANDSCAPE']
	*
	* @return {[Object]}    																				[mdDateTimePicker]
	*/
	constructor({type, init = moment(), past = moment().subtract(21, 'years'), future = init, mode = false, orientation = 'LANDSCAPE'}) {
		this._type = type
		this._init = init
		this._past = past
		this._future = future
		this._mode = mode
		this._orientation = orientation

		/**
		* [dialog selected classes have the same structure as dialog but one level down]
		* @type {Object}
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
	* [upDate to get or set the current picker's moment]
	*
	* @method time
	*
	* @param  {[moment]} m
	*
	*/
	time(m = '') {
		if (m === '') {
			return this._init
		} else {
			this._init = m
		}
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
			this._hideDialog()
		} else {
			if (this._type === 'date') {
				this._initDateDialog(this._init)
			} else if (this._type === 'time') {
				this._initTimeDialog(this._init)
			}
			this._showDialog()
		}
	}

	/**
	* [dialog getter and setter for _dialog value]
	*
	* @method dialog
	*
	* @return {[_dialog]} [static or prototype value for the _dialog of the component]
	*/
	static get dialog() {
		return _dialog
	}

	// REVIEW the code below is unnecessary or necessary
	// static set dialog(value) {
	// 	mdDateTimePicker.dialog = value
	// }

	_selectDialog() {
		// now do what you normally would do
		this._sDialog.picker = document.getElementById('mddtp-picker__' + [this._type])
		/**
		* [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
		*
		* @type {Array}
		*/
		let sDialogEls = [
			'viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth', 'AM', 'PM', 'needle', 'hourView', 'minuteView', 'hour', 'minute', 'fakeNeedle', 'circularHolder', 'circle'
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
		mdDateTimePicker.dialog.state = true
		this._sDialog.picker.classList.remove('mddtp-picker--inactive')
		this._sDialog.picker.classList.add('zoomIn')
		setTimeout(function () {
			me._sDialog.picker.classList.remove('zoomIn')
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
			AM.classList.remove()
			PM.classList.remove(active)
			minute.classList.remove(active)
			hour.classList.add(active)
			minuteView.classList.add(hidden)
			hourView.classList.remove(hidden)
			subtitle.setAttribute('style', 'display: none')
			needle.className = ''
			needle.classList.add(selection)
		}
		setTimeout(function () {
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
		container.classList.add('mddtp-picker','mddtp-picker-' + type, 'mddtp-picker--inactive', 'animated')
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
			let subtitle = document.createElement('h4')
			let title = document.createElement('h2')
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
			this._addId(right, 'right')
			right.classList.add('mddtp-button')
			this._addClass(right, 'right')
			right.setAttribute('type', 'button')
			this._addId(years, 'years')
			this._addClass(years, 'years', ['mddtp-picker__years--invisible', 'animated'])
			// add them to body
			body.appendChild(viewHolder)
			body.appendChild(left)
			body.appendChild(right)
			body.appendChild(years)
		}
		else {
			let title = document.createElement('h2')
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
			this._addId(minute, 'minute')
			this._addId(subtitle, 'subtitle')
			this._addClass(subtitle, 'subtitle')
			subtitle.setAttribute('style', 'display: none')
			this._addId(AM, 'AM')
			AM.textContent = 'AM'
			this._addId(PM, 'PM')
			PM.textContent = 'PM'
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
			minuteView.classList.add('mddtp-picker__circularView', 'mddtp-picker__circularView--hidden')
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
		this._addId(cancel, 'cancel')
		cancel.classList.add('mddtp-button')
		cancel.setAttribute('type', 'button')
		cancel.textContent = 'cancel'
		this._addId(ok, 'ok')
		ok.classList.add('mddtp-button')
		ok.setAttribute('type', 'button')
		ok.textContent = 'ok'
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
	* @param  {[moment]} m [date for today or current]
	*/
	_initTimeDialog(m) {
		let hour = this._sDialog.hour
		let minute = this._sDialog.minute
		let subtitle = this._sDialog.subtitle
		// switch according to 12 hour or 24 hour mode
		if (this._mode) {
			// REVIEW 24 HOUR MODE
			this._fillText(hour, m.format('H'))
		}
		else {
			this._fillText(hour, m.format('h'))
			this._sDialog[m.format('A')].classList.add('mddtp-picker__color--active')
			subtitle.removeAttribute('style')
		}
		this._fillText(minute, m.format('mm'))
		this._initHour()
		this._initMinute()
		this._attachEventHandlers()
		this._changeM()
		this._dragDial()
		this._switchToView(hour)
		this._switchToView(minute)
	}

	_initHour() {
		let hourView = this._sDialog.hourView
		let needle = this._sDialog.needle
		let docfrag = document.createDocumentFragment()
		if (this._mode) {
			// REVIEW 24 HOUR MODE
			const hourNow = parseInt(this._sDialog.tDate.format('H'), 10)
		}
		else {
			const hourNow = parseInt(this._sDialog.tDate.format('h'), 10)
			for (let i = 1,j = 5; i <= 12; i++, j += 5) {
				let div = document.createElement('div')
				let span = document.createElement('span')
				div.classList.add('mddtp-picker__cell')
				span.textContent = i
				div.classList.add('mddtp-picker__cell--rotate-' + j)
				if (hourNow === i) {
					div.classList.add('mddtp-picker__cell--selected')
					needle.classList.add('mddtp-picker__cell--rotate-' + j)
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
		let selected = 'mddtp-picker__cell--selected'
		let rotate = 'mddtp-picker__cell--rotate-'
		let cell = 'mddtp-picker__cell'
		let docfrag = document.createDocumentFragment()
		for (let i = 5,j = 5; i <= 60; i += 5, j += 5) {
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
	* @param  {[moment]} m [date for today or current]
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
	}

	_initViewHolder() {
		let m = this._sDialog.tDate
		let picker = this._sDialog.picker
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
		this._fillText(view.querySelector('.mddtp-picker__month'), displayMonth)
		let docfrag = document.createDocumentFragment()
		let tr = view.querySelector('.mddtp-picker__tr')
		let firstDayOfMonth = parseInt(moment(m).date(1).day(), 10)
		let today = -1
		let selected = -1
		let lastDayOfMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1
		let past = firstDayOfMonth
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
					cell.classList.add('mddtp-picker__cell--disabled')
				} else {
					cell.classList.add('mddtp-picker__cell')
				}
				this._fillText(cell, currentDay)
			}
			if (today === i) {
				cell.classList.add('mddtp-picker__cell--today')
			}
			if (selected === i) {
				cell.classList.add('mddtp-picker__cell--selected')
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
	* @return {[type]}  [description]
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
	* [_switchToView Adds event handler for the feature: switch between date and year view in date dialog]
	*
	* @method _switchToView
	*
	* @param  {[type]} picker [description]
	*
	* @param  {[type]} el     [description]
	*
	*/
	_switchToView(el) {
		let me = this
		// attach the view change button
		if (this._type == 'date') {
			el.addEventListener('click',function () {
				me._switchToDateView(el, me)
			})
		}
		else {
			el.addEventListener('click', function () {
				me._switchToTimeView(el, me)
			})
		}
	}

	/**
	* [_switchToTimeView the actual switchToDateView function so that it can be called by other elements as well]
	*
	* @method _switchToTimeView
	*
	* @param  {[type]}          el [element to attach event to]
	* @param  {[type]}          me [context]
	*
	*/
	_switchToTimeView(el, me) {
		let hourView = me._sDialog.hourView
		let minuteView = me._sDialog.minuteView
		let hour = me._sDialog.hour
		let minute = me._sDialog.minute
		let activeClass = 'mddtp-picker__color--active'
		let hidden = 'mddtp-picker__circularView--hidden'
		let selection = 'mddtp-picker__selection'
		let needle = me._sDialog.needle
		let circularHolder = me._sDialog.circularHolder
		let circle = me._sDialog.circle
		let fakeNeedle = me._sDialog.fakeNeedle
		let spoke = 60
		let value
		// toggle view classes
		hourView.classList.toggle(hidden)
		minuteView.classList.toggle(hidden)
		hour.classList.toggle(activeClass)
		minute.classList.toggle(activeClass)
		// move the needle to correct position
		needle.className = ''
		needle.classList.add(selection)
		if (mdDateTimePicker.dialog.view) {
			value = me._sDialog.sDate.format('m')
			// move the fakeNeedle to correct position
			setTimeout(function () {
				let hOffset = circularHolder.getBoundingClientRect()
				let cOffset = circle.getBoundingClientRect()
				fakeNeedle.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px')
			}, 300)
		}
		else {
			if (me._mode) {
				spoke = 24
				value = me._sDialog.sDate.format('H')
			}
			else {
				spoke = 12
				value = me._sDialog.sDate.format('h')
			}
		}
		let rotationClass = me._calcRotation(spoke, parseInt(value, 10))
		if (rotationClass) {
			needle.classList.add(rotationClass)
		}
		// toggle the view type
		mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view
	}
	/**
	* [_switchToDateView the actual switchToDateView function so that it can be called by other elements as well]
	*
	* @method _switchToDateView
	*
	* @param  {[type]}	el [element to attach event to]
	* @param  {[type]}	me [context]
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
			currentYear.scrollIntoViewIfNeeded()
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

	_addCellClickEvent(el) {
		let me = this
		el.addEventListener('click', function (e) {
			if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('mddtp-picker__cell')) {
				let picker = me._sDialog.picker
				let day = e.target.textContent
				let currentDate = me._sDialog.tDate.date(day)
				let selected = picker.querySelector('.mddtp-picker__cell--selected')
				let subtitle = me._sDialog.subtitle
				let titleDay = me._sDialog.titleDay
				let titleMonth = me._sDialog.titleMonth
				if (selected) {
					selected.classList.remove('mddtp-picker__cell--selected')
				}
				e.target.classList.add('mddtp-picker__cell--selected')

				// update temp date object with the date selected
				me._sDialog.sDate = currentDate.clone()

				this._fillText(subtitle, currentDate.year())
				this._fillText(titleDay, currentDate.format('ddd, '))
				this._fillText(titleMonth, currentDate.format('MMM D'))
			}
		})
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
		left.addEventListener('click', function () {
			moveStep(mRightClass, me._sDialog.previous)
		})

		right.addEventListener('click', function () {
			moveStep(mLeftClass, me._sDialog.next)
		})

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
	* @param  {[type]}    el [description]
	*
	*/
	_changeYear(el) {
		let me = this
		el.addEventListener('click', function (e) {
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
		})
	}

	/**
	* [_changeM switch between am and pm modes]
	*
	* @method _changeM
	*
	* @return {[type]} [description]
	*/
	_changeM() {
		let me = this
		let AM = this._sDialog.AM
		let PM = this._sDialog.PM
		AM.addEventListener('click', function (e) {
			let m = me._sDialog.sDate.format('A')
			if (m === 'PM') {
				me._sDialog.sDate.subtract(12, 'h')
				AM.classList.toggle('mddtp-picker__color--active')
				PM.classList.toggle('mddtp-picker__color--active')
			}
		})
		PM.addEventListener('click', function (e) {
			let m = me._sDialog.sDate.format('A')
			if (m === 'AM') {
				me._sDialog.sDate.add(12, 'h')
				AM.classList.toggle('mddtp-picker__color--active')
				PM.classList.toggle('mddtp-picker__color--active')
			}
		})
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
		fakeNeedleDraggabilly.on('pointerDown', function() {
			hOffset = circularHolder.getBoundingClientRect()
		})
		fakeNeedleDraggabilly.on('dragMove', function(e) {
			let xPos = e.clientX - hOffset.left - (hOffset.width / 2)
			let yPos = e.clientY - hOffset.top - (hOffset.height / 2)
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
			needle.classList.add(selection, quick, rotate + divides)
		})
		fakeNeedleDraggabilly.on('dragEnd', function() {
			let minuteViewChildren = me._sDialog.minuteView.getElementsByTagName('div')
			let minuteNow = parseInt(me._sDialog.sDate.format('m'), 10)
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
			// normalize 0 and 1 => 60
			if (minuteNow >= 0 && minuteNow <= 1) {
				minuteNow = 60
			}
			minuteNow = me._nearestDivisor(minuteNow, 5)
			if (minuteNow % 5 === 0) {
				minuteNow /= 5
				minuteNow--
				minuteViewChildren[minuteNow].classList.remove(selected)
			}
			if (select > 0) {
				select /= 5
				select--
				minuteViewChildren[select].classList.add(selected)
			}
			minute.textContent = me._numWithZero(divides)
			me._sDialog.sDate.minutes(divides)
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
		let ok = this._sDialog.ok
		let cancel = this._sDialog.cancel
		cancel.addEventListener('click', function () {
			me.toggle()
		})
		ok.addEventListener('click', function () {
			me._init = me._sDialog.sDate
			me.toggle()
		})
	}

	/**
	* [_getMonth get the next or previous month]
	*
	* @method _getMonth
	*
	* @param  {[type]}  moment [description]
	* @param  {[type]}  count  [pass -ve values for past months and positive ones for future values]
	*
	* @return {[moment]}  [returns the relative moment]
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
	* @param  {[int]}        number  [number to check]
	* @param  {[int]}        divided [number to be divided by]
	*
	* @return {[int]}        [returns -1 if not found]
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
	* @param  {[int]}     n [description]
	*
	* @return {[string]}     [description]
	*/
	_numWithZero(n) {
		return n > 9 ? '' + n: '0' + n
	}

	/**
	* [_fillText fills element with text]
	*
	* @method _fillText
	*
	* @param  {[type]}  el   [description]
	* @param  {[type]}  text [description]
	*
	* @return {[type]}  [description]
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
	* @param  {[type]} el [description]
	*/
	_addId(el, id) {
		el.id = 'mddtp-' + this._type + '__' + id
	}

	/**
	* [_addClass add the default class to picker element]
	*
	* @method _addClass
	*
	* @param  {[type]}  el    [description]
	* @param  {[type]}  class [description]
	* @param  {[type]}  more [description]
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
	* @param  {[type]} view [description]
	*/
	_addView (view) {
		let month = document.createElement('div')
		let grid = document.createElement('div')
		let th = document.createElement('div')
		let tr = document.createElement('div')
		let weekDays = ['S', 'F', 'T', 'W', 'T', 'M', 'S']
		let week = 6
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
	* @param  {[int]}      spoke [spoke is the spoke count = [12,24,60]]
	*
	* @param  {[int]}      value [value for the spoke]
	*
	* @return {[string]}      [appropriate class]
	*/
	_calcRotation(spoke, value) {
		let start = (spoke / 12) * 3
		// set clocks top and right side value
		if (spoke === 12) {
			value *= 5
		}
		else if (spoke === 24) {
			// REVIEW this multiplicativeFactor and also revise css classes for this style
			value *= 10
		}
		// special case for 00 => 60
		if (spoke === 60 && value === 0) {
			value = 60
		}
		return 'mddtp-picker__cell--rotate-' + value
	}
}

// polyfill for scrollintoviewifneeded
if (!Element.prototype.scrollIntoViewIfNeeded) {
	Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
		centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded

		let parent = this.parentNode,
		parentComputedStyle = window.getComputedStyle(parent, null),
		parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'), 10),
		parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'), 10),
		overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
		overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
		overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
		overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
		alignWithTop = overTop && !overBottom

		if ((overTop || overBottom) && centerIfNeeded) {
			parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2
		}

		if ((overLeft || overRight) && centerIfNeeded) {
			parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2
		}

		if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
			this.scrollIntoView(alignWithTop)
		}
	}
}
// polyfill for text content for ie8
if (Object.defineProperty
	&& Object.getOwnPropertyDescriptor
	&& Object.getOwnPropertyDescriptor(Element.prototype, 'textContent')
	&& !Object.getOwnPropertyDescriptor(Element.prototype, 'textContent').get) {
		(function() {
			let innerText = Object.getOwnPropertyDescriptor(Element.prototype, 'innerText')
			Object.defineProperty(Element.prototype, 'textContent',
			{
				get: function() {
					return innerText.get.call(this)
				},
				set: function(s) {
					return innerText.set.call(this, s)
				}
			}
		)
	})()
}
