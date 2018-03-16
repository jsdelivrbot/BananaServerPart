var express = require('express')();
var path     = require('path');
var fs = require('fs');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');



const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');


function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
}




var server = express();
var Socketio = require('socket.io');
//server.use((req, res) => res.sendFile(INDEX));

server.set('port', process.env.PORT || 3000);
server.set('views', path.join(__dirname, 'views'));

server.set('view engine', 'jade');
server.set('view options', { layout: 'layout' });
server.use(methodOverride());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'views')));
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


fs.readdirSync('./models').forEach(function(file){
    if (file.substr(-3) == '.js') {

		var route = require('./models/'+file);
        route(server);
	}
})



Socketio.sockets.on('connection', function (socket) {

	socket.on('addme', function (user) {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		socket.username = user;
		socket.emit('chat', 'Server Connected');
		socket.broadcast.emit('chat', 'Server ' + user + ' on deck');

	});
	socket.on('sendchat', function (data) {
		Socketio.sockets.emit('chat', socket.username + ":" + data);

	});

	socket.on('jsoncreater', function (json) {
		Socketio.sockets.emit("middle", json);
		socket.broadcast.emit("chat", json);
	});
	socket.on('disconect', function () {
		Socketio.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
