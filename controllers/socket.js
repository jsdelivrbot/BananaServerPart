

exports.Socket = function (request, response) {
	response.render('socket', { title: 'Socket', message: 'MVC Socket!' });
	global.io.sockets.on('connection', function (socket) {
        socket.on('addme', function (user) {
          socket.username = user;
          socket.emit('chat', 'Server Connected');
          socket.broadcast.emit('chat', 'Server ' + user + ' on deck');

        });
        socket.on('sendchat', function (data) {
	        global.io.sockets.emit('chat', socket.username + ":" + data);

        });

        socket.on('jsoncreater', function (json) {
	        global.io.sockets.emit("middle", json);
          socket.broadcast.emit("chat", json);
        });
        socket.on('disconect', function () {
	        global.io.sockets.emit('chat', 'Server', socket.username + 'left');
        });
      });
};


