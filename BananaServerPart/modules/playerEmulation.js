var DB=require("./db.js");
var max_level=30;
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var Id_User=[];
var Id_Employer=[];
exports.playerEmulation=function (db){
	generatedUserId();

	deletedFakeUser(db);
}


function createUser(db){
	randomUser={"Id_User":Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1};
	createUsers.create(db,randomUser,function() {});
}

function setInstallInfo(data,db){
		if(data!=null) {
			try{
				var parselInfos=null;
				var parselBases=null;
				var $val = transformData.in(data);
				createUsers.create(db,$val,function() {
					var $resource = {"Resource": $val.SelectedResource, "Parsel_Status": 4};
					var $user = {"Id_User": $val.Id_User};
					delete $val.SelectedResource;
					var $parselIndex = {"Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
					var $getInfos = {"Id_User": $val.Id_User, "Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel};
					DB.getOther(function (res) {
						parselInfos = res;

						DB.getOther(function (res) {
							parselBases = res;
							if (parselInfos != null && parselBases != null) {
								$money = {"Money": parselInfos.Money - parselBases.Price_Install};
								if($money.Money>=0){
										DB.dbUpdateCallback("Parsel", $getInfos, $resource, db, function (res) {
										});
									DB.dbUpdateOne("User", $user, $money, db);
								}

							}
						}, "ParselBase", $parselIndex, db);
					}, "User", $user, db);
				});
			}catch(e){
				
			}}
}




function buyParsel(db,data){
	$finZap = transformData.in(data);
	createUsers.create(db,$finZap,function() {
		$UserPay = {"Id_User": $finZap.Id_User};
		$parseInfos = {"Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel};
		$parseInfosNew = {"Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
		$parseInfosNewUpdate = {"Id_User": $finZap.Id_User, "Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
		$parseInfosChange = {"Id_User": $finZap.Id_User, "Id_map": $finZap.Id_map, "Id_parsel": $finZap.Id_parsel + 1};
		$parselStatus3 = {"Parsel_Status": 3};
		$parselStatus2 = {"Parsel_Status": 2};
		$parselStatus1 = {"Parsel_Status": 1};
		var $userData = null;
		var $dataParsel = null;
		var $dataParselBase = null;
		if ($finZap != null) {
			DB.getOther(function (res) {

				$userData = res;
				DB.getOther(function (res1) {
					$dataParselBase = res1;

					DB.getOther(function (res2) {
						$dataParsel = res2;
						if ($dataParsel != null && $dataParsel.Parsel_Status < 3) {

							if ($userData != null && $dataParselBase != null) {
								$money = {"Money": ($userData.Money - $dataParselBase.Price_Unlock)};
								if($money.Money>=0) {
									DB.dbUpdateOne("User", $UserPay, $money, db);
									DB.dbUpdateOne("Parsel", $finZap, $parselStatus3, db);
									DB.getOther(function (res5) {
									
										if (res5 == null) {
											addNewParse(db, $parseInfosNew, $parselStatus2, $finZap.Id_User);
										}
									}, "Parsel", $parseInfosChange, db);
								}
							}
						} else {
							if ($userData != null && $dataParselBase != null) {
								$money = {"Money": ($userData.Money - $dataParselBase.Price_Unlock)};
								if ($money.Money >= 0) {
									DB.dbUpdateOne("User", $UserPay, $money, db);
									$finalDataPay_new = {};
									$finalDataPay_new.Id_User = $finZap.Id_User;
									$finalDataPay_new.Id_parsel = $dataParselBase.Id_parsel;
									$finalDataPay_new.Id_map = $dataParselBase.Id_map;
									$finalDataPay_new.Current_CoolDown_Time = $dataParselBase.Base_CoolDown_Time;
									$finalDataPay_new.Agronom_buff = 0;
									$finalDataPay_new.Id_Agronom = -1;
									$finalDataPay_new.Parsel_Status = 3;
									$finalDataPay_new.Resource = 0;
									$finalDataPay_new.Fertility = 1;
									$infos = $finZap;
									$infos.Parsel_Status = 3;
									DB.dbSendOne("Parsel", $finalDataPay_new, db);
									DB.getOther(function (res5) {
										if (res5 == null) {
											addNewParse(db, $parseInfosNew, $parselStatus2, $finZap.Id_User, $parseInfosNewUpdate);
										}
									}, "Parsel", $parseInfosChange, db);
								}
							}
						}
					}, "Parsel", $finZap, db);
				}, "ParselBase", $parseInfos, db);
			}, "User", $UserPay, db);
		}
	});
}


function addNewParse(db,$parseInfosNew,$parselStatus2,$id,$parseInfosNewUpdate){
	DB.getOther(function (res3) {
		if (res3 != null) {

			res3.Id_User=$id;
			res3.Current_CoolDown_Time = res3.Base_CoolDown_Time;
			delete res3._id;
			delete res3.Location_Zone;
			delete res3.Price_Unlock;
			delete res3.Price_Install;
			delete res3.Base_CoolDown_Time;
			res3.Agronom_buff = 0;
			res3.Id_Agronom = -1;
			res3.Parsel_Status = 1;
			res3.Resource = 0;
			res3.Fertility = 1;
			DB.dbSendOne("Parsel", res3, db);
			updateParselStatus(db, res3.Current_CoolDown_Time * 60 * 1000, $parseInfosNewUpdate, $parselStatus2);
		}
	}, "ParselBase", $parseInfosNew, db);
}

function updateParselStatus(db,time,data,dataUpdate){
	setTimeout(function(){
		DB.dbUpdateOne("Parsel", data, dataUpdate, db);
	},time);
}

function hireAgronom(db,data){
				$hireData = transformData.in(data);
				createUsers.create(db,$hireData,function() {
					$dat = transformData.in(data);
					$dat2 = transformData.in(data);
					$dat2.Type_employer=0;
					$dat2.Id_employer=$dat2.Id_agronom;
					delete $dat2.Id_agronom;
					delete $dat2.Hire_status;
					delete $dat2.Hire_position;
					$status = {"Hire_status": $dat.Hire_status, "Hire_position": $dat.Hire_position,"Employer_hire_status":$dat.Hire_status};
					delete $hireData.Hire_status;
					DB.getOther(function (res) {
						if (res != null) {
							delete $hireData.Id_User;
							delete $hireData.Hire_position;

							DB.dbUpdateOne("UserEmployer", $dat2, $status, db);
							$hireData.Hire_status = transformData.in(data).Hire_status
						}
					}, "UserEmployer", $dat2, db);
				});
}


function buyEmployer(db,data){

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
								finalSend($finZap1,$finZap2,res1,$user,$money,db,"AllAgronom");
								break;
							case 1:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,"AllLobbyist");
								break;
							case 2:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,"AllDirector");
								break;
							case 3:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,"AllScientific");
								break;
							case 4:
								finalSend($finZap1,$finZap2,res1,$user,$money,db,"AllTrader");
								break;
						}
					}, "User", $user, db);
				}
			});
		}catch(e){
			
		}
}

function empByuChange($finZap1,$finZap2,res1,res2,res3,$user,$money,db){
	$finZap1.Id_employer = Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1;
	$finZap1.Employer_Level = res3.Elevel;
	$finZap1.Type_employer = $finZap2.Type_employer;
	$finZap1.CV_base_time = res2.Colldown;
	$finZap1.CV_current_time = 1;
	$finZap1.Bonus_percent = res2.Bonus;
	$finZap1.Base_time_buff = res2.Buff_period;
	$finZap1.Current_time_buff = res2.Buff_period;
	$finZap1.Employer_hire_status = 0;
	if(res2.Jprice != null) {
		$money.Money = res1.Money - res2.Jprice;
	}else{
		$money.Money = res1.Money - 0;
	}
	if($money.Money>=0) {
		DB.dbUpdateOne("User", $user, $money, db);
		buyData($finZap1, db);
	}
}

function finalSend($finZap1,$finZap2,res1,$user,$money,db,Table){
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
				empByuChange($finZap1,$finZap2,res1,res2,$resource,$user,$money,db);
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

function buyData($finZap1,db){
	DB.dbSendOne("UserEmployer", $finZap1, db);
	DB.getOther(function (res) {

		if (res != null) {
			delete res._id;
			delete res.Id_User;
			delete res.Job_Offer;
			delete res.Hire_position;
			delete res.Hire_status;
			delete res.Employer_Level;
			delete res.CV_base_time;
			delete res.CV_current_time;
			delete res.Bonus_percent;

			DB.getOther(function (res1) {
				if (res1 != null) {
					if (typeof(res1) != "string") {
						delete res1["_id"];
						delete res1["Id_User"];
					}
				}
			}, "UserEmployer", $finZap1, db);

		}
	}, "UserEmployer", $finZap1, db);
}


function upgradeWarehouse(db,data){
		try {
			var dataUW1=null;
			var dataResWar=null;
			if (data != null) {
				$val = transformData.in(data);
				createUsers.create(db,$val,function() {
					DB.getOther(function (res) {
						dataUW1 = res;
						$user = {"Id_User": $val.Id_User};
						$Level = {"Level": (parseInt(dataUW1.Level) + 1)};
						DB.getOther(function (res) {
							dataResWar = res;
							delete dataResWar._id;
							$Level.Price_warehouse = dataResWar.Price;
							if (dataUW1 != null && dataResWar != null) {
								if (Number(dataUW1["Level"]) >= Number(max_level)) {
									dataResWar.Price_warehouse = "-1";
									DB.dbUpdateCallback("Warehouse", $user, dataResWar, db, function (res) {
										DB.getOther(function (res) {
											delete res._id;
											delete res.Id_User;
											delete res.Banana_count;
											delete res.Sugar_count;
											delete res.Tobacco_count;
											delete res.Coffee_count;
										}, "Warehouse", $user, db);
									});
								} else {
									DB.getOther(function (resUser) {
										$money = {"Money": resUser.Money - dataResWar.Price};
										if ($money.Money >= 0) {
											DB.dbUpdateCallback("Warehouse", $user, $Level, db, function (res) {
												DB.getOther(function (res) {
													delete res._id;
													delete res.Id_User;
													delete res.Banana_count;
													delete res.Sugar_count;
													delete res.Tobacco_count;
													delete res.Coffee_count;
												}, "Warehouse", $user, db);
											});
										}
								}, "User", $user, db)
								}
							}
						}, "WarehouseAll", $Level, db);
					}, "Warehouse", $val, db);
				});
			}
		}catch(e){
			
		}
}


function generatedUserId(){

	for(var i=0;i<1000;i++) {
		var id = Math.floor(Math.random() * (9999999999));
		Id_User.push = id;
	}
}
//______________________________________________________
//________________RandomChoicer_________________________
//______________________________________________________
function randomUserChoice(){
	$paramNunmber=Math.floor(Math.random() * (999));
	return Id_User[$paramNunmber];
}

function randomEmployerChoice(){
	$paramNunmber=Math.floor(Math.random() * (4));
	return $paramNunmber;
}


function randomJobChoice(){
	$paramNunmber=Math.floor(Math.random() * (2));
	return $paramNunmber;
}
//______________________________________________________
//___________________EndRandomChoicer___________________
//______________________________________________________

function upgradeWarehouseWithUser(db){
	data={"Id_User":randomUserChoice()};
	upgradeWarehouse(db,data);
}


function buyEmployerWithUser(db){
	data={"Id_User":randomUserChoice(),"Type_employer":randomEmployerChoice(),"Job_Offer":randomJobChoice()};
	buyEmployer(db,data);
}

function upgradeWarehouseWithUser(db){
	data={"Id_User":randomUserChoice()};
	upgradeWarehouse(db,data);
}


function deletedFakeUser(db){
	for(var key in Id_User){
		data={"Id_User":Id_User[key]};
		infor = transformData.in(data);
		$tables = ["Agronom", "Director", "Employeer",
			"EmployeerItems", "Employer", "Install",
			"Lobbyist", "Parsel", "Scientific", "Traider",
			"User", "UserAgronom", "UserEmployer",
			"Warehouse", "WarehouseAll", "buyEmployer"];
		$tables.forEach(function (item, i, $tables) {
			DB.deleteDatas(item, infor, db);
		});
	}
}