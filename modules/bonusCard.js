
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");
exports.getBonusCard=function (socket,iosockets,db){
	socket.on("getBonusCard",function(data) {
			try {

				$data = transformData.in(data);
				createUsers.create(db,$data,function() {
					DB.getOther(function (res) {

						if (res != null) {
							delete res.Id_User;
							delete res._id;
							socket.emit('getBonusCard', res);
						} else {
							socket.emit('getBonusCard', -1);
						}
					}, "BonusCard", $data, db);
				});
			}catch(e){
				socket.emit('getBonusCard', "Invalid request format");
			}


	}
	);
}

exports.getAllBonusCards=function (socket,iosockets,db){
	socket.on("getAllBonusCards",function(data) {
			try {

				$data = transformData.in(data);
				createUsers.create(db,$data,function() {
					DB.getOtherMore(function (res) {

						if (res != null) {
							for(var key in res) {
								delete res[key]["Id_User"];
								delete res[key]["_id"];
							}
							socket.emit('getAllBonusCards', res);
						} else {
							socket.emit('getAllBonusCards', -1);
						}
					}, "BonusCard", $data, db);
				});
			}catch(e){
				socket.emit('getAllBonusCards', "Invalid request format");
			}


		}
	);
}

$levelCard1 = { "Easy_percent": 70 };
$levelCard2 = { "Easy_percent": 95,  "Ambitions_percent": 50 };
$levelCard3 = { "Easy_percent": 100, "Ambitions_percent": 90,  "Hardcore_percent": 40 };
$levelCard4 = { "Easy_percent": 100, "Ambitions_percent": 100, "Hardcore_percent": 90 };
$levelCard5 = { "Easy_percent": 100, "Ambitions_percent": 100, "Hardcore_percent": 100 };

exports.activateBonusCard=function (socket,iosockets,db){
	socket.on("activateBonusCard",function(data) {
			try {

				$data = transformData.in(data);
				delete $data.Id_Card;
				$data2 = transformData.in(data);
              

                createUsers.create(db, $data, function () {
                    addToActivated($data2, db, function () {

                        DB.getOtherMore(function (res) {

                            if (res != null) {
                                for (var key in res) {
                                    delete res[key]["Id_User"];
                                    delete res[key]["_id"];
                                }
                                socket.emit('activateBonusCard', res);
                            } else {
                                socket.emit('activateBonusCard', -1);
                            }
                        }, "BonusCard", $data, db);
                    });
				});
			}catch(e){
				socket.emit('activateBonusCard', "Invalid request format");
			}
		}
	);
}


function addToActivated($infos,db,callback){

	DB.getOther(function (res) {

		if (res != null) {
            delete res._id;
            $levelUserCard = {};
                switch (res.Level_card){
                    case 1:
                        $levelUserCard = $levelCard1;
                        break;
                    case 2:
                        $levelUserCard = $levelCard2;
                        break;

                    case 3:
                        $levelUserCard = $levelCard3;
                        break;
                    case 4:
                        $levelUserCard = $levelCard4;
                        break;
                    case 5:
                        $levelUserCard = $levelCard5;
                        break;

            }

              
                updateCard(res.Level_card, { "Id_User": $infos.Id_User}, db)
                addBonusAll(res, db);
                DB.dbUpdateOne("Bribe", { "Id_User": $infos.Id_User }, $levelUserCard,db);
			    DB.dbSendOne("ActiveBonusCard", res, db);
                 DB.deleteData("BonusCard", $infos, db);
            callback();
		}
	}, "BonusCard", $infos, db);
}


function updateCard(level, $user, db) {

    var $price = 0;
    var $jobUnlock = 0;
    var $research = 0;
    var $fertility = 0;
    switch (level) {
        case 1:
            $price = 30;
            $jobUnlock = 0.1;
            $research = 0.2;
            $fertility = 1.2;
            break;
        case 2:
            $price = 90;
            $jobUnlock = 0.2;
            $research = 0.4;
            $fertility = 1.4;
            break;
        case 3:
            $price = 250;
            $jobUnlock = 0.3;
            $research = 0.6;
            $fertility = 1.6;
            break;
        case 4:
            $price = 800;
            $jobUnlock = 0.4;
            $research = 0.8;
            $fertility = 1.8;
            break;
        case 5:
            $price = 2400;
            $jobUnlock = 0.5;
            $research = 1;
            $fertility = 2;
            break;
    }



    $science = { "Id_User": $user.Id_User };
    $science.Item_status = 0;

    $employer = { "Id_User": $user.Id_User };
    $employer.Status = 0;
    DB.getOther(function (res1) {
        DB.getOtherMore(function (res2) {
            DB.getOtherMore(function (res3) {
                DB.getOtherMore(function (res4) {
                   
      
                    $money = { "Money": res1.Money + $price };
                    DB.dbUpdateOne("User", $user, $money, db);
                    $resource = 0;
                    $employer = -1;
                    for (var key in res2) {
                        if ($resource != res2[key]["Resource"]) {
                            $resource = res2[key]["Resource"];
                            $science.Item_price = res2[key]["Item_price"] - $research * res2[key]["Item_price"];
                            DB.dbUpdateOne("ScienceTree", res2[key], $science, db);
                        } else {
                            continue;
                        }
                    }
               

                   /* for (var key in res3) {
                        if ($employer != res3[key]["Type_employer"]) {
                            $employer = res3[key]["Resource"];
                            $employer.Item_price = res3[key]["Item_price"] - $research * res3[key]["Item_price"];
                            DB.dbUpdateOne("Type_employer", res3[key], $employer, db);
                        } else {
                            continue;
                        }
                    }*/


                    for (var key in res4) {

                        $add = {};
                        $add.Fertility = res4[key]["Fertility"] * $fertility;
                        $add.Parsel_Status = 3;
             
                        DB.dbUpdateOne("Parsel", res4[key], $add, db);
                      
                    }


                }, "Parsel", { "Id_User": $user.Id_User }, db);
            }, "UserEmployeerItems", $employer, db);
        }, "ScienceTree", $science, db);
    }, "User", { "Id_User": $user.Id_User }, db);

}


function addBonusAll(res,db) {
    $users = { "Id_User": res.Id_User };
    $resources = { "Id_User": res.Id_User, "Resource": res.Bonus_resource_type };
    $employer = { "Id_User": res.Id_User, "Type_employer": res.Bonus_employer_type };
    $level = { "Employer_Level": res.Bonus_employer_level_type };
    $countProduct = "";

    switch (res.Bonus_resource_type) {
        case 1:
            $countProduct = "Banana_count";
            break;
        case 2:
            $countProduct = "Sugar_count";
            break;
        case 3:
            $countProduct = "Tobacco_count";
            break;
        case 4:
            $countProduct = "Coffee_count";
            break;
    }
    $prod = {};
    
    DB.getOther(function (resource) {

        $prod[$countProduct] = resource[$countProduct]+100;
        DB.dbUpdateOne("Warehouse", $resources, $prod, db);

    }, "Warehouse", $resources, db);



    DB.getOtherMore(function (resource) {

        for (var key in resource) {
            DB.dbUpdateOne("UserEmployer", resource[key], $level, db);
        }

    }, "UserEmployer", $employer, db);

}