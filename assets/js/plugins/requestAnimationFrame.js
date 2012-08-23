/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global require, window */

// polyfill for requestAnimationFrame, code from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(function () {
    'use strict';

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    var x;
	for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (window.requestAnimationFrame === undefined) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = Date.now(), timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (window.cancelAnimationFrame === undefined) {
		window.cancelAnimationFrame = function (id) { window.clearTimeout(id); };
	}
}());
