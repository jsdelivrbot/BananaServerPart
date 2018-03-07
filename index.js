'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
var count;
var param1_mid;
var param2_mid;
var param3_mid;
const server = express()
		.use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.sockets.on('connection',function(socket){
	socket.on('addme',function(user){
		socket.username=user;
		socket.emit('chat','Server Connected');
		socket.broadcast.emit('chat','Server '+user + ' on deck');

	});
	socket.on('sendchat',function(data){
		io.sockets.emit('chat',socket.username+":"+data);

	});

	socket.on('jsoncreater',function(json){
			var $j=json;

			socket.broadcast.emit('chat',	$j);
	});
	socket.on('disconect',function(){
		io.sockets.emit('chat','Server',socket.username + 'left');
	});
});