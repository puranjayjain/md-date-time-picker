'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(),
    _dialog = {
	view: !0,
	state: !1,
	cancel: '.md-button--cancel',
	ok: '.md-button--ok'
},
    mdDateTimePicker = function () {
	/**
  * [constructor of the mdDateTimePicker]
  *
  * @method constructor
  *
  * @param  {[string]}    type         [type of dialog] ['date','time']
  * @param  {[string]}    init    = '' [initial value for the dialog date or time, defaults to today]
  * @param  {[string]}    display = '' [the document element where the current date is displayed]
  * @param  {[args]}      args    = '' [additional arguments of the dialog]
  *
  * @return {[type]}    [this component]
  */

	function mdDateTimePicker(type) {
		var init = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1],
		    display = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2],
		    args = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

		_classCallCheck(this, mdDateTimePicker);

		this._type = type;
		this._init = init;
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
  * [upDate updates the current picker's date]
  *
  * @method upDate
  *
  * @param  {[type]} m [moment]
  *
  */


	_createClass(mdDateTimePicker, [{
		key: 'upDate',
		value: function upDate(m) {
			this._sDialog.date = m.clone();
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
			var sDialogEls = ['viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title'],
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
			    title = this._sDialog.title;

			subtitle.innerHTML = m.format('YYYY');
			title.innerHTML = m.format('ddd,') + '<br />' + m.format('MMM D');
			this._initViewHolder(m);
			this._initYear();
			this._attachEventHandlers();
			this._changeMonth();
			this._switchToDateView(subtitle);
			this._switchToDateView(title);
		}
	}, {
		key: '_initViewHolder',
		value: function _initViewHolder(m) {
			var picker = this._sDialog.picker,
			    current = this._sDialog.current,
			    previous = this._sDialog.previous,
			    next = this._sDialog.next;

			this._initMonth(current, m);
			this._initMonth(next, moment(this._getMonth(m, 1)));
			this._initMonth(previous, moment(this._getMonth(m, -1)));
			this._switchToDateView(picker.querySelector('.md-picker__month'));
		}

		/**
   * [initMonth description]
   * @param  {[type]} selector [description]
   * @param  {[type]} m        [description]
   * @return {[type]}          [description]
   */

	}, {
		key: '_initMonth',
		value: function _initMonth(view, m) {
			var displayMonth = m.format('MMMM YYYY');
			view.querySelector('.md-picker__month').innerHTML = displayMonth;
			var todayClass = view.querySelector('.md-picker__today'),
			    selectedClass = view.querySelector('.md-picker__selected'),
			    cells = view.querySelectorAll('.md-picker__tr ' + 'span'),
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
			if (view === this._sDialog.current) {
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
					this._addCellClickEvent(cell, view);
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
			    docfrag = document.createDocumentFragment(),
			    yearString = '';
			//TODO also add event listener to this

			// REVIEW CHANGE THE YEAR according TO THE DIALOG METHODS
			for (var year = 1900; year <= 2100; year++) {
				var li = document.createElement('li');
				li.textContent = year;
				if (year === currentYear) {
					li.id = 'md-date__currentYear';
					li.classList.add('md-picker__li--current');
				}
				// TODO attach event handler here
				docfrag.appendChild(li);
			}
			//empty the years ul
			while (years.lastChild) {
				years.removeChild(years.lastChild);
			}
			// set inner html accordingly
			years.appendChild(docfrag);
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
		value: function _switchToDateView(el) {
			var me = this;
			// attach the view change button
			el.addEventListener('click', function () {
				el.classList.add('md-button--unclickable');
				var viewHolder = me._sDialog.viewHolder,
				    years = me._sDialog.years,
				    header = me._sDialog.header;

				if (mdDateTimePicker.dialog.view) {
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
				mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view;
				setTimeout(function () {
					el.classList.remove('md-button--unclickable');
				}, 300);
			});
		}
	}, {
		key: '_addCellClickEvent',
		value: function _addCellClickEvent(el, view) {
			var me = this;
			el.addEventListener('click', function () {
				var picker = '.md-picker-date ',
				    day = el.innerHTML,
				    monthYear = view.querySelector('.md-picker__month').innerHTML,
				    currentDate = moment(day + ' ' + monthYear, 'D MMMM YYYY'),
				    selected = document.querySelector(picker + '.md-picker__selected');

				if (selected) {
					selected.classList.remove('md-picker__selected');
				}
				el.classList.add('md-picker__selected');

				// update temp date object with the date selected
				me._sDialog.tDate = currentDate;

				document.querySelector(picker + '.md-picker__subtitle').innerHTML = currentDate.format('YYYY');
				document.querySelector(picker + '.md-picker__title').innerHTML = currentDate.format('ddd,') + '<br />' + currentDate.format('MMM D');
			});
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
			});

			right.addEventListener('click', function () {
				moveStep(mLeftClass, me._sDialog.next);
			});

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

				left.classList.add('md-button--unclickable');
				right.classList.add('md-button--unclickable');
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
					me._initViewHolder(me._sDialog.tDate);
				}, 350);
				setTimeout(function () {
					left.classList.remove('md-button--unclickable');
					right.classList.remove('md-button--unclickable');
				}, 400);
			}
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
			});
			ok.addEventListener('click', function () {
				me._sDialog.date = me._sDialog.tDate;
				me.toggle();
			});
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