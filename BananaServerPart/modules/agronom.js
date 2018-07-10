
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");
var rankStatus=require("./rankStatus.js");
exports.hireAgronom=function (socket,iosockets,db){
	socket.on("hireAgronom",function(data) {
			try {

                var $hireData = transformData.in(data);
           
				var $userRank={"Id_User":$hireData.Id_User};
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
							$hireData.Hire_status = transformData.in(data).Hire_status;
							$stat=0;
							if($dat.Hire_status==1) {
								$stat=1;
							}else{
								$stat=-1;
							}
							rankStatus.addMore("For_employees_recruitment", $stat, $userRank, db);
							socket.emit('hireAgronom', $hireData);
						} else {
							socket.emit('hireAgronom', -1);
						}
                    }, "UserEmployer", $idEmployer, db);
                    ////

                    $dat =null;
                    $dat2 =null;
                   
                    $idEmployer = null;

                    $parselFind = null;
                });
                $hireData = null;
                $userRank = null;
			

            } catch (e) {
                socket.emit('hireAgronom', "Invalid request format");
            }
		}
	);
}


exports.buffAgronom=function (socket,iosockets,db){
	socket.on("buffAgronom",function(data){
		try{
            var infor = transformData.in(data);
      
            var $userWarehouse = { "Id_User": infor.Id_User };
			infor.Id_Agronom=infor.Id_agronom;
			delete infor.Id_agronom;
			createUsers.create(db,infor,function() {


				$dataEMp = {"Id_User": infor.Id_User, "Id_employer": infor.Id_Agronom,"Type_employer":0};
				DB.getOther(function (emp) {
                  
                    if (emp != null) {
                 
						time = emp.Base_time_buff;
						$parselStatus1 = {"Agronom_buff": 1};
						$parselStatus0 = {"Agronom_buff": 0};
						dataUsersAgronom={"Id_User": infor.Id_User,"Id_employer":infor.Id_Agronom};
						data = {"Id_User": infor.Id_User, "Id_parsel": infor.Id_parsel, "Id_map": infor.Id_map, "Id_Agronom": infor.Id_Agronom};
						cooldown.Colldown(db, "Parsel", time, data,
							$parselStatus0, $parselStatus1, "Current_CoolDown_Time");

	
						cooldown.Colldown(db, "UserEmployer", time, dataUsersAgronom,
							{}, {}, "Current_time_buff");

                        
                        

                        DB.getOther(function (res) {
                  
							if (res != null) {
                                if (typeof (res) != "string") {

                                    $use = {};
                                    $use.Id_User = res.Id_User;
                                    $use.Id_parsel = res.Id_parsel;


									delete res._id;
									delete res.Id_User;
									delete res.Id_map;
                                }
                                $userWarehouse.Resource = res.Resource;
                                $parameter = "";
                                switch (res.Resource) {
                                    case 1:
                                        $parameter ="Banana_count";
                                        break;
                                    case 2:
                                        $parameter = "Sugar_count";
                                        break;
                                    case 3:
                                        $parameter = "Tobacco_count";
                                        break;
                                    case 4:
                                        $parameter = "Coffee_count";
                                        break;
                                }

                                DB.getOther(function (res) {
                                    $useEmp = { "Id_User": $use.Id_User };
                                    $useEmp.Type_employer = { "$in": [2, 3] };
                                    $useEmp.Employer_hire_status = 1;
                                    DB.getOther(function (resParsel) {
                                        DB.getOtherMore(function (resEmployer) {
                                            var $fertility = resParsel.Fertility;

                                            for (var keys in resEmployer) {
                                                $fertility += $fertility / 100 * resEmployer[keys]["Bonus_percent"];
                                            }

                                            cooldown.AddInDocument(db, "Warehouse", time, $userWarehouse,
                                                $parameter, $fertility, res[$parameter]);

                                        }, "UserEmployer", $useEmp, db);
                                    }, "Parsel", $use, db);


                                }, "Warehouse", $userWarehouse, db);


                               
                                


								res.Agronom_buff = 1;
								res.Current_CoolDown_Time = time;
								socket.emit('buffAgronom', res);
                            } else {
                                
								socket.emit('buffAgronom', -1);
							}
						}, "Parsel", infor, db);
					}else{
						socket.emit('buffAgronom', -1);
					}
				},"UserEmployer",$dataEMp,db);
			})
        } catch (e) {
            socket.emit('buffAgronom', "Invalid request format");
        }
	});

}


exports.buffAllAgronoms=function (socket,iosockets,db){
	socket.on("buffAllAgronoms",function(data){
		try{
            var infor = transformData.in(data);
       
			infor.Id_Agronom={$ne:-1};
            infor.Agronom_buff = 0;
            var $userWarehouse = { "Id_User": infor.Id_User };
			infor2=transformData.in(data);
			$ID=[];
			$PARSEL=[];
			createUsers.create(db,infor,function() {
				DB.getOtherMore(function (res) {
					for (var key in res) {
						$ID.push(res[key]["Id_Agronom"]);
                        $PARSEL.push(res[key]["Id_parsel"]);

                    }
 
					$dataEMp = {"Id_User": infor.Id_User, "Id_employer": {"$in" :$ID}, "Type_employer": 0};
					DB.getOtherMore(function (emp) {

						i = 0;
						cool = [];
                        cool2 = [];
    
                        for (var key in emp) {


                           

							time = parseInt(emp[key]["Base_time_buff"]);
							$parselStatus1 = {"Agronom_buff": 1};
							$parselStatus0 = {"Agronom_buff": 0};
							dataUsersAgronom={"Id_User": infor.Id_User,"Type_employer": 0,"Id_map":infor.Id_map};
							data = {
								"Id_User": infor.Id_User,
								"Id_map": infor.Id_map, "Id_Agronom": $ID[key]
                            };
                   
                          
							cool[i]=cooldown.Colldown(db, "Parsel", time, data,
                                $parselStatus0, $parselStatus1, "Current_CoolDown_Time");

							cool2[i]=cooldown.Colldown(db, "UserEmployer", time, dataUsersAgronom,
								{}, {}, "Current_time_buff");
							i++;
						}

                        DB.getOtherMore(function (emp1) {
                    
								if (emp1 != null && emp1.length!=0) {
                                    if (typeof (emp1) != "string") {
                                  
                                        for (var key in emp1) {
                                            $use = {};
                                            $use.Id_User = emp1[key]["Id_User"];
                                            $use.Id_parsel = emp1[key]["Id_parsel"];

                                            delete emp1[key]["_id"];
                                            delete emp1[key]["Id_User"];
                                            delete emp1[key]["Id_map"];

                                            $userWarehouse.Resource = emp1[key]["Resource"];
                                            $parameter = "";
                                            if (emp1[key]["Resource"] != 0) {
                                                switch (emp1[key]["Resource"]) {
                                                    case 1:
                                                        $parameter = "Banana_count";
                                                        break;
                                                    case 2:
                                                        $parameter = "Sugar_count";
                                                        break;
                                                    case 3:
                                                        $parameter = "Tobacco_count";
                                                        break;
                                                    case 4:
                                                        $parameter = "Coffee_count";
                                                        break;
                                                }

                                                DB.getOther(function (res) {
                                                    $useEmp = { "Id_User": $use.Id_User };
                                                    $useEmp.Type_employer = { "$in": [2, 3] };
                                                    $useEmp.Employer_hire_status = 1;
                                                    DB.getOther(function (resParsel) {
                                                      
                                                        DB.getOtherMore(function (resEmployer) {
                                                            if (resEmployer != null && resEmployer.length!=0) {
                                                                var $fertility = resParsel.Fertility;

                                                                for (var keys in resEmployer) {
                                                                    $fertility += $fertility / 100 * resEmployer[keys]["Bonus_percent"];
                                                                }
                                                              
                                                                cooldown.AddInDocument(db, "Warehouse", time, $userWarehouse,
                                                                    $parameter, $fertility, res[$parameter]);

                                                            }
                                                        }, "UserEmployer", $useEmp, db);
                                                    }, "Parsel", $use, db);


                                                }, "Warehouse", $userWarehouse, db);
                                            }
                                        }
									}
									socket.emit('buffAllAgronoms', emp1);
								} else {
									socket.emit('buffAllAgronoms', "NoFreeAgronoms");
								}
							}, "Parsel", infor2, db);

					}, "UserEmployer", $dataEMp, db);

				}, "Parsel", infor, db);



			})
        } catch (e) {
            socket.emit('buffAllAgronoms', "Invalid request format");
        }
	});

}



exports.getAllAvailableAgronoms=function (socket,iosockets,db){
	socket.on("getAllAvailableAgronoms",function(data){
		try{
            var infor = transformData.in(data);
       
			infor.Agronom_buff=0;
			infor.Id_Agronom={$ne:-1};
			createUsers.create(db,infor,function() {

				DB.getOtherMore(function (emp) {
					if (emp != null) {
						if (typeof(emp) != "string") {
							delete emp._id;
							delete emp.Id_User;
							delete emp.Id_map;
						}
						$results={"Id_map":infor.Id_map,"Agronoms_count":emp.length};
						socket.emit('getAllAvailableAgronoms', $results);
					}else{
						socket.emit('getAllAvailableAgronoms', -1);
					}
				}, "Parsel", infor, db);
			})
        } catch (e) {
            socket.emit('getAllAvailableAgronoms', "Invalid request format");
        }
	});

}