/*
* @Author: hwaphon
* @Date:   2018-06-04 20:01:08
* @Last Modified by:   hwaphon
* @Last Modified time: 2018-06-04 20:03:13
*/

define(function (require, exports, module) {
	var rotateControl = function rtControl() {
		this.dom = {
			rxInput: document.getElementById('rotateXInput'),
			ryInput: document.getElementById('rotateYInput'),
			rzInput: document.getElementById('rotateZInput'),
			rBox: document.getElementById('rotateBox')
		};

		this.global = {
			rcss: { x: '0deg', y: '0deg', z: '0deg' }
		}

		this.init();
	};

	rotateControl.prototype = {
		constructor: rotateControl,
		init: function () {
			this.event();
		},
		event: function () {
			var _this = this;
			this.dom.rxInput.addEventListener('input', function () {
				_this.rotateX(this.value);
			});

			this.dom.ryInput.addEventListener('input', function () {
				_this.rotateY(this.value);
			});

			this.dom.rzInput.addEventListener('input', function () {
				_this.rotateZ(this.value);
			});
		},
		rotateX: function (x) {
			var rcss = this.global.rcss;
			rcss.x = x + 'deg';

			this.dom.rBox.style.cssText = 'transform: rotateX(' + rcss.x + ') ' +
																		 'rotateY(' + rcss.y + ') ' + 
																		 'rotateZ(' + rcss.z + ')';
		},
		rotateY: function (y) {
			var rcss = this.global.rcss;
			rcss.y = y + 'deg';

			this.dom.rBox.style.cssText = 'transform: rotateX(' + rcss.x + ') ' +
																		 'rotateY(' + rcss.y + ') ' + 
																		 'rotateZ(' + rcss.z + ')';
		},
		rotateZ: function (z) {
			var rcss = this.global.rcss;
			rcss.z = z + 'deg';

			this.dom.rBox.style.cssText = 'transform: rotateX(' + rcss.x + ') ' +
																		 'rotateY(' + rcss.y + ') ' + 
																		 'rotateZ(' + rcss.z + ')';
		}
	};

	module.exports = rotateControl;
});
