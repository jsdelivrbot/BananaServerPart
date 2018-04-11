
var DB=require("./db.js");
var dataHA=null;
exports.hireAgronom=function (socket,iosockets,db){
	socket.on("hireAgronom",function(data) {
		if (data != null) {
			$agronomInfo = JSON.parse(data);
			$agronomHireStatus = {"Hire_status": $agronomInfo.Hire_status};
			delete $agronomInfo["Hire_status"];
			DB.dbUpdateOne("hireAgronom", $agronomInfo, $agronomHireStatus,db);
			DB.getOther(function(res){dataHA=res;},"hireAgronom", data,db);
			if (dataHA != null) {
				delete dataHA["_id"];
				delete dataHA["Id_User"];
				delete dataHA["Id_map"];
				delete dataHA["Id_parsel"];
				socket.emit('hireAgronom', dataHA);
			}else{
				socket.emit('hireAgronom', "-1");
			}
		} else {
			socket.emit('hireAgronom', "-1");
		}
	});
}

