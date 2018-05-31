
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.buffTraderItem=function (socket,iosockets,db){
	socket.on("buffTraderItem",function(data){
		try {

			$finZap1 = transformData.in(data);
			$Fuser={};
			$Fuser.Id_User=$finZap1.Id_User;
			$Fuser.Type_employer= { $ne: 0};
			$Fuser.Position=$finZap1.Hire_position;
			createUsers.create(db,$finZap1,function() {
				console.log($Fuser);
				DB.getOtherMore(function (res) {
					if (res != null && res.length!=0) {
						if (typeof(res) != "string") {
							for (var $key in res) {
								delete res[$key]["_id"];
								delete res[$key]["Id_User"];
								delete res[$key]["Type_employer"];
								delete res[$key]["Position"];
							}
						}
						socket.emit('buffTraderItem', res);
					}else{
						socket.emit('buffTraderItem', -1);
					}
				}, "UserEmployeerItems", $Fuser, db);
			});
		}catch(e){
			socket.emit('buffTraderItem', "Invalid request format");
		}
	});
}



