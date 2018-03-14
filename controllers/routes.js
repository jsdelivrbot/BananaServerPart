//var start = require("../models/start_module.js");

module.exports.controller = function (app,dir) {
    app.get('/', function (req, res) {
       
        res.sendFile(dir+'/views/start.html');
    });

    app.get('/start', function (req, res) {
        res.render('start.jade');
    });

    app.get('/end', function (req, res) {
        res.render('end');
    });
}