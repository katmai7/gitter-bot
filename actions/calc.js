'use strict';

var mathjs = require('mathjs');

function calc(expression){
	return mathjs.eval(expression);
}

module.exports = calc;