
var DB=require("./db.js");
exports.buyEmployer=function (socket,iosockets,db){
	socket.on("buyEmployer",function(data){

		$finZap=JSON.parse(data);

		if(data!=null) {
			$id=DB.getMaxValParam("buyEmployer","Id_employer",db);
			$finZap.Id_employer=$id;
			DB.dbSendOne("buyEmployer",$finZap,db);

			$datas=DB.dbGetOne("buyEmployer",JSON.stringify($finZap),db);
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


exports.getEmployeerItems=function (socket,iosockets,db){
	socket.on("getEmployeerItems",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("EmployeerItems",$finZap,db);
		  $datas=DB.dbGetOne("EmployeerItems",data,db);
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


exports.hireEmployeer=function (socket,iosockets,db){
	socket.on("hireEmployeer",function(data){
		if(data) {
			$hireData=JSON.parse(data);
			$status={"Hire_status":$hireData.Hire_status};
			delete $hireData["Hire_status"];
			DB.dbUpdateOne("hireEmployeer",$hireData,$status,db);
			$datas = DB.dbGetOne("hireEmployeer", data,db);
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




