var DB=require("./db.js");
var max_level=30;
exports.getWarehouse=function (socket,iosockets,db){
	socket.on("getWarehouse",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getWarehouse', res);
			}
			},"Warehouse", data,db);

	});
}

exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
				}
				socket.emit('getWarehouseResources', res);
			}
			},"WarehouseResources", data,db);

	});
}

var dataUW1=null;
var dataUW2=null;
var dataResWar=null;
	exports.upgradeWarehouse=function (socket,iosockets,db){
	socket.on("upgradeWarehouse",function(data) {
		try {
			$val = JSON.parse(data);
			if ($val != null) {
				DB.getOther(function (res) {
					dataUW1 = res;
				}, "Warehouse", data, db);
				$user = {"Id_User": $val.Id_User};

				$Level='{"Level":"'+dataUW1["Level"]+'"}';
				DB.getOther(function (res) {
					dataResWar = res;
					delete dataResWar._id;
				}, "WarehouseList", $Level, db);

				if (dataUW1 != null) {
					/*if (Number(dataUW1["Level"]) >= Number(max_level)) {
						$str = {"Price_warehouse": "-1"};
						DB.dbUpdateOne("Warehouse", $user, $str, db);
					}
					DB.getOther(function (res) {
						delete res["_id"];
						delete res["Id_User"];
						socket.emit('upgradeWarehouse', res);
					}, "Warehouse", JSON.stringify($val), db);
*/        console.log(dataResWar);
					socket.emit('upgradeWarehouse', dataResWar);
				} else {
					socket.emit('upgradeWarehouse', "-1");
				}
			} else {
				socket.emit('upgradeWarehouse', "-1");
			}
		}catch(e){
			socket.emit('upgradeWarehouse', "Invalid request format");
		}
	});
}

