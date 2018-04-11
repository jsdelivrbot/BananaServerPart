

var DB=require("./db.js");
var dataH=null;
exports.getHire=function (socket,iosockets,db){
	socket.on("getHire",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("Hire", $finZap,db);
			DB.getOtherMore(function(res){dataH=res;},"Hire", data,db);
			if (dataH != null) {
				for (var $key in dataH) {
					delete dataH[$key]["_id"];
					delete dataH[$key]["Type_employer"];
				}
				socket.emit('getHire', dataH);
			}else{
				socket.emit('getHire', "-1");
			}
		}
	});
}


