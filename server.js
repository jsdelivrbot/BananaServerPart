var express = require('express');
var http = require('http');

express.get('/',function(req,res){
	res.send('Hellow');
})

http.listen(4321,function(){
	console.log('listen');
})