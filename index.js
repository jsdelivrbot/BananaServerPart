

var express = require('express');
var http = require('http');

var path     = require('path');
var fs = require('fs');

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');



var server = express();
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
        console.log(file);
		var route = require('./models/'+file);
        route(server);
	}
})

