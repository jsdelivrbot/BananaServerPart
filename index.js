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
		user.getUserAgronom(socket, io.sockets);
		user.getUserAgronoms(socket, io.sockets);
		user.getUserLobbyist(socket, io.sockets);
		user.getUserLobbyists(socket, io.sockets);
		user.getUserDirector(socket, io.sockets);
		user.getUserDirectors(socket, io.sockets);
		user.getUserScientific(socket, io.sockets);
		user.getUserScientifics(socket, io.sockets);
		user.getUserTraider(socket, io.sockets);
		user.getUserTraiders(socket, io.sockets);
		user.getUserEmployers(socket, io.sockets);
		user.getUserEmployeerItems(socket, io.sockets);

		graphic.getGraphicItem(socket, io.sockets);
		graphic.getGraphics(socket, io.sockets);

		agronom.hireAgronom(socket, io.sockets);

		employers.hireEmployeer(socket, io.sockets);
		employers.buyEmployer(socket, io.sockets);
		employers.getEmployeerItems(socket, io.sockets);

		hire.getHire(socket, io.sockets);

		map.getMapBase(socket, io.sockets);

		market.getMarketPrice(socket, io.sockets);

		warehouse.getWarehouse(socket, io.sockets);
		warehouse.getWarehouseResources(socket, io.sockets);
		warehouse.upgradeWarehouse(socket, io.sockets);

		parsel.getParselsBase(socket, io.sockets);
		parsel.getParselUser(socket, io.sockets);
		parsel.getParselIsUser(socket, io.sockets);
		parsel.buyParsel(socket, io.sockets);

		install.getInstallInfo(socket, io.sockets);
		install.setInstallInfo(socket, io.sockets);
	});
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
