var app = require('express')();
var path     = require('path');
var fs = require('fs');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var user = require("./modules/user.js");
var employers = require("./modules/employer.js");
var graphic = require("./modules/graphic.js");
var agronom = require("./modules/agronom.js");
var hire = require("./modules/hire.js");
var map = require("./modules/map.js");
var market = require("./modules/market.js");
var warehouse = require("./modules/warehouse.js");
var parsel = require("./modules/parsel.js");
var install = require("./modules/install.js");
var MongoClient = require('mongodb').MongoClient;


const PORT =  process.env.PORT||5891;
const INDEX = path.join(__dirname, 'index.html');



app.set('port', process.env.PORT||5891);
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
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		user.getUserBaseInfo(socket, io.sockets,db);
		user.getUserAgronom(socket, io.sockets,db);
		user.getUserAgronoms(socket, io.sockets,db);
		user.getUserLobbyist(socket, io.sockets,db);
		user.getUserLobbyists(socket, io.sockets,db);
		user.getUserDirector(socket, io.sockets,db);
		user.getUserDirectors(socket, io.sockets,db);
		user.getUserScientific(socket, io.sockets,db);
		user.getUserScientifics(socket, io.sockets,db);
		user.getUserTraider(socket, io.sockets,db);
		user.getUserTraiders(socket, io.sockets,db);
		user.getUserEmployers(socket, io.sockets,db);
		user.getUserEmployeerItems(socket, io.sockets,db);

		graphic.getGraphicItem(socket, io.sockets,db);
		graphic.getGraphics(socket, io.sockets,db);

		agronom.hireAgronom(socket, io.sockets,db);

		employers.hireEmployeer(socket, io.sockets,db);
		employers.buyEmployer(socket, io.sockets,db);
		employers.getEmployeerItems(socket, io.sockets,db);

		hire.getHire(socket, io.sockets,db);

		map.getMapBase(socket, io.sockets,db);

		market.getMarketPrice(socket, io.sockets,db);

		warehouse.getWarehouse(socket, io.sockets,db);
		warehouse.getWarehouseResources(socket, io.sockets,db);
		warehouse.upgradeWarehouse(socket, io.sockets,db);

		parsel.getParselsBase(socket, io.sockets,db);
		parsel.getParselUser(socket, io.sockets,db);
		parsel.getParselIsUser(socket, io.sockets,db);
		parsel.buyParsel(socket, io.sockets,db);

		install.getInstallInfo(socket, io.sockets,db);
		install.setInstallInfo(socket, io.sockets,db);

	socket.on('addme', function (user) {

		socket.username = user;
		io.sockets.emit('chat', socket.username + " on deck");
	});
	socket.on('sendchat', function (data) {
		io.sockets.emit('chat', socket.username + ":" + data);

	});


	socket.on('disconect', function () {
		io.sockets.emit('chat', 'Server', socket.username + 'left');
	});
});
});