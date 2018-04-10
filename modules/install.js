var DB=require("./db.js");
exports.getInstallInfo=function (socket,iosockets){
	socket.on("getInstallInfo",function(data){
		$datas=DB.dbGetMore("InstallInfo",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Id_User"];
				delete $datas[$key]["Id_map"];
				delete $datas[$key]["Id_parsel"];
			}
			socket.emit('getInstallInfo', $datas);
		}
	});
}

parselInfos=null;
parselBase=null;
exports.setInstallInfo=function (socket,iosockets){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			$val=JSON.parse(data);

			$resource={"Resource":$val.SelectedResource};
			$user={"Id_User":$val.Id_User};
			delete $val.SelectedResource;
			$parselIndex=JSON.parse(data);
			delete $parselIndex.Id_User;
			delete $parselIndex.SelectedResource;
			DB.getOther(function(res){parselInfos=res; return res;},"UserBaseInfo", JSON.stringify($user));
			DB.getOther(function(res){parselBase=res; return res;},"ParselsBase", JSON.stringify($user));

			console.log(parselInfos);
			console.log(parselBase);
			$money = {"Money":Number(parselInfos.Money) - Number(parselBase.Price_Install)};
			DB.dbUpdateOne("UserBaseInfo", $user, $money);

			DB.dbUpdateOne("InstallInfo", $val, $json);
			DB.dbUpdateOne("ParselUser", $val, $resource);
			$datas = DB.dbGetOne("ParselUser", data);
			if ($datas != null) {

					delete $datas["_id"];
					delete $datas["Id_User"];
					delete $datas["Id_map"];

				socket.emit('setInstallInfo', $datas);
			}
		}
	});
}

