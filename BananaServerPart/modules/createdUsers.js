var DB=require("./db.js");

var transformData=require("./inout.js");

	exports.create=function (db,data,callback){
        try {

            $val = data;

			$infor={"Id_User":$val.Id_User};
			$inf={"Id_User":$val.Id_User};
			$inf.Money=100000;
			$inf.Current_map=1;
			$inf.Ranking=1;
			$ranking={
				"Id_User":$val.Id_User,
				"Player_rank":0,
				"Gold_medals":0,
				"Silver_medals":0,
				"Bronze_medals":0,
				"Rank_status":0,
				"Today_rank":0,
				"Weekly_rank":0,
				"Parcels_unlock":0,
				"Parcel_installations":0,
				"For_warehouse":0,
				"For_science":0,
				"For_employees_recruitment":0,
				"In_warehouses":0,
				"Available_cash":0,
				"Total_assets_value":0,
				"Bonus_gold":0,
				"Bonus_silver":0,
				"Bonus_bronze":0,
				"Total_medals_bonus":0,
				"Total_value":0
			}
			$RankingMedalsWall={
				"Id_User":$val.Id_User,
				"Validated_time":0,
				"Gold_top":3,
				"Silver_top":6,
				"Bronze_top":15,
				"Player1_top":100,
				"Player2_top":100,
				"Player3_top":100,
				"Player4_top":100,
				"Player5_top":100,
				"Player6_top":100,
				"Player7_top":100,
				"Player8_top":100,
				"Player9_top":100,
				"Player10_top":100,
				"Player11_top":100,
				"Player12_top":100,
				"Player13_top":100
			};
			$bribe=   {"Id_User" : $val.Id_User,
				"Easy_percent" : 50,
				"Ambitions_percent" : 25,
				"Hardcore_percent" : 0,
				"Base_bribe_time" : 120,
				"Current_bribe_time" : 0};
			$warehouse=[{
				"Id_User" : $val.Id_User,
				"Level" : 1,
				"Max_size" : 1,
				"Max_level" : 30,
				"Resource":1,
				"Price_warehouse" : 100,
				"Banana_count" : 1
			},
				{
					"Id_User" : $val.Id_User,
					"Level" : 1,
					"Max_size" : 1,
					"Max_level" : 30,
					"Resource":2,
					"Price_warehouse" : 100,
					"Sugar_count" : 1
					},
				{
					"Id_User" : $val.Id_User,
					"Level" : 1,
					"Max_size" : 1,
					"Max_level" : 30,
					"Resource":3,
					"Price_warehouse" : 100,
					"Tobacco_count" : 1},
				{
					"Id_User" : $val.Id_User,
					"Level" : 1,
					"Max_size" : 1,
					"Max_level" : 30,
					"Resource":4,
					"Price_warehouse" : 100,
					"Coffee_count" : 1}];

			$parsel={
				"Id_User" : $val.Id_User,
				"Id_parsel" : 1,
				"Id_map" : 1,
				"Current_CoolDown_Time" : 1,
				"Agronom_buff" : 0,
				"Id_Agronom" : -1,
				"Parsel_Status" : 2,
				"Resource" : 0,
				"Fertility" : 1
			}
			var date=new Date();
			$UserInfosRank={
				"Id_User":$val.Id_User,
				"Time":date.getTime(),
				"Day":0,
				"Week":0
			}
			DB.getOther(function (res) {
				if (res != null ){
					callback();
				}else{
					sendScience({"Id_User" : $val.Id_User},db)
					DB.dbSendOne("User", $inf, db);
					DB.dbSendOne("RankingMedalsWall", $RankingMedalsWall, db);
					DB.dbSendOne("Bribe", $bribe, db);
					DB.dbSendMore("Warehouse", $warehouse, db);
					DB.dbSendOne("Parsel", $parsel, db);
					DB.dbSendOne("Ranking", $ranking, db);
					DB.dbSendOne("UserInfosRank", $UserInfosRank, db);
                    DB.getOtherMore(function (res1) {
                        if (res1.length == 0) {
                            for (map = 1; map <=3; map++) {
                                for (i = 1; i < 5; i++) {

                                    for (j = 0; j < 5; j++) {
                                        json = {};
                                        if (typeof $val.Id_map !== "undefined") {
                                            json.Id_map = $val.Id_map;
                                        } else {
                                            json.Id_map = 1;
                                        }
                                        json.Type_employer = j;
                                        json.Position = i;
                                        json.Id_map = map;
                                        json.Id_User = $val.Id_User;
                                        json.Id_employer = -1;
                                        if (i == 1) {
                                            json.Status = 2;
                                            json.Item_CoolDown_Current = 0;
                                        } else {
                                            json.Status = 0;
                                            for (var key in res1) {
                                                if (res1[key]["Position"] == i && res1[key]["Type_employer"] == j) {
                                                    json.Item_CoolDown_Current = res1[key]["Item_CoolDown_Base"];
                                                }
                                            }
                                        }
                                        DB.dbSendOne("UserEmployeerItems", json, db);
                                    }
                                }
                            }
                        }
						callback();
                    }, "UserEmployeerItems", { "Id_User": $val.Id_User },db);

				}
			}, "User", $infor, db);
		}catch(e){
		}
}

exports.EmployeerItems = function ($val,db) {
    /*$users = { "Id_User": $val.Id_User, "Id_map": $val.Id_map };
    DB.getOtherMore(function (res1) {
        console.log(res1);
        if (res1.length == 0) {
            for (i = 1; i < 5; i++) {

                for (j = 0; j < 5; j++) {
                    json = {};
                    if (typeof $val.Id_map !== "undefined") {
                        json.Id_map = $val.Id_map;
                    } else {
                        json.Id_map = 1;
                    }
                    json.Type_employer = j;
                    json.Position = i;
                    json.Id_User = $val.Id_User;
                    json.Id_employer = -1;
                    if (i == 1) {
                        json.Status = 2;
                        json.Item_CoolDown_Current = 0;
                    } else {
                        json.Status = 0;
                        for (var key in res1) {
                            if (res1[key]["Position"] == i && res1[key]["Type_employer"] == j) {
                                json.Item_CoolDown_Current = res1[key]["Item_CoolDown_Base"];
                            }
                        }
                    }
                    DB.dbSendOne("UserEmployeerItems", json, db);
                }
            }
        }
    }, "EmployeerItems", $users, db);*/
}
function sendScience($user,db){
		DB.getOtherMore(function(res){

			for(var key in res){
				delete res[key]["_id"];
				res[key]["Id_User"]=$user.Id_User;
			}
			res[0]["Item_status"]=1;
			res[30]["Item_status"]=1;
			res[60]["Item_status"]=1;
			res[90]["Item_status"]=1;

			DB.dbSendMore("ScienceTree",res,db);
		},"AllScienceTree",{},db)
}
