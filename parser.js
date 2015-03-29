'use strict';

var actions = require('./actions');

var ACTIONS = {
	'CALC': actions.calc,
	'HELP': actions.help
};

var PATTERN = /^(calc|help)([\s\d\w()\/.*+-]*)$/i;

function Parser() {
	this._pattern = PATTERN;
}

Parser.prototype.parse = function(str){
	var mathes = str.match(this._pattern);
	var action;
	var expression;

	if(mathes.length >= 3){
		action = mathes[1].toUpperCase();
		expression = mathes[2];

		return [action, expression];
	} 

	return;
}


Parser.prototype.getAction = function(str){
	var mathes = str.match(this._pattern);
	var action;

	if(mathes.length >= 3){
		action = mathes[1].toUpperCase();
		return action;
	}

	return;
}

Parser.prototype.getExpression = function(str){
	var mathes = str.match(this._pattern);
	var expression;

	if(mathes.length >= 3){
		expression = mathes[2].toUpperCase();
		return expression;
	} 

	return;
}


Parser.prototype.parseAndExec = function(str){
	var tokens = this.parse(str);
	var action = tokens[0];
	var expression = tokens[1];
	var result;

	if(action in ACTIONS){
		result = ACTIONS[action](expression);
	}

	return result;
};

module.exports = Parser;