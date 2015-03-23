/**
 * Browser support transition?
 *
 * @author cookfront@gmail.com
 * @date 2015-02-09
 */
var transitionProperties = [
	'WebkitTransition',
	'MozTransition',
	'OTransition',
	'transition'
];

module.exports = function isSupportTransition () {
	var trans = document.createElement('trans');
	var len = transitionProperties.length;
	var i;

	for (i = 0; i < len; i++) {
		if (trans.style[transitionProperties[i]] !== undefined) {
			return transitionProperties[i];
		}
	}
	return false;
};
