'use strict';

var Gitter = require('node-gitter');
var Parser = require('./parser');
var format = require('./format');

function GitterBot(room, token) {
    this._room = room;
    this._token = token;
    this._parser = new Parser();

    this._gitter = new Gitter(this._token);
}

GitterBot.prototype._onMessage = function(room, message) {
    var result = this._parser.parseAndExec(message.text);

    var expr = this._parser.getExpression(message.text);
    var action = this._parser.getAction(message.text);

    console.log(expr, action);

    this._sendMessage(room, format(action, expr, result));
};

GitterBot.prototype._sendMessage = function(room, message) {
    room.send(message);
};

GitterBot.prototype.start = function() {
    var _this = this;

    this._gitter.rooms.join(this._room)
        .then(function(room) {
            console.log('Joined room: ', room.name);

            room.listen().on('message', _this._onMessage.bind(_this, room));
        })
        .fail(function(err) {
            console.log('Not possible to join the room: ', err);
        });
};

module.exports = GitterBot;