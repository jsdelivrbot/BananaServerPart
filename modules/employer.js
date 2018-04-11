
var DB=require("./db.js");

var dataBE=null;
exports.buyEmployer=function (socket,iosockets,db){
	socket.on("buyEmployer",function(data){

		$finZap=JSON.parse(data);

		if(data!=null) {
			$id=DB.getMaxValParam("buyEmployer","Id_employer",db);
			$finZap.Id_employer=$id;
			DB.dbSendOne("buyEmployer",$finZap,db);
			DB.getOther(function(res){dataBE=res;},"buyEmployer", JSON.stringify($finZap),db);
			if(dataBE!=null) {
				delete dataBE["_id"];
				delete dataBE["Id_User"];
				delete dataBE["Job_Offer"];
				socket.emit('buyEmployer', dataBE);
			}else{
				socket.emit('buyEmployer', "-1");
			}
		}
	});
}

var dataEIs=null;
exports.getEmployeerItems=function (socket,iosockets,db){
	socket.on("getEmployeerItems",function(data){
		$finZap=JSON.parse(data);
		if($data!=null) {
			DB.dbSendOne("EmployeerItems",$finZap,db);
			DB.getOther(function(res){dataEIs=res;},"EmployeerItems", data,db);
			if(dataEIs!=null) {
				delete dataEIs["_id"];
				delete dataEIs["Type_employer"];
				socket.emit('getEmployeerItems', dataEIs);
			}else{
				socket.emit('getEmployeerItems', "-1");
			}
		}
	});
}

var dataHE=null;
exports.hireEmployeer=function (socket,iosockets,db){
	socket.on("hireEmployeer",function(data){
		if(data) {
			$hireData=JSON.parse(data);
			$status={"Hire_status":$hireData.Hire_status};
			delete $hireData["Hire_status"];
			DB.dbUpdateOne("hireEmployeer",$hireData,$status,db);
			DB.getOther(function(res){dataHE=res;},"hireEmployeer", data,db);
			if (dataHE != null) {
				delete dataHE["_id"];
				delete dataHE["Id_User"];
				delete dataHE["Hire_position"];
				socket.emit('hireEmployeer', dataHE);
			}
		}else{
			socket.emit('hireEmployeer', "-1");
		}
	});
}




