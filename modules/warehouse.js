var DB=require("./db.js");
var max_level=2;
var dataW=null;
exports.getWarehouse=function (socket,iosockets,db){
	socket.on("getWarehouse",function(data){
		DB.getOther(function(res){dataW=res;},"Warehouse", data,db);
		if(dataW!=null) {
			delete dataW["_id"];
			delete dataW["Id_User"];
			socket.emit('getWarehouse', dataW);
		}
	});
}
var dataWRs=null;
exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		DB.getOther(function(res){dataWRs=res;},"WarehouseResources", data,db);
		if(dataWRs!=null) {
			delete dataWRs["_id"];
			delete dataWRs["Id_User"];
			socket.emit('getWarehouseResources', dataWRs);
		}
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
				DB.getOther(function(res){dataUW2=res;},"Warehouse",  JSON.stringify($val),db);
				delete dataUW2["_id"];
				delete dataUW2["Id_User"];
				socket.emit('upgradeWarehouse', dataUW2);
		}else{
				socket.emit('upgradeWarehouse', "-1");
			}
	}else{
			socket.emit('upgradeWarehouse', "-1");
		}
	});
}

