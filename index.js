const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
		.use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

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