var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getInstallInfo=function (socket,iosockets,db){
	socket.on("getInstallInfo",function(data){
		createUsers.create(db,transformData.in(data),function() {
			DB.getOtherMore(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						for (var $key in res) {
							delete res[$key]["_id"];
							delete res[$key]["Id_User"];
							delete res[$key]["Id_map"];
							delete res[$key]["Id_parsel"];
						}
					}
					socket.emit('getInstallInfo', res);
				}
			}, "Install", transformData.in(data), db);
		});
	});
}


exports.setInstallInfo=function (socket,iosockets,db){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			try{
				var parselInfos=null;
				var parselBases=null;
			  var $val = transformData.in(data);
				createUsers.create(db,$val,function() {
					var $resource = {"Resource": $val.SelectedResource, "Parsel_Status": 4};
					var $user = {"Id_User": $val.Id_User};
					delete $val.SelectedResource;
					var $parselIndex = {"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
					var $getInfos = {"Id_User": $val.Id_User, "Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
					DB.getOther(function (res) {
						parselInfos = res;

						DB.getOther(function (res) {
							parselBases = res;
							if (parselInfos != null && parselBases != null) {
								$money = {"Money": parselInfos.Money - parselBases.Price_Install};
								if($money.Money<0){
									delete parselBases._id;
									socket.emit('setInstallInfo', parselBases);
								}else{
								DB.dbUpdateCallback("Parsel", $getInfos, $resource, db, function (res) {
									DB.getOther(function (res) {
										if (res != null) {
											delete res._id;
											delete res.Id_User;
											delete res.Id_map;
											socket.emit('setInstallInfo', res);
										}
									}, 'Parsel', $getInfos, db);
								});

									DB.dbUpdateOne("User", $user, $money, db);
								}

							} else {
								socket.emit('setInstallInfo', parselBases);
							}
						}, "ParselBase", $parselIndex, db);
					}, "User", $user, db);

				});
		}catch(e){
			socket.emit('setInstallInfo', "Invalid request format");
		}}
	});
}

