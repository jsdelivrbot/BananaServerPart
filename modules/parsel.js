var DB=require("./db.js");

var dataPB=null;

exports.getParselsBase=function (socket,iosockets,db){
	socket.on("getParselsBase",function(data){
		DB.getOtherMore(function(res){dataPB=res;},"ParselsBase", data,db);
		if(dataPB!=null) {
			for (var $key in dataPB) {
				delete dataPB[$key]["_id"];
				delete dataPB[$key]["Id_map"];
			}
			socket.emit('getParselsBase', dataPB);
		}
	});
}

var dataPU=null;
exports.getParselUser=function (socket,iosockets,db){
	socket.on("getParselUser",function(data){
		DB.getOther(function(res){dataPU=res;},"ParselUser", data,db);
		if(dataPU!=null) {
			delete dataPU["_id"];
			delete dataPU["Id_User"];
			delete dataPU["Id_map"];
			socket.emit('getParselUser', dataPU);
		}
	});
}
var dataPUs=null;
exports.getParselsUser=function (socket,iosockets,db){
	socket.on("getParselsUser",function(data){
		DB.getOtherMore(function(res){dataPUs=res;},"ParselUser", data,db);
		if(dataPUs!=null) {
			for (var $key in dataPUs) {
				delete dataPUs[$key]["_id"];
				delete dataPUs[$key]["Id_User"];
			}
			socket.emit('getParselsUser', dataPUs);
		}
	});
}
userInfos=null;
parselinfo=null;
var dataBP=null;
exports.buyParsel=function (socket,iosockets,db){
	socket.on("buyParsel",function(data){
    $finZap=JSON.parse(data);

    $finalDataPay={"Id_User":$finZap.Id_User};
    $user={"Id_User":$finZap.Id_User};
		var $userData=null;
		var $dataParsel=null;
		$dataParsel="";


		delete $finZap["Id_User"];
		if(data!=null) {

				DB.getOther(function(res){userInfos=res; return res;},"UserBaseInfo", JSON.stringify($finalDataPay),db);
				$userData=userInfos;
				DB.getOther(function(res){parselinfo=res; return res;},"ParselsBase", JSON.stringify($finZap),db);
				$dataParsel=parselinfo;
				if($userData!=null && $dataParsel!=null) {
					$money = {"Money":Number($userData.Money) - Number($dataParsel.Price_Unlock)};
					DB.dbUpdateOne("UserBaseInfo", $user, $money,db);
					$finalDataPay.Id_parsel = $dataParsel["Id_parsel"];
					$finalDataPay.Id_map = $dataParsel["Id_map"];
					$finalDataPay.Current_CoolDown_Time = $dataParsel["Base_CoolDown_Time"];
					$finalDataPay.Agronom_buff = 0;
					$finalDataPay.Id_Agronom = -1;
					$finalDataPay.Parsel_Status = 1;
					$finalDataPay.Resource = 0;
					$finalDataPay.Fertility = 1;

					 DB.dbSendOne("ParselUser",$finalDataPay,db);
					 DB.getOther(function(res){dataBP=res;},"ParselUser", data,db);
					 if(dataBP!=null) {
						 delete dataBP["_id"];
						 delete dataBP["Id_User"];
						 delete dataBP["Id_map"];
						 socket.emit('buyParsel', dataBP);
					 }


				}
		}
	});
}

