var DB=require("./db.js");

exports.getParselsBase=function (socket,iosockets,db){
	socket.on("getParselsBase",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				console.log(res.count());
				for (var $key in res) {
					console.log($key);
					delete res[$key]["_id"];
					delete res[$key]["Id_map"];
				}
				socket.emit('getParselsBase', res);
			}},"ParselsBase", data,db);

	});
}

exports.getParselUser=function (socket,iosockets,db){
	socket.on("getParselUser",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				delete res["Id_User"];
				delete res["Id_map"];
				socket.emit('getParselUser', res);
			}},"ParselUser", data,db);

	});
}

exports.getParselsUser=function (socket,iosockets,db){
	socket.on("getParselsUser",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				for (var $key in res) {
					delete res[$key]["_id"];
					delete res[$key]["Id_User"];
				}
				socket.emit('getParselsUser', res);
			}},"ParselUser", data,db);

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
					 DB.getOther(function(res){
					 	if(res!=null) {
						 delete res["_id"];
						 delete res["Id_User"];
						 delete res["Id_map"];
						 socket.emit('buyParsel', res);
					 }else{
						  socket.emit('buyParsel', -1);
					  }},"ParselUser", data,db);



				}
		}
	});
}

