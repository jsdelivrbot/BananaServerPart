

var DB=require("./db.js");
var dataMP=null;
exports.getMarketPrice=function (socket,iosockets){
	socket.on("getMarketPrice",function(data){
		DB.getOther(function(res){dataMP=res;},"MarketPrice", "{}",db);
		if(dataMP!=null) {
			delete dataMP["_id"];
			socket.emit('getMarketPrice', dataMP);
		}
	});
}



