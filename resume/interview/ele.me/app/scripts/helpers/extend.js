/**
 * Object extend helpers
 *
 * @author cookfront@gmail.com
 * @date 2015-01-28
 */
module.exports = function extend (object) {
	var args = Array.prototype.slice.call(arguments, 1);

	for (var i = 0, source; source = args[i]; i++) {
		if (!source) {
			continue;
		}
		for (var property in source) {
			object[property] = source[property];
		}
	}

	return object;
};