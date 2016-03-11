'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(),
    _dialog = {
	view: !0,
	state: !1
},
    mdDateTimePicker = function () {
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
  * @param	 {[Boolean]}    mode  = false [this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default 12 hour mode - false]
  *
  * @return {[Object]}    [mdDateTimePicker]
  */

	function mdDateTimePicker(type) {
		var init = arguments.length <= 1 || arguments[1] === undefined ? moment() : arguments[1],
		    past = arguments.length <= 2 || arguments[2] === undefined ? moment().subtract(21, 'years') : arguments[2],
		    future = arguments.length <= 3 || arguments[3] === undefined ? init : arguments[3],
		    fullMode = arguments.length <= 4 || arguments[4] === undefined ? !1 : arguments[4];

		_classCallCheck(this, mdDateTimePicker);

		this._type = type;
		this._init = init;
		this._past = past;
		this._future = future;
		this._fullMode = fullMode;

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

	/**
  * [upDate to get or set the current picker's moment]
  *
  * @method date
  *
  * @param  {[moment]} m
  *
  */


	_createClass(mdDateTimePicker, [{
		key: 'date',
		value: function date() {
			var m = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			if (m === '') {
				return this._init;
			} else {
				this._init = m;
			}
		}

		/**
   * [toggle toggle the dialog's between the visible and invisible state]
   *
   * @method toggle
   *
   */

	}, {
		key: 'toggle',
		value: function toggle() {
			this._selectDialog();
			// work according to the current state of the dialog
			if (mdDateTimePicker.dialog.state) {
				this._hideDialog();
			} else {
				if (this._type === 'date') {
					this._initDateDialog(this._init);
				} else if (this._type === 'time') {
					// this._initTimeDialog(this._init)
				}
				this._showDialog();
			}
		}

		/**
   * [dialog getter and setter for _dialog value]
   *
   * @method dialog
   *
   * @return {[_dialog]} [static or prototype value for the _dialog of the component]
   */

	}, {
		key: '_selectDialog',


		// REVIEW the code below is unnecessary or necessary
		// static set dialog(value) {
		// 	mdDateTimePicker.dialog = value
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
			var sDialogEls = ['viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth'],
			    _iteratorNormalCompletion = !0,
			    _didIteratorError = !1,
			    _iteratorError = undefined;

			try {
				for (var _iterator = sDialogEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
					var sDialogEl = _step.value;

					this._sDialog[sDialogEl] = document.getElementById('md-' + this._type + '__' + sDialogEl);
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

			this._sDialog.tDate = this._init.clone();
			this._sDialog.sDate = this._init.clone();
		}

		/**
   * [_showDialog make the dialog visible with animation]
   *
   * @method _showDialog
   *
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
   */

	}, {
		key: '_hideDialog',
		value: function _hideDialog() {
			var me = this,
			    years = this._sDialog.years,
			    header = this._sDialog.header,
			    viewHolder = this._sDialog.viewHolder;

			mdDateTimePicker.dialog.state = !1;
			mdDateTimePicker.dialog.view = !0;
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
			var subtitle = this._sDialog.subtitle,
			    title = this._sDialog.title,
			    titleDay = this._sDialog.titleDay,
			    titleMonth = this._sDialog.titleMonth;

			subtitle.innerHTML = m.format('YYYY');
			titleDay.innerHTML = m.format('ddd, ');
			titleMonth.innerHTML = m.format('MMM D');
			this._initYear();
			this._initViewHolder();
			this._attachEventHandlers();
			this._changeMonth();
			this._switchToDateView(subtitle);
			this._switchToDateView(title);
		}
	}, {
		key: '_initViewHolder',
		value: function _initViewHolder() {
			var m = this._sDialog.tDate,
			    picker = this._sDialog.picker,
			    current = this._sDialog.current,
			    previous = this._sDialog.previous,
			    next = this._sDialog.next,
			    past = this._past,
			    future = this._future;

			if (m.isBefore(past, 'month')) {
				m = past.clone();
			}
			if (m.isAfter(future, 'month')) {
				m = future.clone();
			}
			this._sDialog.tDate = m;
			this._initMonth(current, m);
			this._initMonth(next, moment(this._getMonth(m, 1)));
			this._initMonth(previous, moment(this._getMonth(m, -1)));
			this._switchToDateView(current.querySelector('.md-picker__month'));
			this._toMoveMonth();
		}
	}, {
		key: '_initMonth',
		value: function _initMonth(view, m) {
			var displayMonth = m.format('MMMM YYYY');
			view.querySelector('.md-picker__month').innerHTML = displayMonth;
			var docfrag = document.createDocumentFragment(),
			    tr = view.querySelector('.md-picker__tr'),
			    firstDayOfMonth = parseInt(moment(m).date(1).day(), 10),
			    today = -1,
			    selected = -1,
			    lastDayOfMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1,
			    past = firstDayOfMonth,
			    future = lastDayOfMonth;

			if (moment().isSame(m, 'month')) {
				today = parseInt(moment().format('D'), 10);
				today += firstDayOfMonth - 1;
			}
			if (this._past.isSame(m, 'month')) {
				past = parseInt(this._past.format('D'), 10);
				past += firstDayOfMonth - 1;
			}
			if (this._future.isSame(m, 'month')) {
				future = parseInt(this._future.format('D'), 10);
				future += firstDayOfMonth - 1;
			}
			if (this._sDialog.sDate.isSame(m, 'month')) {
				selected = parseInt(moment(m).format('D'), 10);
				selected += firstDayOfMonth - 1;
			}
			for (var i = 0; i < 42; i++) {
				// create cell
				var cell = document.createElement('span'),
				    currentDay = i - firstDayOfMonth + 1;

				if (i >= firstDayOfMonth && i <= lastDayOfMonth) {
					if (i > future || i < past) {
						cell.classList.add('md-picker__cell--disabled');
					} else {
						cell.classList.add('md-picker__cell');
					}
					cell.innerHTML = currentDay;
				}
				if (today === i) {
					cell.classList.add('md-picker__cell--today');
				}
				if (selected === i) {
					cell.classList.add('md-picker__cell--selected');
				}
				docfrag.appendChild(cell);
			}
			//empty the tr
			while (tr.lastChild) {
				tr.removeChild(tr.lastChild);
			}
			// set inner html accordingly
			tr.appendChild(docfrag);
			this._addCellClickEvent(tr);
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
			    currentYear = this._sDialog.tDate.year(),
			    docfrag = document.createDocumentFragment(),
			    past = this._past.year(),
			    future = this._future.year();

			for (var year = past; year <= future; year++) {
				var li = document.createElement('li');
				li.textContent = year;
				if (year === currentYear) {
					li.id = 'md-date__currentYear';
					li.classList.add('md-picker__li--current');
				}
				docfrag.appendChild(li);
			}
			//empty the years ul
			while (years.lastChild) {
				years.removeChild(years.lastChild);
			}
			// set inner html accordingly
			years.appendChild(docfrag);
			// attach event handler to the ul to get the benefit of event delegation
			this._changeYear(years);
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

	}, {
		key: '_switchToDateView',
		value: function _switchToDateView(el) {
			var me = this;
			// attach the view change button
			el.addEventListener('click', function () {
				me._switchToDateViewFunction(el, me);
			}, !1);
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

	}, {
		key: '_switchToDateViewFunction',
		value: function _switchToDateViewFunction(el, me) {
			el.setAttribute('disabled', '');
			var viewHolder = me._sDialog.viewHolder,
			    years = me._sDialog.years,
			    header = me._sDialog.header,
			    currentYear = document.getElementById('md-date__currentYear');

			if (mdDateTimePicker.dialog.view) {
				viewHolder.classList.add('zoomOut');
				years.classList.remove('md-picker__years--invisible');
				years.classList.add('zoomIn');
				// scroll into the view
				currentYear.scrollIntoViewIfNeeded();
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
			mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view;
			setTimeout(function () {
				el.removeAttribute('disabled');
			}, 300);
		}
	}, {
		key: '_addCellClickEvent',
		value: function _addCellClickEvent(el) {
			var me = this;
			el.addEventListener('click', function (e) {
				if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('md-picker__cell')) {
					var picker = me._sDialog.picker,
					    day = e.target.innerHTML,
					    currentDate = me._sDialog.tDate.date(day),
					    selected = picker.querySelector('.md-picker__cell--selected'),
					    title = me._sDialog.title,
					    subtitle = me._sDialog.subtitle,
					    titleDay = me._sDialog.titleDay,
					    titleMonth = me._sDialog.titleMonth;

					if (selected) {
						selected.classList.remove('md-picker__cell--selected');
					}
					e.target.classList.add('md-picker__cell--selected');

					// update temp date object with the date selected
					me._sDialog.sDate = currentDate.clone();
					subtitle.innerHTML = currentDate.year();
					titleDay.innerHTML = currentDate.format('ddd, ');
					titleMonth.innerHTML = currentDate.format('MMM D');
				}
			}, !1);
		}
	}, {
		key: '_updateDialog',
		value: function _updateDialog() {
			this._initViewHolder();
		}
	}, {
		key: '_toMoveMonth',
		value: function _toMoveMonth() {
			var m = this._sDialog.tDate,
			    left = this._sDialog.left,
			    right = this._sDialog.right,
			    past = this._past,
			    future = this._future;

			left.removeAttribute('disabled');
			right.removeAttribute('disabled');
			left.classList.remove('md-button--disabled');
			right.classList.remove('md-button--disabled');
			if (m.isSame(past, 'month')) {
				left.setAttribute('disabled', '');
				left.classList.add('md-button--disabled');
			}
			if (m.isSame(future, 'month')) {
				right.setAttribute('disabled', '');
				right.classList.add('md-button--disabled');
			}
		}
	}, {
		key: '_changeMonth',
		value: function _changeMonth() {
			var me = this,
			    left = this._sDialog.left,
			    right = this._sDialog.right,
			    mLeftClass = 'md-picker__view--left',
			    mRightClass = 'md-picker__view--right',
			    pause = 'md-picker__view--pause';

			left.addEventListener('click', function () {
				moveStep(mRightClass, me._sDialog.previous);
			}, !1);

			right.addEventListener('click', function () {
				moveStep(mLeftClass, me._sDialog.next);
			}, !1);

			function moveStep(aClass, to) {
				/**
     * [stepBack to know if the to step is going back or not]
     *
     * @type {Boolean}
     */
				var stepBack = !1,
				    next = me._sDialog.next,
				    current = me._sDialog.current,
				    previous = me._sDialog.previous;

				left.setAttribute('disabled', '');
				right.setAttribute('disabled', '');
				current.classList.add(aClass);
				previous.classList.add(aClass);
				next.classList.add(aClass);
				var clone = to.cloneNode(!0),
				    del = void 0;

				if (to === next) {
					del = previous;
					current.parentNode.appendChild(clone);
					next.id = current.id;
					current.id = previous.id;
					previous = current;
					current = next;
					next = clone;
				} else {
					stepBack = !0;
					del = next;
					previous.id = current.id;
					current.id = next.id;
					next = current;
					current = previous;
				}
				setTimeout(function () {
					if (to === previous) {
						current.parentNode.insertBefore(clone, current);
						previous = clone;
					}
					// update real values to match these values
					me._sDialog.next = next;
					me._sDialog.current = current;
					me._sDialog.previous = previous;
					current.classList.add(pause);
					next.classList.add(pause);
					previous.classList.add(pause);
					current.classList.remove(aClass);
					next.classList.remove(aClass);
					previous.classList.remove(aClass);
					del.parentNode.removeChild(del);
				}, 300);
				// REVIEW replace below code with requestAnimationFrame
				setTimeout(function () {
					current.classList.remove(pause);
					next.classList.remove(pause);
					previous.classList.remove(pause);
					if (stepBack) {
						me._sDialog.tDate = me._getMonth(me._sDialog.tDate, -1);
					} else {
						me._sDialog.tDate = me._getMonth(me._sDialog.tDate, 1);
					}
					me._initViewHolder();
				}, 350);
				setTimeout(function () {
					if (!left.classList.contains('md-button--disabled')) {
						left.removeAttribute('disabled');
					}
					if (!right.classList.contains('md-button--disabled')) {
						right.removeAttribute('disabled');
					}
				}, 400);
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

	}, {
		key: '_changeYear',
		value: function _changeYear(el) {
			var me = this;
			el.addEventListener('click', function (e) {
				if (e.target && e.target.nodeName == 'LI') {
					var selected = document.getElementById('md-date__currentYear');
					// clear previous selected
					selected.id = '';
					selected.classList.remove('md-picker__li--current');
					// add the properties to the newer one
					e.target.id = 'md-date__currentYear';
					e.target.classList.add('md-picker__li--current');
					// switch view
					me._switchToDateViewFunction(el, me);
					// set the tdate to it
					me._sDialog.tDate.year(parseInt(e.target.innerHTML, 10));
					// update the dialog
					me._updateDialog();
				}
			}, !1);
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
			    ok = this._sDialog.ok,
			    cancel = this._sDialog.cancel;

			cancel.addEventListener('click', function () {
				me.toggle();
			}, !1);
			ok.addEventListener('click', function () {
				me._init = me._sDialog.sDate;
				me.toggle();
			}, !1);
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

	}, {
		key: '_getMonth',
		value: function _getMonth(moment, count) {
			var m = void 0;
			m = moment.clone();
			if (count > 0) {
				return m.add(Math.abs(count), 'month');
			} else {
				return m.subtract(Math.abs(count), 'month');
			}
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
      * @website puranjayjain.github.io/md-date-time-picker/demo.html
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
		    parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'), 10),
		    parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'), 10),
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