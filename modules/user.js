
var DB=require("./db.js");
var transformData=require("./inout.js");
exports.getUserBaseInfo=function (socket,iosockets,db){
    socket.on("getUserBaseInfo",function(data){
    	infor=transformData.in(data);

	    if(infor) {
		    DB.getOther(function (res) {
		     if (res != null )
		     {
		        if (typeof(res) != "string") {
		          delete res["_id"];
		          delete res["Id_User"];
		        }
		        console.log(res);
		      socket.emit('getUserBaseInfo', res);
		     }
		     }, "UserBaseInfo", infor, db);
	    }else{
		    socket.emit('getUserBaseInfo', "Invalid request format");
	    }
	    });
}


exports.getUserAgronom=function (socket,iosockets,db){
	socket.on("getUserAgronom",function(data){
		DB.getOther(function(res){

			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getUserAgronom', res);
			}
		},"UserAgronom", data,db);


	});
}

exports.getUserAgronoms=function (socket,iosockets,db){
	socket.on("getUserAgronoms",function(data){
		$datas=DB.dbGetMore("UserAgronom",data,db);
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserAgronoms', res);
			}

		},"UserAgronom", data,db);
	});
}

exports.getUserLobbyist=function (socket,iosockets,db){
	socket.on("getUserLobbyist",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getUserLobbyist', res);
			}
		},"UserLobbyist", data,db);

	});
}

exports.getUserLobbyists=function (socket,iosockets,db){
	socket.on("getUserLobbyists",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserLobbyists', res);
			}
		},"UserLobbyist", data,db);

	});
}

exports.getUserDirector=function (socket,iosockets,db){
	socket.on("getUserDirector",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getUserDirector', res);
			}},"UserDirector", data,db);

	});
}

exports.getUserDirectors=function (socket,iosockets,db){
	socket.on("getUserDirectors",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserDirectors', res);
			}
		},"UserDirector", data,db);

	});
}

exports.getUserScientific=function (socket,iosockets,db){
	socket.on("getUserScientific",function(data){
		DB.getOther(function(res){dataUS=res;},"UserScientific", data,db);
		if(dataUS!=null) {
			if (typeof(res) != "string") {
				delete dataUS["_id"];
				delete dataUS["Id_User"];
			}
			socket.emit('getUserScientific', dataUS);
		}
		});
	}


exports.getUserScientifics=function (socket,iosockets,db){
	socket.on("getUserScientifics",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserScientifics', res);
			}},"UserScientific", data,db);

	});
}


exports.getUserTraider=function (socket,iosockets,db){
	socket.on("getUserTraider",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getUserTraider', res);
			}},"UserTraider", data,db);

	});
}


exports.getUserTraiders=function (socket,iosockets,db){
	socket.on("getUserTraiders",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserTraiders', res);
			}},"UserTraider", data,db);

	});
}


exports.getUserEmployer=function (socket,iosockets,db){
	socket.on("getUserEmployer",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getUserEmployer', res);
			}},"UserEmployer", data,db);

	});
}

exports.getUserEmployers=function (socket,iosockets,db){
	socket.on("getUserEmployers",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
					}
				}
				socket.emit('getUserEmployers', res);
			}},"UserEmployer", data,db);

	});
}

exports.getUserEmployeerItems=function (socket,iosockets,db){
	socket.on("getUserEmployeerItems",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
				for (var $key in res) {
					delete res[$key]["_id"];
					delete res[$key]["Id_User"];
					delete res[$key]["Type_employer"];
				}}
				socket.emit('getUserEmployeerItems', res);
			}},"UserEmployeerItems", data,db);

	});
}

