
var Start = require('../controllers/start');
var Socket = require('../controllers/socket');
var Chat = require('../controllers/chat');

module.exports = function (app) {
    app.get('/', Start.Index);

    app.get('/start', Start.Start);
    app.get('/socket', Socket.Socket);
    app.get('/chat', Chat.Chat);
}