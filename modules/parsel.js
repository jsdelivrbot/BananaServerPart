var DB=require("./db.js");
exports.getParselsBase=function (socket,iosockets){
	socket.on("getParselsBase",function(data){
		$datas=DB.dbGetMore("ParselsBase",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_map"];
			}
			socket.emit('getParselsBase', $datas);
		}
	});
}


exports.getParselUser=function (socket,iosockets){
	socket.on("getParselUser",function(data){
		$datas=DB.dbGetOne("ParselUser",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			delete $datas["Id_map"];
			socket.emit('getParselUser', $datas);
		}
	});
}

exports.getParselIsUser=function (socket,iosockets){
	socket.on("getParselIsUser",function(data){
		$datas=DB.dbGetMore("ParselUser",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getParselIsUser', $datas);
		}
	});
}


exports.buyParsel=function (socket,iosockets){
	socket.on("buyParsel",function(data){
    $finZap=JSON.parse(data);
		delete $finZap["Id_User"];
		if(data!=null) {
			$dataParsel=DB.dbGetOne("ParselsBase",data);
			//DB.dbSendOne("ParselUser",$finZap);
		  /*$datas=DB.dbGetMore("ParselUser",data);
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
				delete $datas[$key]["Id_map"];
			}*/
			socket.emit('buyParsel', $dataParsel);
		}
	});
}

