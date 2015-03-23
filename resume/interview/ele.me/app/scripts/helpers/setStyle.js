/**
 * set element style
 *
 * @author cookront@gmail.com
 * @date 2015-01-28
 *
 * example:
 * 
 * setStyle(elem, 'left', '10px')
 *
 * or:
 *
 * setStyle(elem, {
 *     left: '10px'
 * })
 */
function camelCase (string) {
	var rdashAlpha = /-([\da-z])/gi;

	return string.replace(rdashAlpha, function (all, letter) {
		return letter.toUpperCase();
	});
}

module.exports = function (elem, name, value) {
	if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
		return;
	}

	var style = elem.style;

	if (value !== undefined) {
		style[camelCase(name)] = value;
	} else if (typeof name === 'object' && value === undefined) {
		for (var i in name) {
			if (name.hasOwnProperty(i)) {
				style[camelCase(i)] = name[i];
			}
		}
	}
};