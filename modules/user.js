
var DB=require("db.js");
exports.getUserBaseInfo=function (socket,iosockets){
    socket.on("getUserBaseInfo",function(data){
    	console.log("SOCKET CONNECTDATAS");
	    $datas=DB.dbGetOne("users",data);
	    socket.emit('getUserBaseInfo', $datas);
  });
}



exports.getUserAgronom=function (socket,iosockets){
	socket.on("getUserAgronom",function(data){
	});
}

exports.getUserAgronoms=function (socket,iosockets){
	socket.on("getUserAgronoms",function(data){
	});
}

exports.getUserLobbyist=function (socket,iosockets){
	socket.on("getUserLobbyist",function(data){
	});
}


exports.getUserLobbyista=function (socket,iosockets){
	socket.on("getUserLobbyista",function(data){
	});
}


exports.getUserDirector=function (socket,iosockets){
	socket.on("getUserDirector",function(data){
	});
}

exports.getUserDirectors=function (socket,iosockets){
	socket.on("getUserDirectors",function(data){
	});
}


exports.getUserScientific=function (socket,iosockets){
	socket.on("getUserScientific",function(data){
	});
}


exports.getUserTraiders=function (socket,iosockets){
	socket.on("getUserTraiders",function(data){
	});
}

exports.getUserEmployer=function (socket,iosockets){
	socket.on("getUserEmployer",function(data){
	});
}


exports.getUserEmployeerItems=function (socket,iosockets){
	socket.on("getUserEmployeerItems",function(data){
	});
}

