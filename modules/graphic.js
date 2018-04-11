
var DB=require("./db.js");

var dataGI=null;
exports.getGraphicItem=function (socket,iosockets,db){
	socket.on("getGraphicItem",function(data){
		DB.getOther(function(res){dataGI=res;},"GraphicItem", data,db);
		if(dataGI!=null) {
			delete dataGI["_id"];
			socket.emit('getGraphicItem', dataGI);
		}
	});
}

var dataGs=null;
exports.getGraphics=function (socket,iosockets,db){
	socket.on("getGraphics",function(data){
		DB.getOtherMore(function(res){dataGs=res;},"GraphicItem", data,db);
		if(dataGs!=null) {
			for (var $key in dataGs) {
				delete dataGs[$key]["_id"];
			}
			socket.emit('getGraphics', dataGs);
		}
	});
}



