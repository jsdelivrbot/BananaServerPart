


exports.getHire=function (socket,iosockets){
	socket.on("getHire",function(data){
		$datas=DB.dbGetMore("Hire",data);
		if($datas!=null) {
			for (var $key in $datas) {
				delete $datas[$key]["_id"];
				delete $datas[$key]["Type_employer"];
			}
			socket.emit('getHire', $datas);
		}
	});
}


