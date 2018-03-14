

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var path     = require('path');
var fs = require('fs');
var handlebars = require('express-handlebars');

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var hbs = handlebars.create({
    defaultLayout: 'main'
});

var server = express();
//server.use((req, res) => res.sendFile(INDEX));

server.set('port', process.env.PORT || 3000);
server.set('views', __dirname + '/views');
server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.use(methodOverride());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

require('./router')(server);

fs.readdirSync('./models').forEach(function(file){
    if (file.substr(-3) == '.js') {
        console.log(file);
		var route = require('./models/'+file);
        route(server);
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