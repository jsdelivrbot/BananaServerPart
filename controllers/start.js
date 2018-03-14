//var start = require("../models/start_module.js");

module.exports.controller = function (app) {
    app.get('/start', function (req, res) {
        res.render('start');
    });

    app.get('/end', function (req, res) {
        res.render('end');
    });
}