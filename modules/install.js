var DB=require("./db.js");
var transformData=require("./inout.js");
exports.getInstallInfo=function (socket,iosockets,db){
	socket.on("getInstallInfo",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						delete res[$key]["_id"];
						delete res[$key]["Id_User"];
						delete res[$key]["Id_map"];
						delete res[$key]["Id_parsel"];
					}
				}
				socket.emit('getInstallInfo', res);
			}},"InstallInfo", transformData.in(data),db);

	});
}

var parselInfos=null;
var parselBases=null;
exports.setInstallInfo=function (socket,iosockets,db){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			try{

			var $val = transformData.in(data);
			var $resource = {"Resource": $val.SelectedResource};
			var $user = {"Id_User": $val.Id_User};
			delete $val.SelectedResource;
			var $parselIndex = {"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
			var $getInfos={"Id_User":$val.Id_User,"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
			DB.getOther(function (res) {
				parselInfos = res;
			}, "UserBaseInfo", $user,db);
			DB.getOther(function (res) {
				parselBases = res;
			}, "ParselsBase", $parselIndex,db);
			if (parselInfos != null && parselBases != null) {
				console.log(data);
				$money = {"Money": parselInfos.Money - parselBases.Price_Install};
				DB.dbUpdateOne("UserBaseInfo", $user, $money,db);
				DB.dbUpdateOne("ParselUser", $getInfos, $resource,db);


				DB.getOther(function (res) {

				if (res != null) {
					delete res._id;
					delete res.Id_User;
					delete res.Id_map;
					socket.emit('setInstallInfo', res);
				}
				}, 'ParselUser', $getInfos,db);
			}else{
				socket.emit('setInstallInfo', "-1");
			}
		}
		catch(e){
			socket.emit('setInstallInfo', "Invalid request format");
		}}
	});
}

