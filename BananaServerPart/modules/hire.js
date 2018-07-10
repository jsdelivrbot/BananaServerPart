

var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getHire=function (socket,iosockets,db){
	socket.on("getHire",function(data){
		try {
			$finZap = transformData.in(data);
			if (data != null) {
				DB.getOther(function (res) {
					if (res != null&&res.length!=0) {
							delete res._id;
							delete res.Type_employer;
						socket.emit('getHire', res);
					} else if(res != null&&res.length==0){
						socket.emit('getHire', "-1");
					}else {
						socket.emit('getHire', "-1");
					}
				}, "Hire", transformData.in(data), db);

			}
		}catch(e){
			socket.emit('getHire', "Invalid request format");
		}
	});
}


