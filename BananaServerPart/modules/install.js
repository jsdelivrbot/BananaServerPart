var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var rankStatus=require("./rankStatus.js");
exports.getInstallInfo=function (socket,iosockets,db){
	socket.on("getInstallInfo",function(data){
		createUsers.create(db,transformData.in(data),function() {
            $userWork = { "Id_User": $val.Id_User, "Type_employer": [2, 3] };
            DB.getOtherMore(function (resEmployerItems) {
                $id = [];
                for (var key in resEmployerItems) {
                    if (resEmployerItems[key]["Id_employer"] != -1) {
                        $id.push(resEmployerItems[key]["Id_employer"]);
                    }
                }
                $employer = { "Id_User": $val.Id_User, "Id_employer": $id };

                DB.getOtherMore(function (resEmployer) {
                    Directors_bonus = 0;
                    Scientific_bonus = 0;
                    for (var key in resEmployer) {
                        switch (resEmployer[key]["Type_employer"]) {
                            case 1:
                                Directors_bonus += resEmployer[key]["Bonus_percent"];
                                break;
                            case 2:
                                Scientific_bonus += resEmployer[key]["Bonus_percent"];
                                break;
                        }
                    }
					DB.getOther(function (res1) {
						DB.getOther(function (res) {
							if (res != null) {


                                var resogun = reso(res1, res, Directors_bonus, Scientific_bonus);

								socket.emit('getInstallInfo', resogun);



					}
				}, "Parsel", transformData.in(data), db);
					},"Market",{},db);

                }, "UserEmployer", $employer, db);
            }, "UserEmployeerItems", $userWork, db);
		});
	});
}

function reso(res1, res, Directors_bonus, Directors_bonus) {
    $all = Directors_bonus + Directors_bonus;
	var elem1={"Base_production_count":res.Fertility,
        "Directors_bonus": Directors_bonus,
        "Scientific_bonus": Scientific_bonus,
	"Resource":1,
	"Market_price":res1.Banana_price,
    "Total_production": $all+res1.Banana_price};

	var elem2={"Base_production_count":res.Fertility,
        "Directors_bonus": Directors_bonus,
        "Scientific_bonus": Scientific_bonus,
		"Resource":2,
		"Market_price":res1.Sugar_price,
        "Total_production": $all+res1.Sugar_price};

	var elem3={"Base_production_count":res.Fertility,
        "Directors_bonus": Directors_bonus,
        "Scientific_bonus": Scientific_bonus,
		"Resource":3,
		"Market_price":res1.Tobacco_price,
        "Total_production": $all+res1.Tobacco_price};

	var elem4={"Base_production_count":res.Fertility,
        "Directors_bonus": Directors_bonus,
        "Scientific_bonus": Scientific_bonus,
		"Resource":4,
		"Market_price":res1.Coffee_price,
        "Total_production": $all+res1.Coffee_price};


		resogun=[elem1,elem2,elem3,elem4];


	return resogun;
}
exports.setInstallInfo=function (socket,iosockets,db){
	socket.on("setInstallInfo",function(data){

		if(data!=null) {
			try{
				var parselInfos=null;
				var parselBases=null;
			  var $val = transformData.in(data);
              $userRank = { "Id_User": $val.Id_User };
             
                createUsers.create(db, $val, function () {
                    
                            var $resource = { "Resource": $val.SelectedResource, "Parsel_Status": 4 };
                            var $user = { "Id_User": $val.Id_User };
                            delete $val.SelectedResource;
                            var $parselIndex = { "Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel };
                            var $getInfos = { "Id_User": $val.Id_User, "Id_map": $val.Id_map, "Id_parsel": $val.Id_parsel };
                            DB.getOther(function (res) {
                                parselInfos = res;

                                DB.getOther(function (res) {
                                    parselBases = res;
                                    if (parselInfos != null && parselBases != null) {
                                        $money = { "Money": parselInfos.Money - parselBases.Price_Install };
                                        if ($money.Money < 0) {
                                            delete parselBases._id;
                                            socket.emit('setInstallInfo', parselBases);
                                        } else {
                                            rankStatus.addMore("Parcel_installations", 1, $userRank, db);
                                            rankStatus.addRank("Player_rank", 25, $userRank, db);
                                            DB.dbUpdateCallback("Parsel", $getInfos, $resource, db, function (res) {
                                                DB.getOther(function (res) {
                                                    if (res != null) {
                                                        delete res._id;
                                                        delete res.Id_User;
                                                        delete res.Id_map;
                                                        socket.emit('setInstallInfo', res);
                                                    }
                                                }, 'Parsel', $getInfos, db);
                                            });

                                            DB.dbUpdateOne("User", $user, $money, db);
                                        }

                                    } else {
                                        socket.emit('setInstallInfo', parselBases);
                                    }
                                }, "ParselBase", $parselIndex, db);
                            }, "User", $user, db);
                       
				});
		}catch(e){
			socket.emit('setInstallInfo', "Invalid request format");
		}}
	});
}

