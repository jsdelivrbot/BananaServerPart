var app = require('express')();
var path     = require('path');
var fs = require('fs');
var mongodb = require('mongodb').MongoClient;;
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

/*var DBserver = new mongodb.Server('mongodb://ancient-gorge-52214.herokuapp.com',27017, {auto_reconnect: true});
var db = new mongodb.Db('banan', DBserver);*/
mongodb.connect("mongodb://ancient-gorge-52214.herokuapp.com:27017/banandb", function(err, db) {
	if(!err) {
		console.log("We are connected!!!");
	}else{
		console.log(err);
	}
});
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

		socket.username = user;

	});
	socket.on('sendchat', function (data) {
		io.sockets.emit('chat', socket.username + ":" + data);

	});

	socket.on('jsoncreater', function (json) {

		db.open(function(err, db) {
			if(!err) {
				db.collection('bananData',function(err,result){
					if(!err){
						var coll={user:socket.username,data:json};
						result.insert(coll);
					}
					db.close();
				})
			}
		})


		io.sockets.emit("middle", socket.username+" Send: "+json);
	});
	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
