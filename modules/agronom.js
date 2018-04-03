
var DB=require("./db.js");

exports.hireAgronom=function (socket,iosockets){
	socket.on("hireAgronom",function(data){
		$datas=DB.dbGetOne("hireAgronom",data);
		if($datas!=null) {
			delete $datas["_id"];
			delete $datas["Id_User"];
			delete $datas["Id_map"];
			delete $datas["Id_parsel"];
			socket.emit('hireAgronom', $datas);
		}
	});
}
