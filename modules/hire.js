

var DB=require("./db.js");
var transformData=require("./inout.js");
exports.getHire=function (socket,iosockets,db){
	socket.on("getHire",function(data){
		try {
			$finZap = JSON.parse(data);
			if ($data != null) {
				DB.dbSendOne("Hire", $finZap, db);
				DB.getOtherMore(function (res) {
					if (res != null) {
						for (var $key in res) {
							delete res[$key]["_id"];
							delete res[$key]["Type_employer"];
						}
						socket.emit('getHire', res);
					} else {
						socket.emit('getHire', "-1");
					}
				}, "Hire", transformData.in(data), db);

			}
		}catch(e){
			socket.emit('getHire', "Invalid request format");
		}
	});
}


