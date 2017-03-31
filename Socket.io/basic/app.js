var express = require('express');
var app = express();

var socket = require('./soket');
app.use(express.static('client'));

var server = app.listen(3000);
socket.startIo(server);