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
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


fs.readdirSync('./models').forEach(function(file){
    if (file.substr(-3) == '.js') {

		var route = require('./models/'+file);
        route(app);
	}
})



io.sockets.on('connection', function (socket) {

	socket.on('addme', function (user) {
		console.log("user "+user+" connect");
		socket.username = user;
		io.sockets.emit('chat', 'Server ' + user + ' on deck');

	});
	socket.on('sendchat', function (data) {
		io.sockets.emit('chat', socket.username + ":" + data);

	});

	socket.on('jsoncreater', function (json) {
		io.sockets.emit("middle", json);
	});
	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
