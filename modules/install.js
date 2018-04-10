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

var parselInfos=null;
var parselBases=null;
exports.setInstallInfo=function (socket,iosockets){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			$val = JSON.parse(data);

			$resource = {"Resource": $val.SelectedResource};
			$user = {"Id_User": $val.Id_User};
			delete $val.SelectedResource;
			$parselIndex = {"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
			$getInfos=$parselIndex;
			$getInfos.Id_User=$val.Id_User;
			DB.getOther(function (res) {
				parselInfos = res;
				return res;
			}, "UserBaseInfo", JSON.stringify($user));
			DB.getOther(function (res) {
				parselBases = res;
				return res;
			}, "ParselsBase", JSON.stringify($parselIndex));
			console.log($parselIndex);
			console.log(parselBase);
			if (parselInfos != null && parselBase != null) {
				$money = {"Money": Number(parselInfos.Money) - Number(parselBase.Price_Install)};
				DB.dbUpdateOne("UserBaseInfo", $user, $money);
				DB.dbUpdateOne("ParselUser", $getInfos, $resource);

				$datas = DB.dbGetOne("ParselUser", JSON.stringify($getInfos));
				if ($datas != null) {
					delete $datas["_id"];
					delete $datas["Id_User"];
					delete $datas["Id_map"];
					socket.emit('setInstallInfo', $datas);
				}
			}
		}
	});
}

