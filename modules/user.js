
var DB=require("./db.js");
exports.getUserBaseInfo=function (socket,iosockets){
    socket.on("getUserBaseInfo",function(data){
	    $datas=DB.dbGetOne("UserBaseInfo",data);
	    if($datas!=null) {
		      delete $datas["_id"];
		      delete $datas["Id_User"];
		    socket.emit('getUserBaseInfo', $datas);
	    }
  });
}



exports.getUserAgronom=function (socket,iosockets){
	socket.on("getUserAgronom",function(data){
		$datas=DB.dbGetOne("UserAgronom",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserAgronom', $datas);
		}

	});
}

exports.getUserAgronoms=function (socket,iosockets){
	socket.on("getUserAgronoms",function(data){
		$datas=DB.dbGetMore("UserAgronom",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserAgronoms', $datas);
		}

	});
}

exports.getUserLobbyist=function (socket,iosockets){
	socket.on("getUserLobbyist",function(data){
		$datas=DB.dbGetOne("UserLobbyist",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserLobbyist', $datas);
		}
	});
}


exports.getUserLobbyists=function (socket,iosockets){
	socket.on("getUserLobbyists",function(data){
		$datas=DB.dbGetMore("UserLobbyist",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserLobbyists', $datas);
		}
	});
}


exports.getUserDirector=function (socket,iosockets){
	socket.on("getUserDirector",function(data){
		$datas=DB.dbGetOne("UserDirector",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserDirector', $datas);
		}
	});
}

exports.getUserDirectors=function (socket,iosockets){
	socket.on("getUserDirectors",function(data){
		$datas=DB.dbGetMore("UserDirector",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserDirectors', $datas);
		}
	});
}


exports.getUserScientific=function (socket,iosockets){
	socket.on("getUserScientific",function(data){
		$datas=DB.dbGetOne("UserScientific",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserScientific', $datas);
		}
		}
	});
}


exports.getUserScientifics=function (socket,iosockets){
	socket.on("getUserScientifics",function(data){
		$datas=DB.dbGetMore("UserScientific",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserScientifics', $datas);
		}
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

