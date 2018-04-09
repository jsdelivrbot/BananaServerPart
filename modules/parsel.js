var DB=require("./db.js");
exports.getParselsBase=function (socket,iosockets){
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


exports.getParselUser=function (socket,iosockets){
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

exports.getParselIsUser=function (socket,iosockets){
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


exports.buyParsel=function (socket,iosockets){
	socket.on("buyParsel",function(data){
    $finZap=JSON.parse(data);
    $finalDataPay={"Id_User":$finZap.Id_User};
		delete $finZap["Id_User"];
		if(data!=null) {
			$dataParsel=DB.dbGetOne("ParselsBase",JSON.stringify($finZap));
			$userData =DB.dbGetOne("UserBaseInfo",JSON.stringify($finalDataPay));
			console.log($userData);
			console.log($dataParsel);
			/*$money='{"Money":'+$userInfos.Money-$dataParsel.Price_Install+'}';
			DB.dbUpdateOne("UserBaseInfo",JSON.stringify($finalDataPay),$money);
			$finalDataPay.Id_parsel              = $dataParsel.Id_parsel;
			$finalDataPay.Id_map                 = $dataParsel.Id_map;
			$finalDataPay.Current_CoolDown_Time  = $dataParsel.Base_CoolDown_Time;
			$finalDataPay.Agronom_buff           = 0;
			$finalDataPay.Id_Agronom             = -1;
			$finalDataPay.Parsel_Status          = 1;
			$finalDataPay.Resource               = 0;
			$finalDataPay.Fertility              = 1;

		/*	DB.dbSendOne("ParselUser",$finalDataPay);
		  $datas=DB.dbGetOne("ParselUser",data);
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
				delete $datas[$key]["Id_map"];
			}*/
			socket.emit('buyParsel', $userData);
		}
	});
}

