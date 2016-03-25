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
 * @param  {[string]}   type = 'date' or 'time 									[type of dialog]
 * @param  {[moment]}   init 																		[initial value for the dialog date or time, defaults to today] [@default = today]
 * @param  {[moment]}   past 																		[the past moment till which the calendar shall render] [@default = exactly 21 Years ago from init]
 * @param  {[moment]}   future = moment() 												[the future moment till which the calendar shall render] [@default = init]
 * @param	{[Boolean]}  mode 																		[this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default = false]
 * @param  {[string]}    orientation = 'LANDSCAPE' or 'PORTRAIT' [force the orientation of the picker @default = 'LANDSCAPE']
 *
 * @return {[Object]}    																				[mdDateTimePicker]
 */

	function mdDateTimePicker(_ref) {
		var type = _ref.type,
		    _ref$init = _ref.init,
		    init = _ref$init === undefined ? moment() : _ref$init,
		    _ref$past = _ref.past,
		    past = _ref$past === undefined ? moment().subtract(21, 'years') : _ref$past,
		    _ref$future = _ref.future,
		    future = _ref$future === undefined ? init : _ref$future,
		    _ref$mode = _ref.mode,
		    mode = _ref$mode === undefined ? !1 : _ref$mode,
		    _ref$orientation = _ref.orientation,
		    orientation = _ref$orientation === undefined ? 'LANDSCAPE' : _ref$orientation;

		_classCallCheck(this, mdDateTimePicker);

		this._type = type;
		this._init = init;
		this._past = past;
		this._future = future;
		this._mode = mode;
		this._orientation = orientation;

		/**
  * [dialog selected classes have the same structure as dialog but one level down]
  * @type {Object}
  * e.g
  * sDialog = {
  *   picker: 'some-picker-selected'
  * }
  */
		this._sDialog = {};
		// attach the dialog if not present
		if (!document.getElementById('mddtp-picker__' + this._type)) {
			this._buildDialog();
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


	_createClass(mdDateTimePicker, [{
		key: 'time',
		value: function time() {
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
					this._initTimeDialog(this._init);
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

		value: function _selectDialog() {
			// now do what you normally would do
			this._sDialog.picker = document.getElementById('mddtp-picker__' + [this._type]);
			/**
   * [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
   *
   * @type {Array}
   */
			var sDialogEls = ['viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth', 'AM', 'PM', 'needle', 'hourView', 'minuteView', 'hour', 'minute', 'fakeNeedle', 'circularHolder', 'circle'],
			    i = sDialogEls.length;

			while (i--) {
				this._sDialog[sDialogEls[i]] = document.getElementById('mddtp-' + this._type + '__' + sDialogEls[i]);
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
			var me = this;
			mdDateTimePicker.dialog.state = !0;
			this._sDialog.picker.classList.remove('mddtp-picker--inactive');
			this._sDialog.picker.classList.add('zoomIn');
			setTimeout(function () {
				me._sDialog.picker.classList.remove('zoomIn');
			}, 300);
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
			    title = me._sDialog.title,
			    subtitle = me._sDialog.subtitle,
			    viewHolder = this._sDialog.viewHolder,
			    AM = this._sDialog.AM,
			    PM = this._sDialog.PM,
			    minute = this._sDialog.minute,
			    hour = this._sDialog.hour,
			    minuteView = this._sDialog.minuteView,
			    hourView = this._sDialog.hourView,
			    picker = this._sDialog.picker,
			    needle = this._sDialog.needle,
			    active = 'mddtp-picker__color--active',
			    inactive = 'mddtp-picker--inactive',
			    invisible = 'mddtp-picker__years--invisible',
			    zoomIn = 'zoomIn',
			    zoomOut = 'zoomOut',
			    hidden = 'mddtp-picker__circularView--hidden',
			    selection = 'mddtp-picker__selection';

			mdDateTimePicker.dialog.state = !1;
			mdDateTimePicker.dialog.view = !0;
			this._sDialog.picker.classList.add(zoomOut);
			// reset classes
			if (this._type === 'date') {
				years.classList.remove(zoomIn, zoomOut);
				years.classList.add(invisible);
				title.classList.remove(active);
				subtitle.classList.add(active);
				viewHolder.classList.remove(zoomOut);
			} else {
				AM.classList.remove();
				PM.classList.remove(active);
				minute.classList.remove(active);
				hour.classList.add(active);
				minuteView.classList.add(hidden);
				hourView.classList.remove(hidden);
				subtitle.setAttribute('style', 'display: none');
				needle.className = '';
				needle.classList.add(selection);
			}
			setTimeout(function () {
				me._sDialog.picker.classList.remove(zoomOut);
				me._sDialog.picker.classList.add(inactive);
				// clone elements and add them again to clear events attached to them
				var pickerClone = picker.cloneNode(!0);
				picker.parentNode.replaceChild(pickerClone, picker);
			}, 300);
		}

		/**
  * [_buildDialog make the dialog elements and add them to the document]
  *
  * @method _buildDateDialog
  *
  */

	}, {
		key: '_buildDialog',
		value: function _buildDialog() {
			var type = this._type,
			    docfrag = document.createDocumentFragment(),
			    container = document.createElement('div'),
			    header = document.createElement('div'),
			    body = document.createElement('div'),
			    action = document.createElement('div'),
			    cancel = document.createElement('button'),
			    ok = document.createElement('button');
			// outer most container of the picker

			// header container of the picker

			// body container of the picker

			// action elements container

			// ... add properties to them
			container.id = 'mddtp-picker__' + type;
			container.classList.add('mddtp-picker', 'mddtp-picker-' + type, 'mddtp-picker--inactive', 'animated');
			this._addId(header, 'header');
			this._addClass(header, 'header');
			// add header to container
			container.appendChild(header);
			this._addClass(body, 'body');
			body.appendChild(action);
			// add body to container
			container.appendChild(body);
			// add stuff to header and body according to dialog type
			if (this._type === 'date') {
				var subtitle = document.createElement('h4'),
				    title = document.createElement('h2'),
				    titleDay = document.createElement('div'),
				    titleMonth = document.createElement('div'),
				    viewHolder = document.createElement('div'),
				    views = document.createElement('ul'),
				    previous = document.createElement('li'),
				    current = document.createElement('li'),
				    next = document.createElement('li'),
				    left = document.createElement('button'),
				    right = document.createElement('button'),
				    years = document.createElement('ul');

				// inside header
				// adding properties to them
				this._addId(subtitle, 'subtitle');
				this._addClass(subtitle, 'subtitle', ['mddtp-picker__color--active']);
				this._addId(title, 'title');
				this._addClass(title, 'title');
				this._addId(titleDay, 'titleDay');
				this._addId(titleMonth, 'titleMonth');
				// add title stuff to it
				title.appendChild(titleDay);
				title.appendChild(titleMonth);
				// add them to header
				header.appendChild(subtitle);
				header.appendChild(title);
				// inside body
				// inside viewHolder
				this._addId(viewHolder, 'viewHolder');
				this._addClass(viewHolder, 'viewHolder', ['animated']);
				this._addClass(views, 'views');
				this._addId(previous, 'previous');
				previous.classList.add('mddtp-picker__view');
				this._addId(current, 'current');
				current.classList.add('mddtp-picker__view');
				this._addId(next, 'next');
				next.classList.add('mddtp-picker__view');
				// fill the views
				this._addView(previous);
				this._addView(current);
				this._addView(next);
				// add them
				viewHolder.appendChild(views);
				views.appendChild(previous);
				views.appendChild(current);
				views.appendChild(next);
				// inside body again
				this._addId(left, 'left');
				left.classList.add('mddtp-button');
				this._addClass(left, 'left');
				left.setAttribute('type', 'button');
				this._addId(right, 'right');
				right.classList.add('mddtp-button');
				this._addClass(right, 'right');
				right.setAttribute('type', 'button');
				this._addId(years, 'years');
				this._addClass(years, 'years', ['mddtp-picker__years--invisible', 'animated']);
				// add them to body
				body.appendChild(viewHolder);
				body.appendChild(left);
				body.appendChild(right);
				body.appendChild(years);
			} else {
				var _title = document.createElement('h2'),
				    hour = document.createElement('span'),
				    span = document.createElement('span'),
				    minute = document.createElement('span'),
				    _subtitle = document.createElement('div'),
				    AM = document.createElement('div'),
				    PM = document.createElement('div'),
				    circularHolder = document.createElement('div'),
				    needle = document.createElement('div'),
				    dot = document.createElement('span'),
				    line = document.createElement('span'),
				    circle = document.createElement('span'),
				    minuteView = document.createElement('div'),
				    fakeNeedle = document.createElement('div'),
				    hourView = document.createElement('div');

				// add properties to them
				// inside header
				this._addId(_title, 'title');
				this._addClass(_title, 'title');
				this._addId(hour, 'hour');
				hour.classList.add('mddtp-picker__color--active');
				span.textContent = ':';
				this._addId(minute, 'minute');
				this._addId(_subtitle, 'subtitle');
				this._addClass(_subtitle, 'subtitle');
				_subtitle.setAttribute('style', 'display: none');
				this._addId(AM, 'AM');
				AM.textContent = 'AM';
				this._addId(PM, 'PM');
				PM.textContent = 'PM';
				// add them to title and subtitle
				_title.appendChild(hour);
				_title.appendChild(span);
				_title.appendChild(minute);
				_subtitle.appendChild(AM);
				_subtitle.appendChild(PM);
				// add them to header
				header.appendChild(_title);
				header.appendChild(_subtitle);
				// inside body
				this._addId(circularHolder, 'circularHolder');
				this._addClass(circularHolder, 'circularHolder');
				this._addId(needle, 'needle');
				needle.classList.add('mddtp-picker__selection');
				this._addClass(dot, 'dot');
				this._addClass(line, 'line');
				this._addId(circle, 'circle');
				this._addClass(circle, 'circle');
				this._addId(minuteView, 'minuteView');
				minuteView.classList.add('mddtp-picker__circularView', 'mddtp-picker__circularView--hidden');
				this._addId(fakeNeedle, 'fakeNeedle');
				fakeNeedle.classList.add('mddtp-picker__circle--fake');
				this._addId(hourView, 'hourView');
				hourView.classList.add('mddtp-picker__circularView');
				// add them to needle
				needle.appendChild(dot);
				needle.appendChild(line);
				needle.appendChild(circle);
				// add them to circularHolder
				circularHolder.appendChild(needle);
				circularHolder.appendChild(minuteView);
				circularHolder.appendChild(fakeNeedle);
				circularHolder.appendChild(hourView);
				// add them to body
				body.appendChild(circularHolder);
			}
			action.classList.add('mddtp-picker__action');
			this._addId(cancel, 'cancel');
			cancel.classList.add('mddtp-button');
			cancel.setAttribute('type', 'button');
			cancel.textContent = 'cancel';
			this._addId(ok, 'ok');
			ok.classList.add('mddtp-button');
			ok.setAttribute('type', 'button');
			ok.textContent = 'ok';
			// add actions
			action.appendChild(cancel);
			action.appendChild(ok);
			// add actions to body
			body.appendChild(action);
			docfrag.appendChild(container);
			// add the container to the end of body
			document.getElementsByTagName('body').item(0).appendChild(docfrag);
		}

		/**
  * [_initTimeDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
  * @param  {[moment]} m [date for today or current]
  */

	}, {
		key: '_initTimeDialog',
		value: function _initTimeDialog(m) {
			var hour = this._sDialog.hour,
			    minute = this._sDialog.minute,
			    subtitle = this._sDialog.subtitle;

			// switch according to 12 hour or 24 hour mode
			if (this._mode) {
				// REVIEW 24 HOUR MODE
				hour.innerHTML = m.format('H');
			} else {
				hour.innerHTML = m.format('h');
				this._sDialog[m.format('A')].classList.add('mddtp-picker__color--active');
				subtitle.removeAttribute('style');
			}
			minute.innerHTML = m.format('mm');
			this._initHour();
			this._initMinute();
			this._attachEventHandlers();
			this._changeM();
			this._dragDial();
			this._switchToView(hour);
			this._switchToView(minute);
		}
	}, {
		key: '_initHour',
		value: function _initHour() {
			var hourView = this._sDialog.hourView,
			    needle = this._sDialog.needle,
			    docfrag = document.createDocumentFragment();

			if (this._mode) {
				// REVIEW 24 HOUR MODE
				var hourNow = parseInt(this._sDialog.tDate.format('H'), 10);
			} else {
				var _hourNow = parseInt(this._sDialog.tDate.format('h'), 10);
				for (var i = 1, j = 5; i <= 12; i++, j += 5) {
					var div = document.createElement('div'),
					    span = document.createElement('span');

					div.classList.add('mddtp-picker__cell');
					span.textContent = i;
					div.classList.add('mddtp-picker__cell--rotate-' + j);
					if (_hourNow === i) {
						div.classList.add('mddtp-picker__cell--selected');
						needle.classList.add('mddtp-picker__cell--rotate-' + j);
					}
					div.appendChild(span);
					docfrag.appendChild(div);
				}
			}
			//empty the hours
			while (hourView.lastChild) {
				hourView.removeChild(hourView.lastChild);
			}
			// set inner html accordingly
			hourView.appendChild(docfrag);
		}
	}, {
		key: '_initMinute',
		value: function _initMinute() {
			var minuteView = this._sDialog.minuteView,
			    minuteNow = parseInt(this._sDialog.tDate.format('m'), 10),
			    selected = 'mddtp-picker__cell--selected',
			    rotate = 'mddtp-picker__cell--rotate-',
			    cell = 'mddtp-picker__cell',
			    docfrag = document.createDocumentFragment();

			for (var i = 5, j = 5; i <= 60; i += 5, j += 5) {
				var div = document.createElement('div'),
				    span = document.createElement('span');

				div.classList.add(cell);
				if (i === 60) {
					span.textContent = this._numWithZero(0);
				} else {
					span.textContent = this._numWithZero(i);
				}
				if (minuteNow === 0) {
					minuteNow = 60;
				}
				div.classList.add(rotate + j);
				// (minuteNow === 1 && i === 60) for corner case highlight 00 at 01
				if (minuteNow === i || minuteNow - 1 === i || minuteNow + 1 === i || minuteNow === 1 && i === 60) {
					div.classList.add(selected);
				}
				div.appendChild(span);
				docfrag.appendChild(div);
			}
			//empty the hours
			while (minuteView.lastChild) {
				minuteView.removeChild(minuteView.lastChild);
			}
			// set inner html accordingly
			minuteView.appendChild(docfrag);
		}

		/**
  * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
  * @param  {[moment]} m [date for today or current]
  */

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
			this._switchToView(subtitle);
			this._switchToView(title);
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
			this._switchToView(current.querySelector('.mddtp-picker__month'));
			this._toMoveMonth();
		}
	}, {
		key: '_initMonth',
		value: function _initMonth(view, m) {
			var displayMonth = m.format('MMMM YYYY');
			view.querySelector('.mddtp-picker__month').innerHTML = displayMonth;
			var docfrag = document.createDocumentFragment(),
			    tr = view.querySelector('.mddtp-picker__tr'),
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
						cell.classList.add('mddtp-picker__cell--disabled');
					} else {
						cell.classList.add('mddtp-picker__cell');
					}
					cell.innerHTML = currentDay;
				}
				if (today === i) {
					cell.classList.add('mddtp-picker__cell--today');
				}
				if (selected === i) {
					cell.classList.add('mddtp-picker__cell--selected');
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
					li.id = 'mddtp-date__currentYear';
					li.classList.add('mddtp-picker__li--current');
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
  * [_switchToView Adds event handler for the feature: switch between date and year view in date dialog]
  *
  * @method _switchToView
  *
  * @param  {[type]} picker [description]
  *
  * @param  {[type]} el     [description]
  *
  */

	}, {
		key: '_switchToView',
		value: function _switchToView(el) {
			var me = this;
			// attach the view change button
			if (this._type == 'date') {
				el.addEventListener('click', function () {
					me._switchToDateView(el, me);
				});
			} else {
				el.addEventListener('click', function () {
					me._switchToTimeView(el, me);
				});
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

	}, {
		key: '_switchToTimeView',
		value: function _switchToTimeView(el, me) {
			var hourView = me._sDialog.hourView,
			    minuteView = me._sDialog.minuteView,
			    hour = me._sDialog.hour,
			    minute = me._sDialog.minute,
			    activeClass = 'mddtp-picker__color--active',
			    hidden = 'mddtp-picker__circularView--hidden',
			    selection = 'mddtp-picker__selection',
			    needle = me._sDialog.needle,
			    circularHolder = me._sDialog.circularHolder,
			    circle = me._sDialog.circle,
			    fakeNeedle = me._sDialog.fakeNeedle,
			    spoke = 60,
			    value = void 0;

			// toggle view classes
			hourView.classList.toggle(hidden);
			minuteView.classList.toggle(hidden);
			hour.classList.toggle(activeClass);
			minute.classList.toggle(activeClass);
			// move the needle to correct position
			needle.className = '';
			needle.classList.add(selection);
			if (mdDateTimePicker.dialog.view) {
				value = me._sDialog.sDate.format('m');
				// move the fakeNeedle to correct position
				setTimeout(function () {
					var hOffset = circularHolder.getBoundingClientRect(),
					    cOffset = circle.getBoundingClientRect();

					fakeNeedle.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px');
				}, 300);
			} else {
				if (me._mode) {
					spoke = 24;
					value = me._sDialog.sDate.format('H');
				} else {
					spoke = 12;
					value = me._sDialog.sDate.format('h');
				}
			}
			var rotationClass = me._calcRotation(spoke, parseInt(value, 10));
			if (rotationClass) {
				needle.classList.add(rotationClass);
			}
			// toggle the view type
			mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view;
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

	}, {
		key: '_switchToDateView',
		value: function _switchToDateView(el, me) {
			el.setAttribute('disabled', '');
			var viewHolder = me._sDialog.viewHolder,
			    years = me._sDialog.years,
			    title = me._sDialog.title,
			    subtitle = me._sDialog.subtitle,
			    currentYear = document.getElementById('mddtp-date__currentYear');

			if (mdDateTimePicker.dialog.view) {
				viewHolder.classList.add('zoomOut');
				years.classList.remove('mddtp-picker__years--invisible');
				years.classList.add('zoomIn');
				// scroll into the view
				currentYear.scrollIntoViewIfNeeded();
			} else {
				years.classList.add('zoomOut');
				viewHolder.classList.remove('zoomOut');
				viewHolder.classList.add('zoomIn');
				setTimeout(function () {
					years.classList.remove('zoomIn', 'zoomOut');
					years.classList.add('mddtp-picker__years--invisible');
					viewHolder.classList.remove('zoomIn');
				}, 300);
			}
			title.classList.toggle('mddtp-picker__color--active');
			subtitle.classList.toggle('mddtp-picker__color--active');
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
				if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('mddtp-picker__cell')) {
					var picker = me._sDialog.picker,
					    day = e.target.innerHTML,
					    currentDate = me._sDialog.tDate.date(day),
					    selected = picker.querySelector('.mddtp-picker__cell--selected'),
					    subtitle = me._sDialog.subtitle,
					    titleDay = me._sDialog.titleDay,
					    titleMonth = me._sDialog.titleMonth;

					if (selected) {
						selected.classList.remove('mddtp-picker__cell--selected');
					}
					e.target.classList.add('mddtp-picker__cell--selected');

					// update temp date object with the date selected
					me._sDialog.sDate = currentDate.clone();
					subtitle.innerHTML = currentDate.year();
					titleDay.innerHTML = currentDate.format('ddd, ');
					titleMonth.innerHTML = currentDate.format('MMM D');
				}
			});
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
			left.classList.remove('mddtp-button--disabled');
			right.classList.remove('mddtp-button--disabled');
			if (m.isSame(past, 'month')) {
				left.setAttribute('disabled', '');
				left.classList.add('mddtp-button--disabled');
			}
			if (m.isSame(future, 'month')) {
				right.setAttribute('disabled', '');
				right.classList.add('mddtp-button--disabled');
			}
		}
	}, {
		key: '_changeMonth',
		value: function _changeMonth() {
			var me = this,
			    left = this._sDialog.left,
			    right = this._sDialog.right,
			    mLeftClass = 'mddtp-picker__view--left',
			    mRightClass = 'mddtp-picker__view--right',
			    pause = 'mddtp-picker__view--pause';

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
					if (!left.classList.contains('mddtp-button--disabled')) {
						left.removeAttribute('disabled');
					}
					if (!right.classList.contains('mddtp-button--disabled')) {
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
					var selected = document.getElementById('mddtp-date__currentYear');
					// clear previous selected
					selected.id = '';
					selected.classList.remove('mddtp-picker__li--current');
					// add the properties to the newer one
					e.target.id = 'mddtp-date__currentYear';
					e.target.classList.add('mddtp-picker__li--current');
					// switch view
					me._switchToDateView(el, me);
					// set the tdate to it
					me._sDialog.tDate.year(parseInt(e.target.innerHTML, 10));
					// update the dialog
					me._initViewHolder();
				}
			});
		}

		/**
  * [_changeM switch between am and pm modes]
  *
  * @method _changeM
  *
  * @return {[type]} [description]
  */

	}, {
		key: '_changeM',
		value: function _changeM() {
			var me = this,
			    AM = this._sDialog.AM,
			    PM = this._sDialog.PM;

			AM.addEventListener('click', function (e) {
				var m = me._sDialog.sDate.format('A');
				if (m === 'PM') {
					me._sDialog.sDate.subtract(12, 'h');
					AM.classList.toggle('mddtp-picker__color--active');
					PM.classList.toggle('mddtp-picker__color--active');
				}
			});
			PM.addEventListener('click', function (e) {
				var m = me._sDialog.sDate.format('A');
				if (m === 'AM') {
					me._sDialog.sDate.add(12, 'h');
					AM.classList.toggle('mddtp-picker__color--active');
					PM.classList.toggle('mddtp-picker__color--active');
				}
			});
		}
	}, {
		key: '_dragDial',
		value: function _dragDial() {
			var me = this,
			    needle = this._sDialog.needle,
			    circle = this._sDialog.circle,
			    fakeNeedle = this._sDialog.fakeNeedle,
			    circularHolder = this._sDialog.circularHolder,
			    minute = this._sDialog.minute,
			    quick = 'mddtp-picker__selection--quick',
			    selection = 'mddtp-picker__selection',
			    selected = 'mddtp-picker__cell--selected',
			    rotate = 'mddtp-picker__cell--rotate-',
			    hOffset = circularHolder.getBoundingClientRect(),
			    divides = void 0,
			    fakeNeedleDraggabilly = new Draggabilly(fakeNeedle, {
				containment: !0
			});

			fakeNeedleDraggabilly.on('pointerDown', function () {
				hOffset = circularHolder.getBoundingClientRect();
			});
			fakeNeedleDraggabilly.on('dragMove', function (e) {
				var xPos = e.clientX - hOffset.left - hOffset.width / 2,
				    yPos = e.clientY - hOffset.top - hOffset.height / 2,
				    slope = Math.atan2(-yPos, xPos);

				needle.className = '';
				if (slope < 0) {
					slope += 2 * Math.PI;
				}
				slope *= 180 / Math.PI;
				slope = 360 - slope;
				if (slope > 270) {
					slope -= 360;
				}
				divides = parseInt(slope / 6);
				var same = Math.abs(6 * divides - slope),
				    upper = Math.abs(6 * (divides + 1) - slope);

				if (upper < same) {
					divides++;
				}
				divides += 15;
				needle.classList.add(selection, quick, rotate + divides);
			});
			fakeNeedleDraggabilly.on('dragEnd', function () {
				var minuteViewChildren = me._sDialog.minuteView.getElementsByTagName('div'),
				    minuteNow = parseInt(me._sDialog.sDate.format('m'), 10),
				    cOffset = circle.getBoundingClientRect();

				fakeNeedle.setAttribute('style', 'left:' + (cOffset.left - hOffset.left) + 'px;top:' + (cOffset.top - hOffset.top) + 'px');
				needle.classList.remove(quick);
				var select = divides;
				if (select === 1) {
					select = 60;
				}
				select = me._nearestDivisor(select, 5);
				// normalize 60 => 0
				if (divides === 60) {
					divides = 0;
				}
				// remove previously selected value
				// normalize 0 and 1 => 60
				if (minuteNow >= 0 && minuteNow <= 1) {
					minuteNow = 60;
				}
				minuteNow = me._nearestDivisor(minuteNow, 5);
				if (minuteNow % 5 === 0) {
					minuteNow /= 5;
					minuteNow--;
					minuteViewChildren[minuteNow].classList.remove(selected);
				}
				if (select > 0) {
					select /= 5;
					select--;
					minuteViewChildren[select].classList.add(selected);
				}
				minute.textContent = me._numWithZero(divides);
				me._sDialog.sDate.minutes(divides);
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
			    ok = this._sDialog.ok,
			    cancel = this._sDialog.cancel;

			cancel.addEventListener('click', function () {
				me.toggle();
			});
			ok.addEventListener('click', function () {
				me._init = me._sDialog.sDate;
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
				return m.add(Math.abs(count), 'M');
			} else {
				return m.subtract(Math.abs(count), 'M');
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

	}, {
		key: '_nearestDivisor',
		value: function _nearestDivisor(number, divided) {
			if (number % divided === 0) {
				return number;
			} else if ((number - 1) % divided === 0) {
				return number - 1;
			} else if ((number + 1) % divided === 0) {
				return number + 1;
			}
			return -1;
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

	}, {
		key: '_numWithZero',
		value: function _numWithZero(n) {
			return n > 9 ? '' + n : '0' + n;
		}

		/**
  * [_addId add id to picker element]
  *
  * @method _addId
  *
  * @param  {[type]} el [description]
  */

	}, {
		key: '_addId',
		value: function _addId(el, id) {
			el.id = 'mddtp-' + this._type + '__' + id;
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

	}, {
		key: '_addClass',
		value: function _addClass(el, aClass, more) {
			el.classList.add('mddtp-picker__' + aClass);
			var i = 0;
			if (more) {
				i = more.length;
				more.reverse();
			}
			while (i--) {
				el.classList.add(more[i]);
			}
		}

		/**
  * [_addView add view]
  *
  * @method _addView
  *
  * @param  {[type]} view [description]
  */

	}, {
		key: '_addView',
		value: function _addView(view) {
			var month = document.createElement('div'),
			    grid = document.createElement('div'),
			    th = document.createElement('div'),
			    tr = document.createElement('div'),
			    weekDays = ['S', 'F', 'T', 'W', 'T', 'M', 'S'],
			    week = 6;

			while (week--) {
				var span = document.createElement('span');
				span.textContent = weekDays[week];
				th.appendChild(span);
			}
			// add properties to them
			this._addClass(month, 'month');
			this._addClass(grid, 'grid');
			this._addClass(th, 'th');
			this._addClass(tr, 'tr');
			// add them to the view
			view.appendChild(month);
			view.appendChild(grid);
			grid.appendChild(th);
			grid.appendChild(tr);
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

	}, {
		key: '_calcRotation',
		value: function _calcRotation(spoke, value) {
			var start = spoke / 12 * 3;
			// set clocks top and right side value
			if (spoke === 12) {
				value *= 5;
			} else if (spoke === 24) {
				// REVIEW this multiplicativeFactor and also revise css classes for this style
				value *= 10;
			}
			// special case for 00 => 60
			if (spoke === 60 && value === 0) {
				value = 60;
			}
			return 'mddtp-picker__cell--rotate-' + value;
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