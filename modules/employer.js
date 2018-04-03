
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




