//var express = require('express');
var http = require('http');

/*express.get('/',function(req,res){
	res.send('Hellow');
})*/

var server = http.createServer((req, res) => {
		res.writeHead(200, {'Content-type':'text/html'});
res.end('<h1>Hello NodeJS</h1>');
});

server.listen(4321,() => console.log('Server running on port 3000'));