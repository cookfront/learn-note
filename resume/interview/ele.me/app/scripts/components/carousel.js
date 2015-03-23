/**
 * Slider Components
 *
 * @author cookfront@gmail.com
 * @date 2015-01-28
 */
var extend = require('../helpers/extend');
var setStyle = require('../helpers/setStyle');
var Event = require('../helpers/event');
var transitionProperty = require('../helpers/transitionProperty');

var Slider = function (selector, options) {
	if (!(this instanceof Slider)) {
		return new Slider(selector, options);
	}

	if (typeof selector.nodeName === 'string') {
		this.sliderWrapper = selector;
	} else {
		this.sliderWrapper = document.querySelector(selector);
	}

	this.init(options);
};

Slider.prototype = {
	constructor: Slider,
	init: function (options) {
		this.options = extend({
			// transition direction, `horizontal` or `vertical`
			direction: 'horizontal',
			// The amount of time (in ms) between each auto transition
			pause: 2000,
			// transition time
			duration: 600,
			// transition start index
			startIndex: 0,
			// Auto transition
			auto: true,
			// If true, a pager will be added
			pager: true,
			// set pager event, default `click`
			pagerEvent: 'click',
			// ease function
			ease: 'linear',
			// If true, `prev` and `next` controls will be added
			controls: true
		}, options);

		this.slider = document.getElementsByTagName('ul', this.sliderWrapper)[0];
		this.timer = null;
		this.currentIndex = this.options.startIndex;
		if (this.options.direction === 'horizontal') {
			this.changeOffset = this.options.width;
			this.directionProperty = 'left';
			this.sizeProperty = 'width';
		} else {
			this.changeOffset = this.options.height;
			this.directionProperty = 'top';
			this.sizeProperty = 'height';
		}

		/**

		 * tween function is used for browser that not support transition
		 *
		 * @param {Number} t current time
		 * @param {Number} b beginning value
		 * @param {Number} c change in value
		 * @param {Number} d duration
		 */
		this.options.tween = this.options.tween || function (t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		};

		// set `sliderWrapper` to `overflow: hidden`
		setStyle(this.sliderWrapper, {
			overflow: 'hidden',
			position: 'relative',
			width: this.options.width + 'px',
			height: this.options.height + 'px'
		});

		// set `slider`
		var slides = document.getElementsByTagName('li', this.slider);
		var slidesLen = this.slidesLen = slides.length;
		var i;

		setStyle(this.slider, {
			position: 'relative',
			overflow: 'hidden',
			top: 0,
			left: 0
		});
		if (this.options.direction === 'horizontal') {
			setStyle(this.slider, {
				width: (this.options.width * slidesLen) + 'px',
				height: this.options.height + 'px'
			});
		} else {
			setStyle(this.slider, {
				width: this.options.width + 'px',
				height: (this.options.height * slidesLen) + 'px'
			});
		}
		for (i = 0; i < slidesLen; i++) {
			setStyle(slides[i], {
				float: 'left',
				height: this.options.height + 'px',
				width: this.options.width + 'px'
			});
		}

		this.transitionProperty = transitionProperty();
		if (this.transitionProperty !== false) {
			setStyle(
				this.slider,
				this.transitionProperty,
				this.directionProperty + ' ' + (this.options.duration / 1000) + 's '+ this.options.ease
			);
		}

		this.start();
	},
	start: function () {
		this.renderHtml();
		this.bindEvent();
		this.run(this.options.startIndex || 0);
	},
	renderHtml: function () {
		if (this.sliderWrapper) {
			var controlsWrapper = document.createElement('div');
			var controlsHtml = [];
			var i;

			controlsWrapper.className = 'slider-controls';

			if (this.options.pager) {
				controlsHtml.push('<ol class="slider-pager">');
				for (i = 0; i < this.slidesLen; i++) {
					controlsHtml.push('<li>' + (i + 1) + '</li>');
				}
				controlsHtml.push('</ol>');
			}

			if (this.options.controls) {
				controlsHtml.push('<div class="slider-control-direction">');
				controlsHtml.push('<a href="#" class="slider-prev">prev</a>');
				controlsHtml.push('<a href="#" class="slider-next">next</a>');
				controlsHtml.push('</div>');
			}

			controlsWrapper.innerHTML = controlsHtml.join('');
			this.sliderWrapper.appendChild(controlsWrapper);
		}
	},
	bindEvent: function () {
		var me = this;

		if (this.options.pager) {
			var pagerContainer = document.querySelector('.slider-pager');

			Event.addEvent(pagerContainer, this.options.pagerEvent, function (e) {
				var target = e.target;
				if (target.nodeName.toLowerCase() === 'li') {
					me.run(target.innerHTML - 1);
				}
			});
		}

		if (this.options.controls) {
			var controlsContainer = document.querySelector('.slider-control-direction');

			Event.addEvent(controlsContainer, 'click', function (e) {
				var target = e.target;

				if (target.className === 'slider-prev') {
					me.prev();
				} else {
					me.next();
				}
			});
		}
	},
	run: function (index) {
		if (index === undefined) {
			index = this.currentIndex;
		} else if (index >= this.slidesLen) {
			index = 0;
		} else if (index < 0) {
			index = this.slidesLen - 1;
		}

		this.currentIndex = index;
		this.targetPosition = this.changeOffset * this.currentIndex * (-1);
		this.t = 0;
		this.b = parseInt(this.slider.style[this.directionProperty], 10);
		this.c = this.targetPosition - this.b;

		this.addControlStyle();
		this.move();
	},
	addControlStyle: function () {
		var pages = document.querySelectorAll('.slider-pager > li');
		if (pages.length !== 0) {
			for (var i = 0; i < this.slidesLen; i++) {
				pages[i].className = '';
			}
			pages[this.currentIndex].className = 'selected';
		}
	},
	move: function () {
		clearTimeout(this.timer);

		if (this.transitionProperty !== false) {
			setStyle(this.slider, this.directionProperty, this.targetPosition + 'px');

			if (this.options.auto) {
				// todo: transitionEnd event
				this.timer = setTimeout(this.next.bind(this), this.options.pause);
			}
		} else {
			if (this.c && this.t < this.options.duration) {
				this.moveTo(Math.round(this.options.tween(this.t++, this.b, this.c, this.options.duration)));
				this.timer = setTimeout(this.move.bind(this), 0);
			} else {
				if (this.options.auto) {
					this.timer = setTimeout(this.next.bind(this), this.options.pause);
				}
			}
		}
	},
	moveTo: function (val) {
		setStyle(this.slider, this.directionProperty, val + 'px');
	},
	next: function () {
		this.run(this.currentIndex + 1);
	},
	prev: function () {
		this.run(this.currentIndex - 1);
	},
	stop: function () {
		clearTimeout(this.timer);
	}
};

module.exports = Slider;
