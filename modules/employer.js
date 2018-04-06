
var DB=require("./db.js");
exports.buyEmployer=function (socket,iosockets){
	socket.on("buyEmployer",function(data){

		$finZap=JSON.parse(data);

		if(data!=null) {
			DB.dbSendOne("buyEmployer",$finZap);
			$datas=DB.dbGetOne("buyEmployer",data);
			if($datas!=null) {
				delete $datas["_id"];
				delete $datas["Id_User"];
				delete $datas["Job_Offer"];
				socket.emit('buyEmployer', $datas);
			}else{
				socket.emit('buyEmployer', "-1");
			}
		}
	});
}


exports.getEmployeerItems=function (socket,iosockets){
	socket.on("getEmployeerItems",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("EmployeerItems",$finZap);
		  $datas=DB.dbGetOne("EmployeerItems",data);
			if($datas!=null) {
				delete $datas["_id"];
				delete $datas["Type_employer"];
				socket.emit('getEmployeerItems', $datas);
			}else{
				socket.emit('getEmployeerItems', "-1");
			}
		}
	});
}


exports.hireEmployeer=function (socket,iosockets){
	socket.on("hireEmployeer",function(data){
		if(data) {
			$hireStatus=JSON.parse(data);
			console.log($hireStatus.Hire_status)
			$datas = DB.dbGetOne("hireEmployeer", data);
			if ($datas != null) {
				delete $datas["_id"];
				delete $datas["Id_User"];
				delete $datas["Hire_position"];
				socket.emit('hireEmployeer', $datas);
			}
		}else{
			socket.emit('hireEmployeer', "-1");
		}
	});
}




