/**
 * DOM event helper
 *
 * @author cookfront@gmail.com
 * @date 2015-01-29
 */
module.exports = {
	addEvent: function (elem, type, handler) {
		if (elem.addEventListener) {
			elem.addEventListener(type, handler, false);
		} else if (elem.attachEvent) {
			elem.attachEvent('on' + type, handler);
		}
	},
	removeEvent: function (elem, type, handler) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handler);
		} else if (elem.detachEvent) {
			elem.detachEvent('on' + type, handler);
		}
	}
};