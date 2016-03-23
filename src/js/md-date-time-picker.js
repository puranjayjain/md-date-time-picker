/**
* @package md-date-time-picker
* @version [0.0.1]
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
	* @param  {[string]}    type         [type of dialog] ['date','time']
	* @param  {[moment]}    init   = moment() [initial value for the dialog date or time, defaults to today] [@default value of today]
	* @param  {[moment]}    past   = moment() [the past moment till which the calendar shall render] [@default value of exactly 21 Years ago from init]
	* @param  {[moment]}    future = moment() [the future moment till which the calendar shall render] [@default value of init]
	*
	* @param	 {[Boolean]}    mode  = false [this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default 12 hour mode = false]
	*
	* @return {[Object]}    [mdDateTimePicker]
	*/
	constructor({type, init = moment(), past = moment().subtract(21, 'years'), future = init, mode = false}) {
		this._type = type
		this._init = init
		this._past = past
		this._future = future
		this._mode = mode

		/**
		* [dialog selected classes have the same structure as dialog but one level down]
		* @type {Object}
		* e.g
		* sDialog = {
		*   picker: 'some-picker-selected'
		* }
		*/
		this._sDialog = {}
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
		// clone elements and add them again to clear events attached to them
		let picker = document.getElementById('mddtp-picker__' + [this._type])
		let pickerClone = picker.cloneNode(true)
		picker.parentNode.replaceChild(pickerClone, picker)
		// now do what you normally would do
		this._sDialog.picker = document.getElementById('mddtp-picker__' + [this._type])
		/**
		* [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
		*
		* @type {Array}
		*/
		let sDialogEls = [
			'viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth', 'AM', 'PM', 'needle', 'hourView', 'minuteView', 'hour', 'minute'
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
		mdDateTimePicker.dialog.state = false
		mdDateTimePicker.dialog.view = true
		this._sDialog.picker.classList.add('zoomOut')
		// reset classes
		if (this._type === 'date') {
			years.classList.remove('zoomIn', 'zoomOut')
			years.classList.add('mddtp-picker__years--invisible')
			title.classList.remove('mddtp-picker__color--active')
			subtitle.classList.add('mddtp-picker__color--active')
			viewHolder.classList.remove('zoomOut')
		}
		else {
			AM.classList.remove('mddtp-picker__color--active')
			PM.classList.remove('mddtp-picker__color--active')
			minute.classList.remove('mddtp-picker__color--active')
			hour.classList.add('mddtp-picker__color--active')
			subtitle.setAttribute('style', 'display: none')
		}
		setTimeout(function () {
			me._sDialog.picker.classList.remove('zoomOut')
			me._sDialog.picker.classList.add('mddtp-picker--inactive')
		}, 300)
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
			hour.innerHTML = m.format('H')
		}
		else {
			hour.innerHTML = m.format('h')
			this._sDialog[m.format('A')].classList.add('mddtp-picker__color--active')
			subtitle.removeAttribute('style')
		}
		minute.innerHTML = m.format('mm')
		this._initHour()
		this._initMinute()
		this._attachEventHandlers()
		this._changeM()
		this._switchToView(hour)
		this._switchToView(minute)
	}

	_initHour() {
		let hourView = this._sDialog.hourView
		let needle = this._sDialog.needle
		let docfrag = document.createDocumentFragment()
		if (this._mode) {

		}
		else {
			const hourNow = this._sDialog.tDate.format('h')
			for (let i = 3,j = 0; i <= 14; i++, j += 5) {
				let k
				let div = document.createElement('div')
				let span = document.createElement('span')
				div.classList.add('mddtp-picker__cell')
				k = i
				if (i > 12) {
					span.textContent = k - 12
				}
				else {
					span.textContent = k
				}
				if (j) {
					div.classList.add('mddtp-picker__cell--rotate-' + j)
				}
				if (hourNow == k) {
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
		const minuteNow = this._sDialog.tDate.format('mm')
		const minuteAhead = minuteNow + 1
		const minuteBehind = minuteNow - 1
		let docfrag = document.createDocumentFragment()
		for (let i = 15,j = 0; i <= 70; i += 5, j += 5) {
			let k
			let div = document.createElement('div')
			let span = document.createElement('span')
			div.classList.add('mddtp-picker__cell')
			k = i
			if (i > 55) {
				span.textContent = this._numWithZero(k - 60)
			}
			else {
				span.textContent = k
			}
			if (j) {
				div.classList.add('mddtp-picker__cell--rotate-' + j)
			}
			if ((minuteNow == k) || (minuteAhead == k) || (minuteBehind == k)) {
				div.classList.add('mddtp-picker__cell--selected')
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
		subtitle.innerHTML = m.format('YYYY')
		titleDay.innerHTML = m.format('ddd, ')
		titleMonth.innerHTML = m.format('MMM D')
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
		this._switchToView(current.querySelector('.mddtp-picker__month'))
		this._toMoveMonth()
	}

	_initMonth(view, m) {
		let displayMonth = m.format('MMMM YYYY')
		view.querySelector('.mddtp-picker__month').innerHTML = displayMonth
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
				cell.innerHTML = currentDay
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
			el.addEventListener('click', function () {
				me._switchToDateView(el, me)
			}, false)
		}
		else {
			el.addEventListener('click', function () {
				me._switchToTimeView(el, me)
			}, false)
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
		let hourView = this._sDialog.hourView
		let minuteView = this._sDialog.minuteView
		let hour = this._sDialog.hour
		let minute = this._sDialog.minute
		let activeClass = 'mddtp-picker__color--active'
		let needle = this._sDialog.needle
		let spoke = 60
		let value
		// toggle view classes
		hourView.classList.toggle('mddtp-picker__circularView--hidden')
		minuteView.classList.toggle('mddtp-picker__circularView--hidden')
		hour.classList.toggle(activeClass)
		minute.classList.toggle(activeClass)
		// move the needle to correct position
		needle.className = ''
		needle.classList.add('mddtp-picker__selection')
		if (mdDateTimePicker.dialog.view) {
			value = this._sDialog.tDate.format('m')
		}
		else {
			if (this._mode) {
				spoke = 24
				value = this._sDialog.tDate.format('H')
			}
			else {
				spoke = 12
				value = this._sDialog.tDate.format('h')
			}
		}
		let rotationClass = this._calcRotation(spoke, value)
		if (rotationClass) {
			needle.classList.add(rotationClass)
		}
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
				let day = e.target.innerHTML
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
				subtitle.innerHTML = currentDate.year()
				titleDay.innerHTML = currentDate.format('ddd, ')
				titleMonth.innerHTML = currentDate.format('MMM D')
			}
		}, false)
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
		}, false)

		right.addEventListener('click', function () {
			moveStep(mLeftClass, me._sDialog.next)
		}, false)

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
				me._sDialog.tDate.year(parseInt(e.target.innerHTML, 10))
				// update the dialog
				me._initViewHolder()
			}
		}, false)
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
		}, false)
		PM.addEventListener('click', function (e) {
			let m = me._sDialog.sDate.format('A')
			if (m === 'AM') {
				me._sDialog.sDate.add(12, 'h')
				AM.classList.toggle('mddtp-picker__color--active')
				PM.classList.toggle('mddtp-picker__color--active')
			}
		}, false)
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
		}, false)
		ok.addEventListener('click', function () {
			me._init = me._sDialog.sDate
			me.toggle()
		}, false)
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
	* [_numWithZero returns string number (n) with a prefixed 0 if 0 <= n <= 9]
	*
	* @method _numWithZero
	*
	* @param  {[int]}     n [description]
	*
	* @return {[string]}     [description]
	*/
	_numWithZero(n){
		return n > 9 ? '' + n: '0' + n
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
		let multiplicativeFactor
		let cssClass
		// set clocks top and right side value
		if (spoke === 12) {
			// if the value is above the top value and less than the right value then increment it
			if (value < 3 && value >= 1) {
				value += 12
			}
			multiplicativeFactor = 5
		}
		else if (spoke === 24) {
			// REVIEW this multiplicativeFactor anf also revise css classes for this style
			// multiplicativeFactor = 5
		}
		else {
			// if the value is above the top value and less than the right value then increment it
			if (value < 15 && value >= 0) {
				value += 60
			}
			multiplicativeFactor = 1
		}
		//make values begin from 0 from the start
		value -= start
		// if value is not 0 i.e truthy
		if (value) {
			cssClass = 'mddtp-picker__cell--rotate-' + (value * multiplicativeFactor)
		}
		// return it
		return cssClass
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
