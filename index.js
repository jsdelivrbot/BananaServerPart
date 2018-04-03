var app = require('express')();
var path     = require('path');
var fs = require('fs');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var user = require("./modules/user.js");
var MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.set('view options', { layout: 'layout' });
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

fs.readdirSync('./controllers').forEach(function(file){
    if (file.substr(-3) == '.js') {

		var route = require('./controllers/'+file);
        route(app);
	}
})


io.sockets.on('connection', function (socket) {
	user.getUserEmployer(socket,io.sockets);
	user.getUserEmployer(socket,io.sockets);
	socket.on('addme', function (user) {

		socket.username = user;
		io.sockets.emit('chat', socket.username + " on deck");
	});
	socket.on('sendchat', function (data) {
		io.sockets.emit('chat', socket.username + ":" + data);

	});

	socket.on('jsoncreater', function (json) {

		MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
				var datas = db.db("banandata");
				var collection = datas.collection("playerdata");
			var user = {name: socket.username, json: json};
			collection.insertOne(user, function(err, result){

				if(err){
					return console.log(err);
				}

				db.close();
			});
			console.log("CONNECT to DATA");
		});

		io.sockets.emit("middle", socket.username+" Send: "+json);
	});
	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
