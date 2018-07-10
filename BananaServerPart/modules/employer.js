
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var rankStatus=require("./rankStatus.js");
var cooldown=require("./colldown.js");

exports.buyEmployer=function (socket,iosockets,db){
	socket.on("buyEmployer",function(data){
        try {
           
			$finZap1 = transformData.in(data);
			$finZap2 = transformData.in(data);
			$ret={"Type_employer":$finZap2.Type_employer};
			$user={"Id_User":$finZap1.Id_User};
			$money={"Money":0};
			createUsers.create(db,$finZap1,function() {

				if (data != null) {

					DB.getOther(function (res1) {
						$finZap1.Hire_status = 0;
						$finZap1.Hire_position = 0;


						switch ($finZap2.Type_employer) {
							case 0:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,"AllAgronom");
								break;
							case 1:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,"AllLobbyist");
								break;
							case 2:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,"AllDirector");
								break;
							case 3:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,"AllScientific");
								break;
							case 4:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,"AllTrader");
								break;
						}
                       

					}, "User", $user, db);
                }

			});
		}catch(e){
			socket.emit('buyEmployer', "Invalid request format");
		}
	});
}

function empByuChange($finZap1,$finZap2,res1,res2,res3,$user,$money,db,socket){

	$finZap1.Id_employer = Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1;
	$finZap1.Employer_Level = res3.Elevel;
	$finZap1.Type_employer = $finZap2.Type_employer;

	if(res2.Colldown!=null) {
		$finZap1.CV_base_time = res2.Colldown;
		$finZap1.CV_current_time = res2.Colldown;
		$finZap1.CV_current_time = res2.Colldown;
	}else{
		$finZap1.CV_base_time = 100;
		$finZap1.CV_current_time = 1;
	}


	if(res2.Bonus!=null) {
		$finZap1.Bonus_percent = res2.Bonus;
	}else{
		$finZap1.Bonus_percent = 0;
	}

	if((res2.Buff_period==null)||(typeof(res2.Buff_period)=="string")){
		$finZap1.Base_time_buff = 0;
		$finZap1.Current_time_buff = 0;
	}else{
		$finZap1.Base_time_buff = res2.Buff_period;
		$finZap1.Current_time_buff = res2.Buff_period;
	}
	$finZap1.Employer_hire_status = 0;
	$text="Price_unlock_pos_"+($finZap1.Job_Offer+1);
	DB.getOther(function(res4){
		$prices=0;
		switch($finZap1.Job_Offer){
			case 0:
				$prices="BasicPrice";
				break;
			case 1:
				$prices="BusinessPrice";
				break;
			case 2:
				$prices="PremiumPrice";
				break;

		}
		$money.Money=res1.Money - res4[$prices];

		if($money.Money<0){
			socket.emit('buyEmployer', "Not enough money");
		}else {
			DB.dbUpdateOne("User", $user, $money, db);
			buyData($finZap1, $finZap2, db, socket);
		}

	},"Hire",{"Type_employer":$finZap1.Type_employer},db);
}

function finalSend($finZap1,$finZap2,res1,$user,$money,db,socket,Table){
	DB.getOtherMore(function (res3) {
		$percent=getPercentChoicer();
		$resource={};
		for(var $key in res3){
			if($percent==res3[$key]["Percent"]){
				$resource=res3[$key];
			}
		}
		DB.getOther(function (res2) {

			if (res2 != null) {

				  empByuChange($finZap1,$finZap2,res1,res2,$resource,$user,$money,db,socket);
			}
		}, Table, {"Level": $resource.Elevel}, db);
	}, "Job", {"Level": $finZap2.Job_Offer}, db);
}

function getPercentChoicer(){
		$ver=Math.floor(Math.random()*100);
		$values=0;
		if($ver<=10){
			$values=10;
		}else if($ver<=40 && $ver>=10){
			$values=30;
		}else{
			$values=60;
		}
		return $values;
}

function buyData($finZap1, $finZap2, db, socket) {

	DB.dbSendOneBack("UserEmployer", $finZap1, db,function(res) {
		DB.getOther(function (res) {

			if (res != null) {
				$time = res.CV_base_time;
				$time2 = res.Current_time_buff;
				$finder2 = {"Id_User": res.Id_User, "Id_employer": res.Id_employer};
				delete res._id;
				delete res.Id_User;
				delete res.Job_Offer;
				delete res.Hire_position;
				delete res.Hire_status;
				delete res.Employer_Level;
				delete res.CV_base_time;
				delete res.CV_current_time;
				delete res.Bonus_percent;
                cooldown.ColldownEmployer(db, "UserEmployer", $time, $finder2,
                    {}, {}, "CV_current_time", function (Tables, cool, db, $finder, lessTime, moreTime, coolDownParam, $idInter, i, coolers) {

               
                        DB.getOther(function (resEmp) {
                            if (resEmp.Hire_status == 0) {
                                coolers[i]--;
                                if (coolers[i] <= -1) {
                                    moreTime[coolDownParam] = 0;
                                    DB.deleteData("UserEmployer", $finder2, db);

                                    clearInterval($idInter[i]);
                                } else {
                                    moreTime[coolDownParam] = coolers[i];
                                    DB.dbUpdateOne(Tables, $finder, moreTime, db);
                                }
                            }
                        }, "UserEmployer", $finder2, db);
                    });

				cooldown.Colldown(db, "UserEmployer", $time2, $finder2,
                    {}, {}, "Current_time_buff");
                delete $finZap1._id;
                $userEmployer = {};
                $userEmployer.Id_User = $finZap1.Id_User;
                $userEmployer.Id_employer = $finZap1.Id_employer;
      
				DB.getOther(function (res1) {
                    
                    
						
							delete res1["_id"];
							delete res1["Id_User"];
							delete res1["Job_Offer"];
							delete res1["Hire_status"];
							delete res1["Hire_position"];
					
                      
                            
						socket.emit('buyEmployer', res1);
					
                }, "UserEmployer", $userEmployer, db);


			} else {
				socket.emit('buyEmployer', "-1");
			}
		}, "UserEmployer", $finZap1, db);
	});
}

exports.getEmployeerItems=function (socket,iosockets,db){
	socket.on("getEmployeerItems",function(data){
		try {
			$finZap = transformData.in(data);
			$users={"Id_User":$finZap.Id_User};
			$employer={"Type_employer":$finZap.Type_employer};
			DB.getOtherMore(function(bonus) {
				DB.getOtherMore(function (res) {
					if (res != null) {
						for(var key in res) {

							delete res[key]["_id"];
							delete res[key]["Type_employer"];
							delete res[key]["Position"];
							if(bonus!=null) {
								for(var k in bonus) {
									res[key]["Item_Price"] = res[key]["Item_Price"] - bonus[k]["Bonus_card_type"];
								}
							}
						}
						socket.emit('getEmployeerItems', res);
					} else {
						socket.emit('getEmployeerItems', "-1");
					}
				}, "EmployeerItems", $employer, db);
			},"ActiveBonusCard",$users,db);
		}catch(e){
			socket.emit('getEmployeerItems', "Invalid request format");
		}
	});
}


exports.hireEmployer=function (socket,iosockets,db){
	socket.on("hireEmployer",function(data){
			try {
				$hireData = transformData.in(data);
				$userRank={"Id_User":$hireData.Id_User};
				createUsers.create(db,$hireData,function() {
					$dat = transformData.in(data);
					$dat2 = transformData.in(data);
					$idEmployer={"Id_employer":$dat2.Id_employer,"Id_User":$dat2.Id_User};
					$employerFind={"Id_User": $dat.Id_User,
						"Type_employer":$dat.Type_employer,
						"Position":$dat.Hire_position};
					$EmployerItems = {"Id_User": $dat.Id_User,
						"Id_employer":$dat.Id_employer,
						"Type_employer":$dat.Type_employer,
						"Position":$dat.Hire_position};
					if($dat.Hire_status==0) {
						$EmployerItems.Id_employer=-1;
						$EmployerItems.Status=2;
					}else{

							$EmployerItems.Status = 3;

					}
					delete $dat2.Hire_status;
					delete $dat2.Hire_position;
					$status = {"Hire_status": $dat.Hire_status,
						"Hire_position": $dat.Hire_position,
						"Employer_hire_status":$dat.Hire_status};
					delete $hireData.Hire_status;
					DB.getOther(function (res) {
						if (res != null) {
							delete $hireData.Id_User;
							delete $hireData.Hire_position;

							DB.dbUpdateOne("UserEmployer", $idEmployer, $status, db);
							DB.getOther(function (res) {
								if(res!=null){
									DB.dbUpdateOne("UserEmployeerItems", $employerFind, $EmployerItems, db);
								}
							}, "UserEmployeerItems", $employerFind, db);
							$hireData.Hire_status = transformData.in(data).Hire_status;
							$stat=0
							if($hireData.Hire_status==1){$stat=1;}else{$stat=0;};
							rankStatus.addMore("For_employees_recruitment", $stat, $userRank, db);

							socket.emit('hireEmployer', $hireData);
						} else {
							socket.emit('hireEmployer', -1);
						}
					}, "UserEmployer", $idEmployer, db);
				});
		}catch(e){
			socket.emit('hireEmployer', "Invalid request format");
		}
	});
	}
var $idInter=null;

exports.buyEmployerItem=function(socket,iosockets,db){
	try {
		socket.on("buyEmployerItem",function(data){
            i = 0;
            createUsers.EmployeerItems(data,db);
			$buyData = transformData.in(data);

            $get = { "Id_User": $buyData.Id_User, "Type_employer": $buyData.Type_employer, "Id_map": $buyData.Id_map};
			$finder1={"Id_User":$buyData.Id_User,"Type_employer":$buyData.Type_employer};
			$finder1.Position=$buyData.Hire_position;
			$finder2={"Id_User":$buyData.Id_User,"Type_employer":$buyData.Type_employer};
			$finder2.Position=$buyData.Hire_position+1;

			$EI={"Type_employer":$buyData.Type_employer,"Position":$buyData.Hire_position+1};
			$employerItems={"Type_employer":$buyData.Type_employer,"Position":  $buyData.Hire_position};
			$status2={"Status":2,"Id_employer":-1};
			$status4={"Status":4};
			$status1={"Status":1,"Item_CoolDown_Current":0};

            createUsers.create(db, $buyData, function () {
               
				DB.getOther(function (res) {
					DB.getOther(function (resUser) {
						$money=resUser.Money-res.Item_Price;
						if($money>=0) {
							DB.dbUpdateOne("User", {"Id_User":$buyData.Id_User}, {"Money":$money}, db);
						}
					},"User",{"Id_User":$buyData.Id_User},db);
				},"EmployeerItems",$employerItems,db);
				DB.dbUpdateOne("UserEmployeerItems", $finder1, $status2, db);
				DB.dbUpdateCallback("UserEmployeerItems", $finder2, $status4, db,function(res) {

					DB.getOther(function (res) {
						if (res != null) {
							$time = 0;

							cooldown.Colldown(db, "UserEmployeerItems", res.Item_CoolDown_Base, $finder2,
								$status1, $status4, "Item_CoolDown_Current");

						}

						DB.getOtherMore(function (res) {
							if (res != null) {
								for (var key in res) {

									delete res[key]["_id"];
									delete res[key]["Type_employer"];
									delete res[key]["Position"];
								}
								socket.emit('buyEmployerItem', res);
							} else {
								socket.emit('buyEmployerItem', "-1");
							}
						}, "UserEmployeerItems", $get, db);

					}, "EmployeerItems", $EI, db);
				});
			});
		});
	}catch(e){
		socket.emit('buyEmployerItem', "Invalid request format");
	}
}




