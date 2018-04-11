var DB=require("./db.js");

exports.getParselsBase=function (socket,iosockets,db){
	socket.on("getParselsBase",function(data){
		$datas=DB.dbGetMore("ParselsBase",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_map"];
			}
			socket.emit('getParselsBase', $datas);
		}
	});
}


exports.getParselUser=function (socket,iosockets,db){
	socket.on("getParselUser",function(data){
		$datas=DB.dbGetOne("ParselUser",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			delete $datas["Id_map"];
			socket.emit('getParselUser', $datas);
		}
	});
}

exports.getParselIsUser=function (socket,iosockets,db){
	socket.on("getParselIsUser",function(data){
		$datas=DB.dbGetMore("ParselUser",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
			}
			socket.emit('getParselIsUser', $datas);
		}
	});
}
userInfos=null;
parselinfo=null;
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

				DB.getOther(function(res){userInfos=res; return res;},"UserBaseInfo", JSON.stringify($finalDataPay));
				$userData=userInfos;
				DB.getOther(function(res){parselinfo=res; return res;},"ParselsBase", JSON.stringify($finZap));
				$dataParsel=parselinfo;
				if($userData!=null && $dataParsel!=null) {
					$money = {"Money":Number($userData.Money) - Number($dataParsel.Price_Unlock)};
					DB.dbUpdateOne("UserBaseInfo", $user, $money);
					$finalDataPay.Id_parsel = $dataParsel["Id_parsel"];
					$finalDataPay.Id_map = $dataParsel["Id_map"];
					$finalDataPay.Current_CoolDown_Time = $dataParsel["Base_CoolDown_Time"];
					$finalDataPay.Agronom_buff = 0;
					$finalDataPay.Id_Agronom = -1;
					$finalDataPay.Parsel_Status = 1;
					$finalDataPay.Resource = 0;
					$finalDataPay.Fertility = 1;

					 DB.dbSendOne("ParselUser",$finalDataPay);
					 $datas=DB.dbGetOne("ParselUser",data);
					 if($datas!=null) {
						 delete $datas["_id"];
						 delete $datas["Id_User"];
						 delete $datas["Id_map"];
						 socket.emit('buyParsel', $datas);
					 }


				}
		}
	});
}

