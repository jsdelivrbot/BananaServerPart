const express = require('express');
const path = require('path');

const PORT = 3000;

var app=require('http').createServer(handler).listen(PORT);
var io =require('socket.io').listen(app);
var fs = require('fs');


function handler(req,res){
	fs.readFile(__dirname+"index.html",function(err,data){
		if(err){
			res.writeHead(500);
			return res.end("Err load");
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection',function(socket){
	socket.on('addme',function(user){
		socket.username=user;
		socket.emit('chat','Server','Connected');
		socket.broadcast.emit('chat','Server',user + 'on deck');

	});
	socket.on('sendchat',function(data){
		io.sockets.emit('chat',socket.username,data);

	});
	socket.on('disconect',function(){
		io.sockets.emit('chat','Server',socket.username + 'left');
	});
});