var app = require('express')();
var path     = require('path');
var fs = require('fs');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

//var server = express;

//server.use((req, res) => res.sendFile(INDEX));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.set('view options', { layout: 'layout' });
/*app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(path.join(__dirname, 'views'));*/
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


fs.readdirSync('./models').forEach(function(file){
    if (file.substr(-3) == '.js') {

		var route = require('./models/'+file);
        route(app);
	}
})



io.sockets.on('connection', function (socket) {

	socket.on('addme', function (user) {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		socket.username = user;
		socket.emit('chat', 'Server Connected');
		socket.broadcast.emit('chat', 'Server ' + user + ' on deck');

	});
	socket.on('sendchat', function (data) {
		io.sockets.emit('chat', socket.username + ":" + data);

	});

	socket.on('jsoncreater', function (json) {
		io.sockets.emit("middle", json);
		socket.broadcast.emit("chat", json);
	});
	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
