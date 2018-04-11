
var DB=require("./db.js");
var dataUBI=null;
exports.getUserBaseInfo=function (socket,iosockets,db){
    socket.on("getUserBaseInfo",function(data){
	    DB.getOther(function(res){dataUBI=res;},"UserBaseInfo", data,db);
	    if(dataUBI!=null) {
		      delete dataUBI["_id"];
		      delete dataUBI["Id_User"];
		    socket.emit('getUserBaseInfo', $datas);
	    }
  });
}



exports.getUserAgronom=function (socket,iosockets,db){
	socket.on("getUserAgronom",function(data){
		$datas=DB.dbGetOne("UserAgronom",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserAgronom', $datas);
		}

	});
}

exports.getUserAgronoms=function (socket,iosockets,db){
	socket.on("getUserAgronoms",function(data){
		$datas=DB.dbGetMore("UserAgronom",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserAgronoms', $datas);
		}

	});
}

exports.getUserLobbyist=function (socket,iosockets,db){
	socket.on("getUserLobbyist",function(data){
		$datas=DB.dbGetOne("UserLobbyist",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserLobbyist', $datas);
		}
	});
}


exports.getUserLobbyists=function (socket,iosockets,db){
	socket.on("getUserLobbyists",function(data){
		$datas=DB.dbGetMore("UserLobbyist",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserLobbyists', $datas);
		}
	});
}


exports.getUserDirector=function (socket,iosockets,db){
	socket.on("getUserDirector",function(data){
		$datas=DB.dbGetOne("UserDirector",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserDirector', $datas);
		}
	});
}

exports.getUserDirectors=function (socket,iosockets,db){
	socket.on("getUserDirectors",function(data){
		$datas=DB.dbGetMore("UserDirector",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserDirectors', $datas);
		}
	});
}


exports.getUserScientific=function (socket,iosockets,db){
	socket.on("getUserScientific",function(data){
		$datas=DB.dbGetOne("UserScientific",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserScientific', $datas);
		}
		});
	}



exports.getUserScientifics=function (socket,iosockets,db){
	socket.on("getUserScientifics",function(data){
		$datas=DB.dbGetMore("UserScientific",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserScientifics', $datas);
		}
	});
}


exports.getUserTraider=function (socket,iosockets,db){
	socket.on("getUserTraider",function(data){
		$datas=DB.dbGetOne("UserTraider",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserTraider', $datas);
		}
	});
}


exports.getUserTraiders=function (socket,iosockets,db){
	socket.on("getUserTraiders",function(data){
		$datas=DB.dbGetMore("UserTraider",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserTraiders', $datas);
		}
	});
}

exports.getUserEmployer=function (socket,iosockets,db){
	socket.on("getUserEmployer",function(data){
		$datas=DB.dbGetOne("UserEmployer",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getUserEmployer', $datas);
		}
	});
}

exports.getUserEmployers=function (socket,iosockets,db){
	socket.on("getUserEmployers",function(data){
		$datas=DB.dbGetMore("UserEmployer",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getUserEmployers', $datas);
		}
	});
}


exports.getUserEmployeerItems=function (socket,iosockets,db){
	socket.on("getUserEmployeerItems",function(data){
		$datas=DB.dbGetMore("UserEmployeerItems",data,db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
				delete $datas[$key]["Type_employer"];
			}
			socket.emit('getUserEmployeerItems', $datas,db);
		}
	});
}

