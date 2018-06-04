/*
* @Author: hwaphon
* @Date:   2018-06-04 19:56:45
* @Last Modified by:   hwaphon
* @Last Modified time: 2018-06-04 19:58:20
*/

define(function (require, exports, module) {

	var translateControl = function tsControl() {
		this.dom = {
			txInput: document.getElementById('translateXInput'),
			tyInput: document.getElementById('translateYInput'),
			tzInput: document.getElementById('translateZInput'),
			tBox: document.getElementById('translateBox')
		};

		this.global = {
			tcss: { x: 0, y: 0, z: 0 }
		}

		this.init();
	}

	translateControl.prototype = {
		constructor: translateControl,
		init: function () {
			this.event();
		},
		event: function () {
			var _this = this;
			this.dom.txInput.addEventListener('input', function () {
				_this.translateX(this.value);
			});

			this.dom.tyInput.addEventListener('input', function () {
				_this.translateY(this.value);
			});

			this.dom.tzInput.addEventListener('input', function () {
				_this.translateZ(this.value);
			});
		},
		translateX: function (x) {
			var tcss = this.global.tcss;
			tcss.x = x + 'px';

			this.dom.tBox.style.cssText = 'transform: translate3d(' + tcss.x + 
																		', ' + tcss.y + 
																		', ' + tcss.z + ')';
		},
		translateY: function (y) {
			var tcss = this.global.tcss;
			tcss.y = y + 'px';

			this.dom.tBox.style.cssText = 'transform: translate3d(' + tcss.x + 
																		', ' + tcss.y + 
																		', ' + tcss.z + ')';
		},
		translateZ: function (z) {
			var tcss = this.global.tcss;
			tcss.z = z + 'px';

			this.dom.tBox.style.cssText = 'transform: translate3d(' + tcss.x + 
																		', ' + tcss.y + 
																		', ' + tcss.z + ')';
		}
	};

	module.exports = translateControl;
});