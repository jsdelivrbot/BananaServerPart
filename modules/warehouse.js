var DB=require("./db.js");
var max_level=2;
exports.getWarehouse=function (socket,iosockets,db){
	socket.on("getWarehouse",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				delete res["Id_User"];
				socket.emit('getWarehouse', res);
			}
			},"Warehouse", data,db);

	});
}

exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				delete res["Id_User"];
				socket.emit('getWarehouseResources', res);
			}
			},"WarehouseResources", data,db);

	});
}

var dataUW1=null;
var dataUW2=null;
	exports.upgradeWarehouse=function (socket,iosockets,db){
	socket.on("upgradeWarehouse",function(data) {
		$val = JSON.parse(data);
		if ($val != null) {
			$datas = DB.dbGetOne("Warehouse", JSON.stringify($val),db);
			DB.getOther(function(res){dataUW1=res;},"Warehouse", data,db);
			$user={"Id_User":$val.Id_User};
			if (dataUW1 != null) {
			if (Number(dataUW1["Level"]) >= Number(max_level)) {
				$str={"Price_warehouse": "-1"};
				DB.dbUpdateOne("Warehouse", $user, $str,db);
			}
				DB.getOther(function(res){
					delete res["_id"];
					delete res["Id_User"];
					socket.emit('upgradeWarehouse', res);
					},"Warehouse",  JSON.stringify($val),db);

		}else{
				socket.emit('upgradeWarehouse', "-1");
			}
	}else{
			socket.emit('upgradeWarehouse', "-1");
		}
	});
}

