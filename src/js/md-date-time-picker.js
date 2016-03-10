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
	 * @param  {[moment]}    init    = moment() [initial value for the dialog date or time, defaults to today] [@default value of today]
	 * @param  {[moment]}    past    = moment() [the past moment till which the calendar shall render] [@default value of exactly 21 Years ago from init]
	 * @param  {[moment]}    future  = moment() [the future moment till which the calendar shall render] [@default value of init]
	 *
	 * @return {[Object]}    [mdDateTimePicker]
	 */
	constructor(type, init = moment(), past = moment().subtract(21, 'years'), future = init) {
		this._type = type
		this._init = init
		this._past = past
		this._future = future

		/**
		 * [dialog selected classes has the same structure as dialog but one level down]
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
	 * @method date
	 *
	 * @param  {[moment]} m
	 *
	 */
	date(m = '') {
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
				// this._initTimeDialog(this._init)
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

	/**
	 * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
	 * @param  {[moment]} m [date for today or current]
	 */
	_selectDialog() {
		// clone elements and add them again to clear events attached to them
		let picker = document.getElementById('md-picker__' + [this._type])
		let pickerClone = picker.cloneNode(true)
		picker.parentNode.replaceChild(pickerClone, picker)
			// now do what you normally would do
		this._sDialog.picker = document.getElementById('md-picker__' + [this._type])
			/**
			 * [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
			 *
			 * @type {Array}
			 */
		let sDialogEls = [
			'viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth'
		]
		for (let sDialogEl of sDialogEls) {
			this._sDialog[sDialogEl] = document.getElementById('md-' + this._type + '__' + sDialogEl)
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
		mdDateTimePicker.dialog.state = true
		this._sDialog.picker.classList.remove('md-picker--inactive')
		this._sDialog.picker.classList.add('zoomIn')
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
		let header = this._sDialog.header
		let viewHolder = this._sDialog.viewHolder
		mdDateTimePicker.dialog.state = false
		mdDateTimePicker.dialog.view = true
		this._sDialog.picker.classList.add('zoomOut')
			// reset classes
		years.classList.remove('zoomIn', 'zoomOut')
		years.classList.add('md-picker__years--invisible')
		header.classList.remove('md-picker__header--invert')
		viewHolder.classList.remove('zoomOut')
		setTimeout(function () {
			me._sDialog.picker.classList.remove('zoomOut', 'zoomIn')
			me._sDialog.picker.classList.add('md-picker--inactive')
		}, 300)
	}

	/**
	 * [initDateDialog description]
	 * @param  {[type]} m [description]
	 * @return {[type]}   [description]
	 */

	//  TODO apply upper cap and lower cap to this function as well
	_initDateDialog(m) {
		let subtitle = this._sDialog.subtitle
		let title = this._sDialog.title
		let titleDay = this._sDialog.titleDay
		let titleMonth = this._sDialog.titleMonth
		subtitle.innerHTML = m.format('YYYY')
		titleDay.innerHTML = m.format('ddd, ')
		titleMonth.innerHTML = m.format('MMM D')
		this._initYear()
		this._initViewHolder(m)
		this._attachEventHandlers()
		this._changeMonth()
		this._switchToDateView(subtitle)
		this._switchToDateView(title)
	}

	_initViewHolder(m) {
		let picker = this._sDialog.picker
		let current = this._sDialog.current
		let previous = this._sDialog.previous
		let next = this._sDialog.next
		this._initMonth(current, m)
		this._initMonth(next, moment(this._getMonth(m, 1)))
		this._initMonth(previous, moment(this._getMonth(m, -1)))
		this._switchToDateView(current.querySelector('.md-picker__month'))
	}

	_initMonth(view, m) {
		let displayMonth = m.format('MMMM YYYY')
		view.querySelector('.md-picker__month').innerHTML = displayMonth
		let docfrag = document.createDocumentFragment()
		let tr = view.querySelector('.md-picker__tr')
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
					cell.classList.add('md-picker__cell--disabled')
				} else {
					cell.classList.add('md-picker__cell')
				}
				cell.innerHTML = currentDay
			}
			if (today === i) {
				cell.classList.add('md-picker__cell--today')
			}
			if (selected === i) {
				cell.classList.add('md-picker__cell--selected')
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
			// REVIEW CHANGE THE YEAR according TO THE DIALOG METHODS
		for (let year = past; year <= future; year++) {
			let li = document.createElement('li')
			li.textContent = year
			if (year === currentYear) {
				li.id = 'md-date__currentYear'
				li.classList.add('md-picker__li--current')
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
	 * [_switchToDateView Adds event handler for the feature: switch between date and year view in date dialog]
	 *
	 * @method _switchToDateView
	 *
	 * @param  {[type]} picker [description]
	 * @param  {[type]} el     [description]
	 *
	 */
	_switchToDateView(el) {
		let me = this
			// attach the view change button
		el.addEventListener('click', function () {
			me._switchToDateViewFunction(el, me)
		}, false)
	}

	/**
	 * [_switchToDateViewFunction the actual switchToDateView function so that it can be called by other elements as well]
	 *
	 * @method _switchToDateViewFunction
	 *
	 * @param  {[type]}	el [element to attach event to]
	 * @param  {[type]}	me [context]
	 *
	 */
	_switchToDateViewFunction(el, me) {
		el.classList.add('md-button--unclickable')
		let viewHolder = me._sDialog.viewHolder
		let years = me._sDialog.years
		let header = me._sDialog.header
		let currentYear = document.getElementById('md-date__currentYear')
		if (mdDateTimePicker.dialog.view) {
			viewHolder.classList.add('zoomOut')
			years.classList.remove('md-picker__years--invisible')
			years.classList.add('zoomIn')
				// scroll into the view
			currentYear.scrollIntoViewIfNeeded()
		} else {
			years.classList.add('zoomOut')
			viewHolder.classList.remove('zoomOut')
			viewHolder.classList.add('zoomIn')
			setTimeout((function () {
				years.classList.remove('zoomIn', 'zoomOut')
				years.classList.add('md-picker__years--invisible')
				viewHolder.classList.remove('zoomIn')
			}), 300)
		}
		header.classList.toggle('md-picker__header--invert')
		mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view
		setTimeout((function () {
			el.classList.remove('md-button--unclickable')
		}), 300)
	}

	_addCellClickEvent(el) {
		let me = this
		el.addEventListener('click', function (e) {
			if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('md-picker__cell')) {
				let picker = me._sDialog.picker
				let day = e.target.innerHTML
				let currentDate = me._sDialog.tDate.date(day)
				let selected = picker.querySelector('.md-picker__cell--selected')
				let title = me._sDialog.title
				let subtitle = me._sDialog.subtitle
				let titleDay = me._sDialog.titleDay
				let titleMonth = me._sDialog.titleMonth
				if (selected) {
					selected.classList.remove('md-picker__cell--selected')
				}
				e.target.classList.add('md-picker__cell--selected')

				// update temp date object with the date selected
				me._sDialog.sDate = currentDate.clone()
				subtitle.innerHTML = currentDate.year()
				titleDay.innerHTML = currentDate.format('ddd, ')
				titleMonth.innerHTML = currentDate.format('MMM D')
			}
		}, false)
	}

	_updateDialog() {
		this._initViewHolder(this._sDialog.tDate)
	}

	_changeMonth() {
		let me = this
		let left = this._sDialog.left
		let right = this._sDialog.right
		let mLeftClass = 'md-picker__view--left'
		let mRightClass = 'md-picker__view--right'
		let pause = 'md-picker__view--pause'
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
			left.classList.add('md-button--unclickable')
			right.classList.add('md-button--unclickable')
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
				me._initViewHolder(me._sDialog.tDate)
			}, 350)
			setTimeout(function () {
				left.classList.remove('md-button--unclickable')
				right.classList.remove('md-button--unclickable')
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
				let selected = document.getElementById('md-date__currentYear')
					// clear previous selected
				selected.id = ''
				selected.classList.remove('md-picker__li--current')
					// add the properties to the newer one
				e.target.id = 'md-date__currentYear'
				e.target.classList.add('md-picker__li--current')
					// switch view
				me._switchToDateViewFunction(el, me)
					// set the tdate to it
				me._sDialog.tDate.year(parseInt(e.target.innerHTML, 10))
					// update the dialog
				me._updateDialog()
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
			return m.add(Math.abs(count), 'month')
		} else {
			return m.subtract(Math.abs(count), 'month')
		}
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
