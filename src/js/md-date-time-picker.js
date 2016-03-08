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
let _dialog = {
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
		this._type = type
		this._init = init
		this._format = format
		this._display = display
		this._args = args

		if (this._type) {
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
	}

	/**
	 * [toggle toggle the dialog's between the visible and invisible state]
	 *
	 * @method toggle
	 *
	 * @return {[type]} [description]
	 */
	toggle() {
		this._selectDialog()
			// work according to the current state of the dialog
		if (mdDateTimePicker.dialog.state) {
			this._hideDialog()
		} else {
			if (this._type === 'date') {
				this._initDateDialog(this._sDialog.date)
			} else if (this._type === 'time') {
				// this._initTimeDialog(this._sDialog.date)
			}
			this._showDialog()
		}
	}

	/**
	 * [dialog getter and setter for _dialog value]
	 *
	 * @method dialog
	 *
	 * @return {[type]} [description]
	 */
	static get dialog() {
		return _dialog;
	}

	// REVIEW the code below is unnecessary
	// static set dialog(value) {
	// 	mdDateTimePicker.dialog = value;
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
			'viewHolder', 'years', 'header', 'cancel', 'ok'
		]
		for (let sDialogEl of sDialogEls) {
			this._sDialog[sDialogEl] = document.getElementById('md-' + [this._type] + '__' + sDialogEl)
		}

		if (!this._sDialog.date) {
			if (this._init) {
				this._sDialog.date = moment(this._init, this._format)
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
		mdDateTimePicker.dialog.state = true
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
		let years = this._sDialog.years
		let header = this._sDialog.header
		let viewHolder = this._sDialog.viewHolder
		mdDateTimePicker.dialog.state = false
		mdDateTimePicker.dialog[this._type].view = true
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
		let picker = mdDateTimePicker.dialog.date.picker
		let current = mdDateTimePicker.dialog.date.current
		let previous = mdDateTimePicker.dialog.date.previous
		let next = mdDateTimePicker.dialog.date.next
		document.querySelector(picker + '.md-picker__subtitle').innerHTML = m.format('YYYY')
		document.querySelector(picker + '.md-picker__title').innerHTML = m.format('ddd, MMM D')
		this._initMonth(picker + current, m)
		this._initMonth(picker + previous, moment(this._getPreviousMonthString(m)))
		this._initMonth(picker + next, moment(this._getNextMonthString(m)))
		this._initYear()
		this._attachEventHandlers()
		this._switchToDateView(picker, document.querySelector(picker + '.md-picker__subtitle'))
		this._switchToDateView(picker, document.querySelector(picker + '.md-picker__title'))
		this._switchToDateView(picker, document.querySelector(picker + current + '.md-picker__month'))
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
		if (selector.indexOf(mdDateTimePicker.dialog.date.current.trim()) >= 0) {
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

	/**
	 * [_initYear Adds year elements]
	 *
	 * @method _initYear
	 *
	 * @return {[type]}  [description]
	 */
	_initYear() {
		let years = this._sDialog.years
		let currentYear = parseInt(this._sDialog.date.format('YYYY'), 10)
			//TODO also add event listener to this
		let yearString = ''
			// REVIEW CHANGE THE YEAR according TO THE DIALOG METHODS
		for (let year = 1900; year <= 2100; year++) {
			if (year === currentYear) {
				yearString += '<li id="md-date__currentYear" class="md-picker__li--current">' + year + '</li>'
			} else {
				yearString += '<li>' + year + '</li>'
			}
		}
		// set inner html accordingly
		years.innerHTML = yearString
			// get the current year
		this._sDialog.currentYear = document.getElementById('md-date__currentYear')
	}

	/**
	 * [_switchToDateView Adds event handler for the feature: switch between date and year view in date dialog]
	 *
	 * @method _switchToDateView
	 *
	 * @param  {[type]}          picker [description]
	 * @param  {[type]}          el     [description]
	 *
	 * @return {[type]}          [description]
	 */
	_switchToDateView(picker, el) {
		let me = this
			// attach the view change button
		el.addEventListener('click', function () {
			el.classList.add('md-button--unclickable')
			let viewHolder = me._sDialog.viewHolder
			let years = me._sDialog.years
			let header = me._sDialog.header
			if (mdDateTimePicker.dialog.date.view) {
				viewHolder.classList.add('zoomOut')
				years.classList.remove('md-picker__years--invisible')
				years.classList.add('zoomIn')
					// scroll into the view
				me._sDialog.currentYear.scrollIntoViewIfNeeded()
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
			mdDateTimePicker.dialog.date.view = !mdDateTimePicker.dialog.date.view
			setTimeout((function () {
				el.classList.remove('md-button--unclickable')
			}), 300)
		})
	}

	_addCellClickEvent(el) {
		let me = this
		el.addEventListener('click', function () {
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
		cancel.addEventListener('click', function () {
			me.toggle()
		})
		ok.addEventListener('click', function () {
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

// polyfill for scrollintoviewifneeded
if (!Element.prototype.scrollIntoViewIfNeeded) {
	Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
		centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

		var parent = this.parentNode,
			parentComputedStyle = window.getComputedStyle(parent, null),
			parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
			parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
			overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
			overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
			overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
			overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
			alignWithTop = overTop && !overBottom;

		if ((overTop || overBottom) && centerIfNeeded) {
			parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
		}

		if ((overLeft || overRight) && centerIfNeeded) {
			parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
		}

		if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
			this.scrollIntoView(alignWithTop);
		}
	};
}
