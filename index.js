var app = require('express')();
var path     = require('path');
var fs = require('fs');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ancient-gorge-52214.herokuapp.com:27017/banandata";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.createCollection("customers", function(err, res) {
		if (err) throw err;
		console.log("Collection created!");
		db.close();
	});
});
*/


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.set('view options', { layout: 'layout' });
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

var host = 'ancient-gorge-52214.herokuapp.com';
var port = mongodb.Connection.DEFAULT_PORT;

var db = new mongodb.Db('test', new mongodb.Server(host, port, {}), {safe:false});
db.open(function(err, db) {
	console.log("Connected!");
	db.close();
});
/*var DBserver = new mongodb.Server('mongodb://ancient-gorge-52214.herokuapp.com:27017/banandata');
var db = new mongodb.Db('banan', DBserver);

db.open(function(err, db) {
	if(!err) {
		db.collection('bananData',function(err,result){
			if(!err){
				var coll={user:'123',data:'1254'};
				result.insert(coll);
			}
			db.close();
		})
	}
})*/

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




		io.sockets.emit("middle", socket.username+" Send: "+json);
	});
	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
