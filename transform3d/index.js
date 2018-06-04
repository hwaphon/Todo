/*
* @Author: hwaphon
* @Date:   2018-06-04 16:49:16
 * @Last modified by:   
 * @Last modified time: 2018-06-04T21:26:46+08:00
*/

define(function (require, exports, module) {

	var translateControl = require('./static/translate');
	var rotateControl = require('./static/rotate');
	var scaleControl = require('./static/scale');

	new translateControl();
	new rotateControl();
	new scaleControl();
});
