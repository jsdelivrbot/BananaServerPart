var DB=require("./db.js");

exports.getMapBase=function (socket,iosockets,db){
	socket.on("getMapBase",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_map"];
				}
				socket.emit('getMapBase', res);
			}},"Map", data,db);

	});
}
