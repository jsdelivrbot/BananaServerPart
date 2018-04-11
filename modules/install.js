var DB=require("./db.js");
exports.getInstallInfo=function (socket,iosockets,db){
	socket.on("getInstallInfo",function(data){
		$datas=DB.dbGetMore("InstallInfo",data,db);
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
exports.setInstallInfo=function (socket,iosockets,db){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			var $val = JSON.parse(data);
			var $resource = {"Resource": $val.SelectedResource};
			var $user = {"Id_User": $val.Id_User};
			delete $val.SelectedResource;
			var $parselIndex = {"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
			var $getInfos={"Id_User":$val.Id_User,"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
			DB.getOther(function (res) {
				parselInfos = res;
			}, "UserBaseInfo", JSON.stringify($user),db);
			DB.getOther(function (res) {
				parselBases = res;
			}, "ParselsBase", JSON.stringify($parselIndex),db);
			if (parselInfos != null && parselBases != null) {
				$money = {"Money": Number(parselInfos.Money) - Number(parselBases.Price_Install)};
				DB.dbUpdateOne("UserBaseInfo", $user, $money,db);
				DB.dbUpdateOne("ParselUser", $getInfos, $resource,db);
				$datas = DB.dbGetOne("ParselUser", JSON.stringify($getInfos),db);
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

