var DB=require("./db.js");
var dataMB=null;
exports.getMapBase=function (socket,iosockets,db){
	socket.on("getMapBase",function(data){
		DB.getOther(function(res){dataMB=res;},"Map", data,db);
		if(dataMB!=null) {
			delete dataMB["_id"];
			delete dataMB["Id_map"];
			socket.emit('getMapBase', dataMB);
		}
	});
}
