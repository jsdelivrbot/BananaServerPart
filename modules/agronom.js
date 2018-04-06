
var DB=require("./db.js");

exports.hireAgronom=function (socket,iosockets){
	socket.on("hireAgronom",function(data) {
		if (data != null) {
			$agronomInfo = JSON.parse();
			$agronomHireStatus = {"Hire_status": $agronomInfo.Hire_status};
			delete $agronomInfo["Hire_status"];
			DB.dbUpdateOne("hireAgronom", $agronomInfo, $agronomHireStatus);
			$datas = DB.dbGetOne("hireAgronom", data);
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

