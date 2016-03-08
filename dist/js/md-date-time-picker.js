'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(),
    _dialog = {
	date: {
		picker: '.md-picker-date ',
		current: '.md-picker__view--current ',
		previous: '.md-picker__view--previous ',
		next: '.md-picker__view--next ',
		view: !0
	},
	time: {},
	common: {
		state: !1,
		cancel: '.md-button--cancel',
		ok: '.md-button--ok'
	}
},
    mdDateTimePicker = function () {
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
		var init = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1],
		    format = arguments.length <= 2 || arguments[2] === undefined ? 'YYYY-MM-DD' : arguments[2],
		    display = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3],
		    args = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];

		_classCallCheck(this, mdDateTimePicker);

		this._type = type;
		this._init = init;
		this._format = format;
		this._display = display;
		this._args = args;

		if (this._type) {
			/**
    * [dialog selected classes has the same structure as dialog but one level down]
    * @type {Object}
    * e.g
    * sDialog = {
    *   picker: 'some-picker-selected'
    * }
    */
			this._sDialog = {};
		}
	}

	/**
  * [toggle toggle the dialog's between the visible and invisible state]
  *
  * @method toggle
  *
  * @return {[type]} [description]
  */


	_createClass(mdDateTimePicker, [{
		key: 'toggle',
		value: function toggle() {
			this._selectDialog();
			// work according to the current state of the dialog
			if (mdDateTimePicker.dialog.state) {
				this._hideDialog();
			} else {
				if (this._type === 'date') {
					this._initDateDialog(this._sDialog.date);
				} else if (this._type === 'time') {
					// this._initTimeDialog(this._sDialog.date)
				}
				this._showDialog();
			}
		}

		/**
   * [dialog getter and setter for _dialog value]
   *
   * @method dialog
   *
   * @return {[type]} [description]
   */

	}, {
		key: '_selectDialog',


		// REVIEW the code below is unnecessary
		// static set dialog(value) {
		// 	mdDateTimePicker.dialog = value;
		// }

		/**
   * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
   * @param  {[moment]} m [date for today or current]
   */
		value: function _selectDialog() {
			// clone elements and add them again to clear events attached to them
			var picker = document.getElementById('md-picker__' + [this._type]),
			    pickerClone = picker.cloneNode(!0);

			picker.parentNode.replaceChild(pickerClone, picker);
			// now do what you normally would do
			this._sDialog.picker = document.getElementById('md-picker__' + [this._type]);
			/**
    * [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
    *
    * @type {Array}
    */
			var sDialogEls = ['viewHolder', 'years', 'header', 'cancel', 'ok'],
			    _iteratorNormalCompletion = !0,
			    _didIteratorError = !1,
			    _iteratorError = undefined;

			try {
				for (var _iterator = sDialogEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
					var sDialogEl = _step.value;

					this._sDialog[sDialogEl] = document.getElementById('md-' + [this._type] + '__' + sDialogEl);
				}
			} catch (err) {
				_didIteratorError = !0;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (!this._sDialog.date) {
				if (this._init) {
					this._sDialog.date = moment(this._init, this._format);
				} else {
					this._sDialog.date = moment();
				}
			}
			this._sDialog.tDate = this._sDialog.date;
		}

		/**
   * [_showDialog make the dialog visible with animation]
   *
   * @method _showDialog
   *
   * @return {[type]}    [description]
   */

	}, {
		key: '_showDialog',
		value: function _showDialog() {
			mdDateTimePicker.dialog.state = !0;
			this._sDialog.picker.classList.remove('md-picker--inactive');
			this._sDialog.picker.classList.add('zoomIn');
		}

		/**
   * [_hideDialog make the dialog invisible with animation]
   *
   * @method _hideDialog
   *
   * @return {[type]}    [description]
   */

	}, {
		key: '_hideDialog',
		value: function _hideDialog() {
			var me = this,
			    years = this._sDialog.years,
			    header = this._sDialog.header,
			    viewHolder = this._sDialog.viewHolder;

			mdDateTimePicker.dialog.state = !1;
			mdDateTimePicker.dialog[this._type].view = !0;
			this._sDialog.picker.classList.add('zoomOut');
			// reset classes
			years.classList.remove('zoomIn', 'zoomOut');
			years.classList.add('md-picker__years--invisible');
			header.classList.remove('md-picker__header--invert');
			viewHolder.classList.remove('zoomOut');
			setTimeout(function () {
				me._sDialog.picker.classList.remove('zoomOut', 'zoomIn');
				me._sDialog.picker.classList.add('md-picker--inactive');
			}, 300);
		}

		/**
   * [initDateDialog description]
   * @param  {[type]} m [description]
   * @return {[type]}   [description]
   */

		//  TODO apply upper cap and lower cap to this function as well

	}, {
		key: '_initDateDialog',
		value: function _initDateDialog(m) {
			var picker = mdDateTimePicker.dialog.date.picker,
			    current = mdDateTimePicker.dialog.date.current,
			    previous = mdDateTimePicker.dialog.date.previous,
			    next = mdDateTimePicker.dialog.date.next;

			document.querySelector(picker + '.md-picker__subtitle').innerHTML = m.format('YYYY');
			document.querySelector(picker + '.md-picker__title').innerHTML = m.format('ddd, MMM D');
			this._initMonth(picker + current, m);
			this._initMonth(picker + previous, moment(this._getPreviousMonthString(m)));
			this._initMonth(picker + next, moment(this._getNextMonthString(m)));
			this._initYear();
			this._attachEventHandlers();
			this._switchToDateView(picker, document.querySelector(picker + '.md-picker__subtitle'));
			this._switchToDateView(picker, document.querySelector(picker + '.md-picker__title'));
			this._switchToDateView(picker, document.querySelector(picker + current + '.md-picker__month'));
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
			var todayClass = document.querySelector(selector + '.md-picker__today'),
			    selectedClass = document.querySelector(selector + '.md-picker__selected'),
			    cells = document.querySelectorAll(selector + '.md-picker__tr ' + 'span'),
			    firstDayOfMonth = parseInt(moment(m).date(1).day(), 10),
			    today = -1,
			    selected = -1,
			    lastDayoFMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1;

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
			if (selector.indexOf(mdDateTimePicker.dialog.date.current.trim()) >= 0) {
				selected = parseInt(moment(m).format('D'), 10);
				selected += firstDayOfMonth - 1;
			}
			for (var i = 0; i < cells.length; i++) {
				var cell = cells[i],
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

		/**
   * [_initYear Adds year elements]
   *
   * @method _initYear
   *
   * @return {[type]}  [description]
   */

	}, {
		key: '_initYear',
		value: function _initYear() {
			var years = this._sDialog.years,
			    currentYear = parseInt(this._sDialog.date.format('YYYY'), 10),
			    yearString = '';
			//TODO also add event listener to this

			// REVIEW CHANGE THE YEAR according TO THE DIALOG METHODS
			for (var year = 1900; year <= 2100; year++) {
				if (year === currentYear) {
					yearString += '<li id="md-date__currentYear" class="md-picker__li--current">' + year + '</li>';
				} else {
					yearString += '<li>' + year + '</li>';
				}
			}
			// set inner html accordingly
			years.innerHTML = yearString;
			// get the current year
			this._sDialog.currentYear = document.getElementById('md-date__currentYear');
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

	}, {
		key: '_switchToDateView',
		value: function _switchToDateView(picker, el) {
			var me = this;
			// attach the view change button
			el.addEventListener('click', function () {
				el.classList.add('md-button--unclickable');
				var viewHolder = me._sDialog.viewHolder,
				    years = me._sDialog.years,
				    header = me._sDialog.header;

				if (mdDateTimePicker.dialog.date.view) {
					viewHolder.classList.add('zoomOut');
					years.classList.remove('md-picker__years--invisible');
					years.classList.add('zoomIn');
					// scroll into the view
					me._sDialog.currentYear.scrollIntoViewIfNeeded();
				} else {
					years.classList.add('zoomOut');
					viewHolder.classList.remove('zoomOut');
					viewHolder.classList.add('zoomIn');
					setTimeout(function () {
						years.classList.remove('zoomIn', 'zoomOut');
						years.classList.add('md-picker__years--invisible');
						viewHolder.classList.remove('zoomIn');
					}, 300);
				}
				header.classList.toggle('md-picker__header--invert');
				mdDateTimePicker.dialog.date.view = !mdDateTimePicker.dialog.date.view;
				setTimeout(function () {
					el.classList.remove('md-button--unclickable');
				}, 300);
			});
		}
	}, {
		key: '_addCellClickEvent',
		value: function _addCellClickEvent(el) {
			var me = this;
			el.addEventListener('click', function () {
				var picker = '.md-picker-date ',
				    day = el.innerHTML,
				    monthYear = document.querySelector(picker + '.md-picker__view--current .md-picker__month').innerHTML,
				    currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY'),
				    selected = document.querySelector(picker + '.md-picker__selected');

				if (selected) {
					selected.classList.remove('md-picker__selected');
				}
				el.classList.add('md-picker__selected');

				// update temp date object with the date selected
				me._sDialog.tDate = currentDate;

				document.querySelector(picker + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
				document.querySelector(picker + '.md-picker__title').innerHTML = currentDate.format('ddd, MMM D');
			});
		}

		/**
   * [_attachEventHandlers attach event handlers for actions to the date or time picker dialog]
   *
   * @method _attachEventHandlers
   *
   */

	}, {
		key: '_attachEventHandlers',
		value: function _attachEventHandlers() {
			var me = this,
			    cancel = this._sDialog.cancel,
			    ok = this._sDialog.ok;

			cancel.addEventListener('click', function () {
				me.toggle();
			});
			ok.addEventListener('click', function () {
				me._sDialog.date = me._sDialog.tDate;
				me.toggle();
			});
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

	}, {
		key: '_getPreviousMonthString',
		value: function _getPreviousMonthString(moment) {
			var m = void 0;
			m = moment.clone();
			return m.subtract(1, 'month');
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

	}, {
		key: '_getNextMonthString',
		value: function _getNextMonthString(moment) {
			var m = void 0;
			m = moment.clone();
			return m.add(1, 'month');
		}
	}], [{
		key: 'dialog',
		get: function get() {
			return _dialog;
		}
	}]);

	return mdDateTimePicker;
}(); /**
      * @package md-date-time-picker
      * @version [0.0.1]
      * @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
      * @license MIT
      * @website no website right now
      */

/**
 * All declarations starting with _ are considered @private
 */


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// polyfill for scrollintoviewifneeded
if (!Element.prototype.scrollIntoViewIfNeeded) {
	Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
		centerIfNeeded = arguments.length === 0 ? !0 : !!centerIfNeeded;

		var parent = this.parentNode,
		    parentComputedStyle = window.getComputedStyle(parent, null),
		    parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
		    parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
		    overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
		    overBottom = this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth > parent.scrollTop + parent.clientHeight,
		    overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
		    overRight = this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth > parent.scrollLeft + parent.clientWidth,
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