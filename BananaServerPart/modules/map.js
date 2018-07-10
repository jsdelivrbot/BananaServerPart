var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getMapBase=function (socket,iosockets,db){
	socket.on("getMapBase",function(data){

		DB.getOtherMore(function(res){
			$parsels={"Parsel_count":res.length};
			DB.dbUpdateOne("Map", transformData.in(data), $parsels, db);
		},"Parsel",{},db);

	
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_map"];
				}
				socket.emit('getMapBase', res);
			}},"Map", transformData.in(data),db);

	
	});
}
