
var Start = require('../models/start');
var Socket = require('../models/socket');
var Chat = require('../models/chat');

module.exports = function (app) {
    app.get('/', Start.Index);

    app.get('/start', Start.Start);
    app.get('/socket', Socket.Socket);
    app.get('/chat', Chat.Chat);
}