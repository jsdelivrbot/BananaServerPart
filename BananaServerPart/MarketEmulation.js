var app = require('express')();
var path     = require('path');
var fs = require('fs');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var server = require('http').Server(app);


var marketEmulation = require("./modules/marketEmulation.js");

var MongoClient = require('mongodb').MongoClient;


const PORT = /* process.env.PORT || */5893;
const INDEX = path.join(__dirname, 'index.html');



app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.set('view options', { layout: 'layout' });
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));





	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
	
        marketEmulation.marketEmulationNewServer(db);


});
