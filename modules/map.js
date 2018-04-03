var DB=require("./db.js");
exports.getMapBase=function (socket,iosockets){
	socket.on("getMapBase",function(data){
		$datas=DB.dbGetOne("Map",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_map"];
			socket.emit('getMapBase', $datas);
		}
	});
}
