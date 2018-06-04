/*
* @Author: hwaphon
* @Date:   2018-06-04 16:49:16
* @Last Modified by:   hwaphon
* @Last Modified time: 2018-06-04 20:06:59
*/

define(function (require, exports, module) {

	var translateControl = require('./static/translate');
	var rotateControl = require('./static/rotate');

	new translateControl();
	new rotateControl();
});