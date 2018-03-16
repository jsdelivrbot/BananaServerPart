
var Start = require('../controllers/start');
var Socket = require('../controllers/socket');

module.exports = function (app) {
    app.get('/', Start.Index);

    app.get('/start', Start.Start);
    app.get('/socket.io', Socket.Socket);
}