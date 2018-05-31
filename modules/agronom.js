
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.hireAgronom=function (socket,iosockets,db){
	socket.on("hireAgronom",function(data) {
			try {

				$hireData = transformData.in(data);
				createUsers.create(db,$hireData,function() {
					$dat = transformData.in(data);
					$dat2 = transformData.in(data);
					$dat2.Type_employer=0;
					$dat2.Id_employer=$dat2.Id_agronom;
					$idEmployer={"Id_employer":$dat.Id_agronom,"Id_User":$dat.Id_User};

					$parselFind={"Id_User":$dat.Id_User,
						"Id_map":$dat.Id_map,
						"Id_parsel":$dat.Id_parsel}
						if($dat.Hire_status!=0) {
							$idAgronom = {"Id_Agronom": $dat.Id_agronom};
						}else{
							$idAgronom = {"Id_Agronom": -1};
						}
					delete $dat2.Id_agronom;
					delete $dat2.Hire_status;
					delete $dat2.Hire_position;
					$status = {"Hire_status": $dat.Hire_status,
						"Hire_position": $dat.Hire_position,
						"Employer_hire_status":$dat.Hire_status,
						"Id_map":$dat.Id_map,
						"Id_parsel":$dat.Id_parsel
					};
					delete $hireData.Hire_status;
					DB.getOther(function (res) {

						if (res != null) {
							delete $hireData.Id_User;
							delete $hireData.Hire_position;
							delete $hireData.Id_map;
							delete $hireData.Id_parsel;
							DB.dbUpdateOne("UserEmployer", $idEmployer, $status, db);
							DB.dbUpdateOne("Parsel", $parselFind, $idAgronom, db);
							$hireData.Hire_status = transformData.in(data).Hire_status
							socket.emit('hireAgronom', $hireData);
						} else {
							socket.emit('hireAgronom', -1);
						}
					}, "UserEmployer", $idEmployer, db);
				});
			}catch(e){
				socket.emit('hireAgronom', "Invalid request format");
			}


	}
	);
}

