var DB=require("./db.js");
exports.getMarketPrice=function (socket,iosockets){
	socket.on("getMarketPrice",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				socket.emit('getMarketPrice', res);
			}},"MarketPrice", "{}",db);

	});
}



