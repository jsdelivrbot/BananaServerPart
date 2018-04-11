
var DB=require("./db.js");
exports.getGraphicItem=function (socket,iosockets,db){
	socket.on("getGraphicItem",function(data){
		$datas=DB.dbGetOne("GraphicItem",data,db);
		if($datas!=null) {
			delete $datas["_id"];
			socket.emit('getGraphicItem', $datas);
		}
	});
}


exports.getGraphics=function (socket,iosockets,db){
	socket.on("getGraphics",function(data){
		$datas=DB.dbGetMore("GraphicItem","{}",db);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
			}
			socket.emit('getGraphics', $datas);
		}
	});
}



