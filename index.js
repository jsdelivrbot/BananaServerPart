'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
var count=1;
var param1_mid;
var param2_mid;
var param3_mid;
var param1_sum;
var param2_sum;
var param3_sum;
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
			var $j=JSON.parse(json);
			param1_sum+=parseInt($j["param1"],10);
			param2_sum+=parseInt($j["param2"],10);
			param3_sum+=parseInt($j["param3"],10);
			count++;
			param1_mid=param1_sum/count;
			param2_mid=param2_sum/count;
			param3_mid=param3_sum/count;
			var $p="{'param1':'"+$j["param1"]+"','param2':'"+$j["param2"]+"','param3':'"+$j["param3"]+"'}";
			io.sockets.emit("middle",$p);
			socket.broadcast.emit("chat",	json);
	});
	socket.on('disconect',function(){
		io.sockets.emit('chat','Server',socket.username + 'left');
	});
});