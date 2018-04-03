
var DB=require("./db.js");
exports.buyEmployer=function (socket,iosockets){
	socket.on("buyEmployer",function(data){
		$datas=DB.dbGetOne("buyEmployer",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			delete $datas["Job_Offer"];
			socket.emit('buyEmployer', $datas);
		}
	});
}


exports.getEmployeerItems=function (socket,iosockets){
	socket.on("getEmployeerItems",function(data){
		$datas=DB.dbGetOne("EmployeerItems",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Type_employer"];
			socket.emit('getEmployeerItems', $datas);
		}
	});
}


exports.hireEmployeer=function (socket,iosockets){
	socket.on("hireEmployeer",function(data){
		$datas=DB.dbGetOne("hireEmployeer",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			delete $datas["Hire_position"];
			socket.emit('hireEmployeer', $datas);
		}
	});
}




