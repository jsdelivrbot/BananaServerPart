

var express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path     = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express();
server.use((req, res) => res.sendFile(INDEX));

server.set('port', process.env.PORT || 3000);
server.set('views', __dirname + '/views');
server.set('view engine', 'jade');
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


fs.readdirSync('./controllers').forEach(function(file){
    if (file.substr(-3) == '.js') {
       
		var route = require('./controllers/'+file);
		route.controller(server);
	}
})

const io = socketIO();

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

			io.sockets.emit("middle",json);
			socket.broadcast.emit("chat",	json);
	});
	socket.on('disconect',function(){
		io.sockets.emit('chat','Server',socket.username + 'left');
	});
});