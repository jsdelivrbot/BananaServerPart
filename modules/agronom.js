
var DB=require("./db.js");

exports.hireAgronom=function (socket,iosockets,db){
	socket.on("hireAgronom",function(data) {
		if (data != null) {
			$agronomInfo = JSON.parse(data);
			$agronomHireStatus = {"Hire_status": $agronomInfo.Hire_status};
			delete $agronomInfo["Hire_status"];
			DB.dbUpdateOne("hireAgronom", $agronomInfo, $agronomHireStatus,db);
			DB.getOther(function(res){
				if (res != null) {
					delete res["_id"];
					delete res["Id_User"];
					delete res["Id_map"];
					delete res["Id_parsel"];
					socket.emit('hireAgronom', res);
				}else{
					socket.emit('hireAgronom', "-1");
				}

			},"hireAgronom", data,db);

		} else {
			socket.emit('hireAgronom', "-1");
		}
	});
}

