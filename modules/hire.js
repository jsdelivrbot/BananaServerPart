

var DB=require("./db.js");
exports.getHire=function (socket,iosockets){
	socket.on("getHire",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("Hire", $finZap);
			$datas = DB.dbGetMore("Hire", data);
			if ($datas != null) {
				for (var $key in $datas) {
					delete $datas[$key]["_id"];
					delete $datas[$key]["Type_employer"];
				}
				socket.emit('getHire', $datas);
			}else{
				socket.emit('getHire', "-1");
			}
		}
	});
}


