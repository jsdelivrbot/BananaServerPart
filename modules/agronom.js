
var DB=require("./db.js");

exports.hireAgronom=function (socket,iosockets,db){
	socket.on("hireAgronom",function(data) {
		if (data != null) {
			$agronomInfo = JSON.parse(data);
			$agronomHireStatus = {"Hire_status": $agronomInfo.Hire_status};
			delete $agronomInfo["Hire_status"];
			DB.dbUpdateOne("hireAgronom", $agronomInfo, $agronomHireStatus,db);
			$datas = DB.dbGetOne("hireAgronom", data,db);
			if ($datas != null) {
				delete $datas["_id"];
				delete $datas["Id_User"];
				delete $datas["Id_map"];
				delete $datas["Id_parsel"];
				socket.emit('hireAgronom', $datas);
			}else{
				socket.emit('hireAgronom', "-1");
			}
		} else {
			socket.emit('hireAgronom', "-1");
		}
	});
}

