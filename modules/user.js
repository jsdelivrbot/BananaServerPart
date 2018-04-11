
var DB=require("./db.js");
var dataUBI=null;
exports.getUserBaseInfo=function (socket,iosockets,db){
    socket.on("getUserBaseInfo",function(data){
	    DB.getOther(function(res){dataUBI=res;},"UserBaseInfo", data,db);
	    if(dataUBI!=null) {
		      delete dataUBI["_id"];
		      delete dataUBI["Id_User"];
		    socket.emit('getUserBaseInfo', dataUBI);
	    }
  });
}


var dataUA=null;
exports.getUserAgronom=function (socket,iosockets,db){
	socket.on("getUserAgronom",function(data){
		DB.getOther(function(res){dataUA=res;},"UserAgronom", data,db);
		if(dataUA!=null) {
			delete dataUA["_id"];
			delete dataUA["Id_User"];
			socket.emit('getUserAgronom', dataUA);
		}

	});
}
var dataUAs=null;
exports.getUserAgronoms=function (socket,iosockets,db){
	socket.on("getUserAgronoms",function(data){
		$datas=DB.dbGetMore("UserAgronom",data,db);
		DB.getOtherMore(function(res){dataUAs=res;},"UserAgronom", data,db);
		if(dataUAs!=null) {
			for (var $key in dataUAs) {
				delete dataUAs[$key]["_id"];
				delete dataUAs[$key]["Id_User"];
			}
			socket.emit('getUserAgronoms', dataUAs);
		}

	});
}
var dataUL=null;
exports.getUserLobbyist=function (socket,iosockets,db){
	socket.on("getUserLobbyist",function(data){
		DB.getOther(function(res){dataUL=res;},"UserLobbyist", data,db);
		if(dataUL!=null) {
			delete dataUL["_id"];
			delete dataUL["Id_User"];
			socket.emit('getUserLobbyist', dataUL);
		}
	});
}

var dataULs=null;
exports.getUserLobbyists=function (socket,iosockets,db){
	socket.on("getUserLobbyists",function(data){
		DB.getOtherMore(function(res){dataULs=res;},"UserLobbyist", data,db);
		if(dataULs!=null) {
			for (var $key in dataULs) {
				delete dataULs[$key]["_id"];
				delete dataULs[$key]["Id_User"];
			}
			socket.emit('getUserLobbyists', dataULs);
		}
	});
}

var dataUD=null;
exports.getUserDirector=function (socket,iosockets,db){
	socket.on("getUserDirector",function(data){
		DB.getOther(function(res){dataUD=res;},"UserDirector", data,db);
		if(dataUD!=null) {
			delete dataUD["_id"];
			delete dataUD["Id_User"];
			socket.emit('getUserDirector', dataUD);
		}
	});
}
var dataUDs=null;
exports.getUserDirectors=function (socket,iosockets,db){
	socket.on("getUserDirectors",function(data){
		DB.getOtherMore(function(res){dataUDs=res;},"UserDirector", data,db);
		if(dataUDs!=null) {
			for (var $key in dataUDs) {
				delete dataUDs[$key]["_id"];
				delete dataUDs[$key]["Id_User"];
			}
			socket.emit('getUserDirectors', dataUDs);
		}
	});
}

var dataUS=null;
exports.getUserScientific=function (socket,iosockets,db){
	socket.on("getUserScientific",function(data){
		DB.getOther(function(res){dataUS=res;},"UserScientific", data,db);
		if(dataUS!=null) {
			delete dataUS["_id"];
			delete dataUS["Id_User"];
			socket.emit('getUserScientific', dataUS);
		}
		});
	}


var dataUSs=null;
exports.getUserScientifics=function (socket,iosockets,db){
	socket.on("getUserScientifics",function(data){
		DB.getOtherMore(function(res){dataUSs=res;},"UserScientific", data,db);
		if($datas!=null) {
			for (var $key in dataUSs) {
				delete dataUSs[$key]["_id"];
				delete dataUSs[$key]["Id_User"];
			}
			socket.emit('getUserScientifics', dataUSs);
		}
	});
}

var dataUT=null;
exports.getUserTraider=function (socket,iosockets,db){
	socket.on("getUserTraider",function(data){
		DB.getOther(function(res){dataUT=res;},"UserTraider", data,db);
		if(dataUT!=null) {
			delete dataUT["_id"];
			delete dataUT["Id_User"];
			socket.emit('getUserTraider', dataUT);
		}
	});
}

var dataUTs=null;
exports.getUserTraiders=function (socket,iosockets,db){
	socket.on("getUserTraiders",function(data){
		DB.getOtherMore(function(res){dataUTs=res;},"UserTraider", data,db);
		if(dataUTs!=null) {
			for (var $key in dataUTs) {
				delete dataUTs[$key]["_id"];
				delete dataUTs[$key]["Id_User"];
			}
			socket.emit('getUserTraiders', dataUTs);
		}
	});
}

var dataUE=null;
exports.getUserEmployer=function (socket,iosockets,db){
	socket.on("getUserEmployer",function(data){
		DB.getOther(function(res){dataUE=res;},"UserEmployer", data,db);
		if(dataUE!=null) {
			delete dataUE["_id"];
			delete dataUE["Id_User"];
			socket.emit('getUserEmployer', dataUE);
		}
	});
}
var dataUEs=null;
exports.getUserEmployers=function (socket,iosockets,db){
	socket.on("getUserEmployers",function(data){
		DB.getOtherMore(function(res){dataUEs=res;},"UserEmployer", data,db);
		if(dataUEs!=null) {
			for (var $key in dataUEs) {
				delete dataUEs[$key]["_id"];
				delete dataUEs[$key]["Id_User"];
			}
			socket.emit('getUserEmployers', dataUEs);
		}
	});
}

var dataUEIs=null;
exports.getUserEmployeerItems=function (socket,iosockets,db){
	socket.on("getUserEmployeerItems",function(data){
		DB.getOtherMore(function(res){dataUEIs=res;},"UserEmployeerItems", data,db);
		if(dataUEIs!=null) {
			for (var $key in dataUEIs) {
				delete dataUEIs[$key]["_id"];
				delete dataUEIs[$key]["Id_User"];
				delete dataUEIs[$key]["Type_employer"];
			}
			socket.emit('getUserEmployeerItems', dataUEIs,db);
		}
	});
}

