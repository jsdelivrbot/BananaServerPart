
var DB=require("./db.js");

exports.buyEmployer=function (socket,iosockets,db){
	socket.on("buyEmployer",function(data){
		try {
			$finZap = JSON.parse(data);
			if (data != null) {
				$id = DB.getMaxValParam("buyEmployer", "Id_employer", db);
				$finZap.Id_employer = $id;
				DB.dbSendOne("buyEmployer", $finZap, db);
				DB.getOther(function (res) {
					if (res != null) {
						delete res["_id"];
						delete res["Id_User"];
						delete res["Job_Offer"];
						socket.emit('buyEmployer', res);
					} else {
						socket.emit('buyEmployer', "-1");
					}
				}, "buyEmployer", JSON.stringify($finZap), db);

			}
		}catch(e){
			socket.emit('buyEmployer', "Invalid request format");
		}
	});
}


exports.getEmployeerItems=function (socket,iosockets,db){
	socket.on("getEmployeerItems",function(data){
		try {
			$finZap = JSON.parse(data);
				DB.dbSendOne("EmployeerItems", $finZap, db);
				DB.getOther(function (res) {
					if (res != null) {
						delete res["_id"];
						delete res["Type_employer"];
						socket.emit('getEmployeerItems', res);
					} else {
						socket.emit('getEmployeerItems', "-1");
					}
				}, "EmployeerItems", data, db);
		}catch(e){
			socket.emit('getEmployeerItems', "Invalid request format");
		}
	});
}


exports.hireEmployeer=function (socket,iosockets,db){
	socket.on("hireEmployeer",function(data){
			try {
				$hireData = JSON.parse(data);
				$status = {"Hire_status": $hireData.Hire_status};
				delete $hireData["Hire_status"];
				DB.dbUpdateOne("hireEmployeer", $hireData, $status, db);
				DB.getOther(function (res) {
					if (res != null) {
						delete res["_id"];
						delete res["Id_User"];
						delete res["Hire_position"];
						socket.emit('hireEmployeer', res);
					}else{
					socket.emit('hireEmployeer', "-1");
				}
				}, "hireEmployeer", data, db);

		}catch(e){
			socket.emit('hireEmployeer', "Invalid request format");
		}
	});
}




