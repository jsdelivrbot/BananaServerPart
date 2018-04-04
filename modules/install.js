var DB=require("./db.js");
exports.getInstallInfo=function (socket,iosockets){
	socket.on("getInstallInfo",function(data){
		$datas=DB.dbGetMore("InstallInfo",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
				delete $datas[$key]["Id_map"];
				delete $datas[$key]["Id_parsel"];
			}
			socket.emit('getInstallInfo', $datas);
		}
	});
}


exports.setInstallInfo=function (socket,iosockets){
	socket.on("setInstallInfo",function(data){
		$val=JSON.parse(data);
		if($val!=null) {
			$json={"Directors_bonus":"40"};
			DB.dbUpdateOne("InstallInfo", $val, $json);
			$datas = DB.dbGetMore("InstallInfo", data);
			if ($datas != null) {
				for (var $key in $datas) {
					delete $datas[$key]["_id"];
					delete $datas[$key]["Id_User"];
					delete $datas[$key]["Id_map"];
					delete $datas[$key]["Id_parsel"];
				}
				socket.emit('setInstallInfo', $datas);
			}
		}
	});
}

