/*
* @Author: hwaphon
* @Date:   2018-06-04 20:01:08
 * @Last modified by:   
 * @Last modified time: 2018-06-04T21:41:58+08:00
*/

define(function (require, exports, module) {
	var scaleControl = function slControl() {
		this.dom = {
			sxInput: document.getElementById('scaleXInput'),
			syInput: document.getElementById('scaleYInput'),
			szInput: document.getElementById('scaleZInput'),
			sBox: document.getElementById('scaleBox')
		};

		this.global = {
			scss: { x: '1', y: '1', z: '1' }
		}

		this.init();
	};

	scaleControl.prototype = {
		constructor: scaleControl,
		init: function () {
			this.event();
		},
		event: function () {
			var _this = this;
			this.dom.sxInput.addEventListener('input', function () {
				_this.scaleX(this.value);
			});

			this.dom.syInput.addEventListener('input', function () {
				_this.scaleY(this.value);
			});

			this.dom.szInput.addEventListener('input', function () {
				_this.scaleZ(this.value);
			});
		},
		scaleX: function (x) {
			var scss = this.global.scss;
			scss.x = x;

			this.dom.sBox.style.cssText = 'transform: scale3d(' + scss.x + ',' + scss.y + ',' + scss.z + ') ';
		},
		scaleY: function (y) {
			var scss = this.global.scss;
			scss.y = y;

			this.dom.sBox.style.cssText = 'transform: scale3d(' + scss.x + ',' + scss.y + ',' + scss.z + ') ';
		},
		scaleZ: function (z) {
			var scss = this.global.scss;
			scss.z = z;

			this.dom.sBox.style.cssText = 'transform: scale3d(' + scss.x + ',' + scss.y + ',' + scss.z + ') ';
		}
	};

	module.exports = scaleControl;
});
