

var DB=require("./db.js");
exports.getMarketPrice=function (socket,iosockets){
	socket.on("getMarketPrice",function(data){
		$datas=DB.dbGetOne("MarketPrice","{}");
		if($datas!=null) {
			delete $datas["_id"];
			socket.emit('getMarketPrice', $datas);
		}
	});
}



