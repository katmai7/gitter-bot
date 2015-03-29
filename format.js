'use strict';

var formatFunc = {
	CALC: function(expr, res) {
		return wrapSybmol(expr) + ' = ' + res;
	},
	HELP: function(expr, res){
		return res;
	}
};

function wrapSybmol(str){
	return str.replace(/[*]/g, '\\$&')
}

function format(action, expr, res) {
	if(action in formatFunc){
		return formatFunc[action](expr, res);
	} else {
		console.log(action + ' format function doesn\'t exist');
	}
};

module.exports = format;