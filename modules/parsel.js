var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");

exports.getParselsBase=function (socket,iosockets,db){
	socket.on("getParselsBase",function(data){
		infor=transformData.in(data);
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
				if(typeof(res[0]) !=="undefined") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_map"];
					}
					$inf=res;
					socket.emit('getParselsBase', $inf);
				}else{
					delete res._id;
					delete res.Id_map;
					$inf=res;
					socket.emit('getParselsBase', $inf);
				}}else{
					delete res["_id"];
					delete res["Id_map"];
					$inf=res;
					socket.emit('getParselsBase', $inf);
				}
			}},"ParselBase", infor,db);

	});
}

exports.getParselUser=function (socket,iosockets,db){
	socket.on("getParselUser",function(data){
		try{
		var infor=transformData.in(data);
			createUsers.create(db,infor,function() {
				DB.getOther(function (res) {
					if (res != null) {
						if (typeof(res) != "string") {
							delete res._id;
							delete res.Id_User;
							delete res.Id_map;
						}
						socket.emit('getParselUser', res);
					}
				}, "Parsel", infor, db);
			});
		}catch(e){
			socket.emit('getParselUser', "Invalid request format");
		}
	});

}

exports.getParselsUser=function (socket,iosockets,db){
	socket.on("getParselsUser",function(data){
		infor=transformData.in(data);
		createUsers.create(db,infor,function() {
			DB.getOtherMore(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						for (var $key in res) {
							delete res[$key]._id;
							delete res[$key].Id_User;
							delete res[$key].Id_map;
						}
					}
					socket.emit('getParselsUser', res);
				}
			}, "Parsel", infor, db);
		});
	});
}



exports.buyParsel=function (socket,iosockets,db){
	socket.on("buyParsel",function(data){
		try {
			$finZap = transformData.in(data);
			createUsers.create(db,$finZap,function() {
				$UserPay = {"Id_User": $finZap.Id_User};
				$parseInfos = {"Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel};
				$parseInfosNew = {"Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
				$parseInfosNewUpdate = {"Id_User": $finZap.Id_User, "Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
				$parseInfosChange = {"Id_User": $finZap.Id_User, "Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
				$parselStatus3 = {"Parsel_Status": 3};
				$parselStatus2 = {"Parsel_Status": 2};
				$parselStatus1 = {"Parsel_Status": 1};
				var $userData = null;
				var $dataParsel = null;
				var $dataParselBase = null;
				if ($finZap != null) {
					DB.getOther(function (res) {

						$userData = res;
						DB.getOther(function (res1) {
							$dataParselBase = res1;

							DB.getOther(function (res2) {
								$dataParsel = res2;
								if ($dataParsel != null && $dataParsel.Parsel_Status < 3) {

									if ($userData != null && $dataParselBase != null) {
										$money = {"Money": ($userData.Money - $dataParselBase.Price_Unlock)};
										if($money.Money<0){
											sendNewData($finZap, db, socket);
										}else{
											DB.dbUpdateOne("User", $UserPay, $money, db);
											DB.dbUpdateOne("Parsel", $finZap, $parselStatus3, db);
											DB.getOther(function (res5) {
												if (res5 == null) {
													addNewParse(db, $parseInfosNew, $parselStatus1,$parselStatus3, $finZap.Id_User);
												}
											}, "Parsel", $parseInfosChange, db);
											sendNewData($finZap, db, socket);
										}
									}
								} else if ($dataParsel != null && $dataParsel.Parsel_Status >= 3) {

									sendNewData($finZap, db, socket);
								} else {
									if ($userData != null && $dataParselBase != null) {
										console.log(150);
										$money = {"Money": ($userData.Money - $dataParselBase.Price_Unlock)};
										if ($money.Money < 0) {
											socket.emit('buyParsel', '-1');
										} else {
											DB.dbUpdateOne("User", $UserPay, $money, db);
											$finalDataPay_new = {};
											$finalDataPay_new.Id_User = $finZap.Id_User;
											$finalDataPay_new.Id_parsel = $dataParselBase.Id_parsel;
											$finalDataPay_new.Id_map = $dataParselBase.Id_map;
											$finalDataPay_new.Current_CoolDown_Time = 0;
											$finalDataPay_new.Agronom_buff = 0;
											$finalDataPay_new.Id_Agronom = -1;
											$finalDataPay_new.Parsel_Status = 3;
											$finalDataPay_new.Resource = 0;
											$finalDataPay_new.Fertility = 1;
											$infos = $finZap;
											DB.dbSendOne("Parsel", $finalDataPay_new, db);

											DB.getOther(function (res5) {
												if (res5 == null) {
													addNewParse(db, $parseInfosNew, $parselStatus1,$parselStatus2, $finZap.Id_User, $parseInfosNewUpdate);
												}
											}, "Parsel", $parseInfosChange, db);
											sendNewData($infos, db, socket);
										}
									}
								}
							}, "Parsel", $finZap, db);
						}, "ParselBase", $parseInfos, db);
					}, "User", $UserPay, db);
				}
			});
		}catch(e){
			socket.emit('buyParsel', "Invalid request format");
		}
	});
}


function addNewParse(db,$parseInfosNew,$parselStatus1,$parselStatus2,$id,$parseInfosNewUpdate){

	DB.getOther(function (res3) {
		if (res3 != null) {

			res3.Id_User=$id;
			res3.Current_CoolDown_Time = res3.Base_CoolDown_Time;
			delete res3._id;
			delete res3.Location_Zone;
			delete res3.Price_Unlock;
			delete res3.Price_Install;
			delete res3.Base_CoolDown_Time;
			res3.Agronom_buff = 0;
			res3.Id_Agronom = -1;
			res3.Parsel_Status = 1;
			res3.Resource = 0;
			res3.Fertility = 1;

			DB.dbSendOne("Parsel", res3, db);
		
			updateParselStatus(db, res3.Current_CoolDown_Time, $parseInfosNewUpdate, $parselStatus1,$parselStatus2);
		}
	}, "ParselBase", $parseInfosNew, db);
}

function sendNewData($info,database,socket){

		DB.getOther(function (res4) {
			delete res4._id;
			delete res4.Id_map;
			delete res4.Id_User;
			socket.emit('buyParsel', res4);
		}, "Parsel", $info, database);
	}

function updateParselStatus(db,time,data,$parselStatus1,$parselStatus2){
	cooldown.Colldown(db, "Parsel", time, data,
			$parselStatus2, $parselStatus1, "Current_CoolDown_Time");
}
