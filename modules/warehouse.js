var DB=require("./db.js");
var max_level=30;
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getWarehouse=function (socket,iosockets,db){
	socket.on("getWarehouse",function(data){
		createUsers.create(db,transformData.in(data),function() {
			DB.getOther(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						delete res["_id"];
						delete res["Id_User"];
						delete res["Id_agronom"];
						delete res["Banana_count"];
						delete res["Sugar_count"];
						delete res["Tobacco_count"];
						delete res["Coffee_count"];
					}
					socket.emit('getWarehouse', res);
				}
			}, "Warehouse", transformData.in(data), db);
		});
	});
}

exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		createUsers.create(db,transformData.in(data),function() {
			DB.getOther(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						delete res["_id"];
						delete res["Id_User"];
						delete res["Id_agronom"];
						delete res["Level"];
						delete res["Max_size"];
						delete res["Price_warehouse"];
					}
					socket.emit('getWarehouseResources', res);
				}
			}, "Warehouse", transformData.in(data), db);
		});
	});
}


	exports.upgradeWarehouse=function (socket,iosockets,db){
	socket.on("upgradeWarehouse",function(data) {
		try {
			var dataUW1=null;
			var dataResWar=null;
			if (data != null) {
				$val = transformData.in(data);
				createUsers.create(db,$val,function() {
				DB.getOther(function (res) {
					dataUW1 = res;
					$user = {"Id_User": $val.Id_User};
					$Level = {"Level": (parseInt(dataUW1.Level) + 1)};
					DB.getOther(function (res) {
						if(res!=null) {
							dataResWar = res;
							delete dataResWar._id;
							$Level.Price_warehouse = dataResWar.Price;
							if (dataUW1 != null && dataResWar != null) {
								if (Number(dataUW1["Level"]) >= Number(max_level)) {
									dataResWar.Price_warehouse = "-1";


									DB.dbUpdateOne("User", $user, $money, db);
											DB.dbUpdateCallback("Warehouse", $user, dataResWar, db, function (res) {
												DB.getOther(function (res) {
													delete res._id;
													delete res.Id_User;
													delete res.Banana_count;
													delete res.Sugar_count;
													delete res.Tobacco_count;
													delete res.Coffee_count;
													socket.emit('upgradeWarehouse', res);
												}, "Warehouse", $user, db);
											});
								} else {
						DB.getOther(function (resUser) {
									$money = {"Money": resUser.Money - dataResWar.Price};
									DB.dbUpdateOne("User", $user, $money, db);
									console.log($user);
									if ($money.Money < 0) {
										socket.emit('upgradeWarehouse', -1);
									} else {
										DB.dbUpdateCallback("Warehouse", $user, $Level, db, function (res) {
											DB.getOther(function (res) {
												delete res._id;
												delete res.Id_User;
												delete res.Banana_count;
												delete res.Sugar_count;
												delete res.Tobacco_count;
												delete res.Coffee_count;
												socket.emit('upgradeWarehouse', res);
											}, "Warehouse", $user, db);
										});
									}
									}, "User", $user, db)
								}
							} else {
								socket.emit('upgradeWarehouse', "-1");
							}
						}
					}, "WarehouseAll", $Level, db);
				}, "Warehouse", $val, db);
			});
			} else {
				socket.emit('upgradeWarehouse', "-1");
			}
		}catch(e){
			socket.emit('upgradeWarehouse', "Invalid request format");
		}
	});
}

