const express = require('express')
const path = require('path')
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000
const http = require('http');

/*
var server=http.createServer(function(req,res){
  res.writeHead(200);
  res.end("Banana 555");
}).listen(555);
*/

var server=express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

var io=socketIO(server);

io.on('connection',(socket)=>{
  console.log("Clinet connect");
  socket.on('disconnect',()=>console.log('disconnect'));
})

setInterval(()=>io.emit('time',new Date().toTimeString()),1000);
