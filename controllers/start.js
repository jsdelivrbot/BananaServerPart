//var start = require("../models/start_module.js");

module.exports.controller = function (app) {
    app.get('/', function (req, res) {
       
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/start', function (req, res) {
        res.render('start.jade');
    });

    app.get('/end', function (req, res) {
        res.render('end');
    });
}