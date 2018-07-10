var DB=require("./db.js");
var max_level=30;
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var rankStatus=require("./rankStatus.js");

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
						delete res["Resource"];
					}
					socket.emit('getWarehouse', res);
				}
			}, "Warehouse", transformData.in(data), db);
		});
	});
}

exports.getWarehouses=function (socket,iosockets,db){
	socket.on("getWarehouses",function(data){
		createUsers.create(db,transformData.in(data),function() {
			DB.getOtherMore(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						for (var key in res) {
							delete res[key]["_id"];

							delete res[key]["Id_User"];
							delete res[key]["Id_agronom"];
							delete res[key]["Banana_count"];
							delete res[key]["Sugar_count"];
							delete res[key]["Tobacco_count"];
							delete res[key]["Coffee_count"];
							delete res["Resource"];
						}
					}
					socket.emit('getWarehouses', res);
				}
			}, "Warehouse", transformData.in(data), db);
		});
	});
}

exports.getWarehouseResources=function (socket,iosockets,db){
	socket.on("getWarehouseResources",function(data){
		createUsers.create(db,transformData.in(data),function() {
			DB.getOtherMore(function (res) {
				$bg=new RegExp("{",'gi');
				$ag=new RegExp("}",'gi');
				$result="{";
				if (res != null) {
					if (typeof(res) != "string") {
						for(var key in res) {
							delete res[key]["_id"];
							delete res[key]["Id_User"];
							delete res[key]["Id_agronom"];
							delete res[key]["Level"];
							delete res[key]["Max_size"];
							delete res[key]["Price_warehouse"];
							delete res[key]["Resource"];
							delete res[key]["Max_level"];
							$result+=JSON.stringify(res[key]).replace($bg,"").replace($ag,"")+",";
						}
						$str=$result.substring(0, $result.length  - 1);
						$str+="}";
						
					}
					socket.emit('getWarehouseResources', JSON.parse($str));
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
				$userRank={"Id_User":$val.Id_User};
				createUsers.create(db,$val,function() {
				DB.getOther(function (res) {
					dataUW1 = res;
					$user = {"Id_User": $val.Id_User};
					$userWrehouse={"Id_User": $val.Id_User,"Resource": $val.Resource}
					$Level = {"Level": (parseInt(dataUW1.Level) + 1)};


					DB.getOther(function (res) {
						if(res!=null) {
							dataResWar = res;
							delete dataResWar._id;
							$Level.Price_warehouse = dataResWar.Price;
							$Level.Max_size=dataResWar.Capacity;

							rankStatus.addMore("For_warehouse", $Level.Max_size, $userRank, db);
							rankStatus.addMore("In_warehouses", dataResWar.Price, $userRank, db);
							rankStatus.addRank("Player_rank",25,$userRank,db);
							if (dataUW1 != null && dataResWar != null) {
								if (Number(dataUW1["Level"]) >= Number(max_level)) {
									dataResWar.Price_warehouse = "-1";


									DB.dbUpdateOne("User", $user, $money, db);

											DB.dbUpdateCallback("Warehouse", $userWrehouse, dataResWar, db, function (res) {

												DB.getOther(function (res) {
													delete res._id;
													delete res.Id_User;
													delete res.Banana_count;
													delete res.Sugar_count;
													delete res.Tobacco_count;
													delete res.Coffee_count;
													socket.emit('upgradeWarehouse', res);
												}, "Warehouse", $userWrehouse, db);
											});
								} else {
						DB.getOther(function (resUser) {

							DB.getOther(function (res) {
								$money = {"Money": resUser.Money - res.Price_warehouse};
									DB.dbUpdateOne("User", $user, $money, db);
							}, "Warehouse", $userWrehouse, db);

										DB.dbUpdateCallback("Warehouse", $userWrehouse, $Level, db, function (res) {
											DB.getOther(function (res) {

													DB.dbUpdateOne("User", $user, $money, db);
													delete res._id;
													delete res.Id_User;
													delete res.Banana_count;
													delete res.Sugar_count;
													delete res.Tobacco_count;
													delete res.Coffee_count;
													socket.emit('upgradeWarehouse', res);
											}, "Warehouse", $userWrehouse, db);
										});

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

