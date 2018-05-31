var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getMarketPrice=function (socket,iosockets,db){
	socket.on("getMarketPrice",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res._id;
				}
				socket.emit('getMarketPrice', res);
			}},"Market", "",db);

	});
}



