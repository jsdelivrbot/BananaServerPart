
var DB=require("./db.js");
exports.getGraphicItem=function (socket,iosockets){
	socket.on("getGraphicItem",function(data){
		$datas=DB.dbGetOne("GraphicItem",data);
		if($datas!=null) {
			delete $datas["_id"];
			socket.emit('getGraphicItem', $datas);
		}
	});
}


exports.getGraphics=function (socket,iosockets){
	socket.on("getGraphics",function(data){
		$datas=DB.dbGetMore("GraphicItem","{}");
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
			}
			socket.emit('getGraphics', $datas);
		}
	});
}



