var DB=require("./db.js");
var transformData=require("./inout.js");
exports.getParselsBase=function (socket,iosockets,db){
	socket.on("getParselsBase",function(data){
		infor=transformData.in(data);
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
				if(!isNaN(res[0])) {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_map"];
					}
					socket.emit('getParselsBase', res);
				}else{
					delete res["_id"];
					delete res["Id_map"];
					socket.emit('getParselsBase', res);
				}}else{
					socket.emit('getParselsBase', res);
				}
			}},"ParselsBase", infor,db);

	});
}

exports.getParselUser=function (socket,iosockets,db){
	socket.on("getParselUser",function(data){
		infor=transformData.in(data);
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res["_id"];
					delete res["Id_User"];
					delete res["Id_map"];
				}
				socket.emit('getParselUser', res);
			}},"ParselUser", infor,db);

	});
}

exports.getParselsUser=function (socket,iosockets,db){
	socket.on("getParselsUser",function(data){
		infor=transformData.in(data);
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
				for (var $key in res) {
					delete res[$key]["_id"];
					delete res[$key]["Id_User"];
				}}
				socket.emit('getParselsUser', res);
			}},"ParselUser", infor,db);

	});
}
userInfos=null;
parselinfo=null;
var dataBP=null;
exports.buyParsel=function (socket,iosockets,db){
	socket.on("buyParsel",function(data){
		try {
			$finZap = transformData.in(data);

			$finalDataPay = {"Id_User": $finZap.Id_User};
			$user = {"Id_User": $finZap.Id_User};
			var $userData = null;
			var $dataParsel = null;
			$dataParsel = "";


			delete $finZap["Id_User"];
			if (data != null) {

				DB.getOther(function (res) {
					userInfos = res;
					return res;
				}, "UserBaseInfo", JSON.stringify($finalDataPay), db);
				$userData = userInfos;
				DB.getOther(function (res) {
					parselinfo = res;
					return res;
				}, "ParselsBase", JSON.stringify($finZap), db);
				$dataParsel = parselinfo;
				if ($userData != null && $dataParsel != null) {
					$money = {"Money": Number($userData.Money) - Number($dataParsel.Price_Unlock)};
					DB.dbUpdateOne("UserBaseInfo", $user, $money, db);
					$finalDataPay.Id_parsel = $dataParsel["Id_parsel"];
					$finalDataPay.Id_map = $dataParsel["Id_map"];
					$finalDataPay.Current_CoolDown_Time = $dataParsel["Base_CoolDown_Time"];
					$finalDataPay.Agronom_buff = 0;
					$finalDataPay.Id_Agronom = -1;
					$finalDataPay.Parsel_Status = 1;
					$finalDataPay.Resource = 0;
					$finalDataPay.Fertility = 1;

					DB.dbSendOne("ParselUser", $finalDataPay, db);
					DB.getOther(function (res) {
						if (res != null) {
							delete res["_id"];
							delete res["Id_User"];
							delete res["Id_map"];
							socket.emit('buyParsel', res);
						} else {
							socket.emit('buyParsel', -1);
						}
					}, "ParselUser", data, db);


				}
			}
		}catch(e){
			socket.emit('buyParsel', "Invalid request format");
		}
	});
}

