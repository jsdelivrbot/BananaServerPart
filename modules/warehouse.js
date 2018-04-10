var DB=require("./db.js");
var max_level=2;
exports.getWarehouse=function (socket,iosockets){
	socket.on("getWarehouse",function(data){
		$datas=DB.dbGetOne("Warehouse",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getWarehouse', $datas);
		}
	});
}

exports.getWarehouseResources=function (socket,iosockets){
	socket.on("getWarehouseResources",function(data){
		$datas=DB.dbGetOne("WarehouseResources",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getWarehouseResources', $datas);
		}
	});
}

	exports.upgradeWarehouse=function (socket,iosockets){
	socket.on("upgradeWarehouse",function(data) {

		$val = JSON.parse(data);
		if ($val != null) {
			$datas = DB.dbGetOne("Warehouse", JSON.stringify($val));
			console.log($datas);
			if ($datas != null) {
			if ($datas.Level >= max_level) {
				DB.dbUpdateOne("Warehouse", JSON.stringify($val), {"Price_warehouse": "-1"});
				$datas = DB.dbGetOne("Warehouse", JSON.stringify($val));
			}
			if ($datas != null) {
				delete $datas["_id"];
				delete $datas["Id_User"];
				socket.emit('upgradeWarehouse', $datas);
			}
		}
	}
	});
}

