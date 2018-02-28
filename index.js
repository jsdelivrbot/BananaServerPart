const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http');

http.createServer(function(req,res){
  res.writeHead(200);
  res.end("Banana 555");


 
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
}).listen(555);