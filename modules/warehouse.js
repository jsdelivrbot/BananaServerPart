var DB=require("./db.js");

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
	socket.on("upgradeWarehouse",function(data){
		$val=data;
		if($val!=null) {
			delete $val["Id_User"];
			DB.dbUpdateOne("Warehouse", JSON.parse($val), {"Level":"20"});
			$datas = DB.dbGetOne("Warehouse", data);
			if ($datas != null) {
				delete $datas["_id"];
				delete $datas["Id_User"];
				socket.emit('upgradeWarehouse', $datas);
			}
		}
	});
}

