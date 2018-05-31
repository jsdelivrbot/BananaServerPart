
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getGraphicItem=function (socket,iosockets,db){
	socket.on("getGraphicItem",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				socket.emit('getGraphicItem', res);
			}else{
				socket.emit('getGraphicItem', -1);
			}
			},"Graphic",  transformData.in(data),db);

	});
}

exports.getGraphics=function (socket,iosockets,db){
	socket.on("getGraphics",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				for (var $key in res) {
					delete res[$key]["_id"];
				}
				socket.emit('getGraphics', res);
			}},"Graphic",  transformData.in(data),db);

	});
}



