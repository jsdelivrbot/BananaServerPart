

exports.Socket = function (request, response) {
	response.render('socket', { title: 'Socket', message: 'MVC Socket!' });
    var io = socketIO();

    io.sockets.on('connection', function (socket) {
        socket.on('addme', function (user) {
            socket.username = user;
            socket.emit('chat', 'Server Connected');
            socket.broadcast.emit('chat', 'Server ' + user + ' on deck');

        });
        socket.on('sendchat', function (data) {
            io.sockets.emit('chat', socket.username + ":" + data);

        });

        socket.on('jsoncreater', function (json) {
            io.sockets.emit("middle", json);
            socket.broadcast.emit("chat", json);
        });
        socket.on('disconect', function () {
            io.sockets.emit('chat', 'Server', socket.username + 'left');
        });
    });
};


