'use strict';

var config = require('./config.json');
var roomName = process.argv[2] || config.roomName;
var token = process.argv[3] || config.token;
var GitterBot = require('./gitter-bot.js');

var chatBot = new GitterBot(roomName, token);

chatBot.start();
