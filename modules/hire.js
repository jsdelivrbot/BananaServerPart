

var DB=require("./db.js");

exports.getHire=function (socket,iosockets,db){
	socket.on("getHire",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("Hire", $finZap,db);
			DB.getOtherMore(function(res){
				if (res != null) {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Type_employer"];
					}
					socket.emit('getHire', res);
				}else{
					socket.emit('getHire', "-1");
				}},"Hire", data,db);

		}
	});
}


