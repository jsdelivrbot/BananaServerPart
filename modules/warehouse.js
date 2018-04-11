var DB=require("./db.js");
var max_level=2;
exports.getWarehouse=function (socket,iosockets,db){
	socket.on("getWarehouse",function(data){
		$datas=DB.dbGetOne("Warehouse",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getWarehouse', $datas);
		}
	});
}

exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		$datas=DB.dbGetOne("WarehouseResources",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			socket.emit('getWarehouseResources', $datas);
		}
	});
}

	exports.upgradeWarehouse=function (socket,iosockets,db){
	socket.on("upgradeWarehouse",function(data) {
		$val = JSON.parse(data);
		if ($val != null) {
			$datas = DB.dbGetOne("Warehouse", JSON.stringify($val));
			$user={"Id_User":$val.Id_User};
			if ($datas != null) {
			if (Number($datas["Level"]) >= Number(max_level)) {
				$str={"Price_warehouse": "-1"};
				DB.dbUpdateOne("Warehouse", $user, $str);
				DB.dbUpdateOne("Warehouse", $user, $str);
				$datas = DB.dbGetOne("Warehouse", JSON.stringify($val));
			}
				delete $datas["_id"];
				delete $datas["Id_User"];
				socket.emit('upgradeWarehouse', $datas);
		}else{
				socket.emit('upgradeWarehouse', "-1");
			}
	}else{
			socket.emit('upgradeWarehouse', "-1");
		}
	});
}

