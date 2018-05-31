var DB=require("./db.js");

var transformData=require("./inout.js");

	exports.create=function (db,data,callback){
		try {
			$val =data;
			$infor={"Id_User":$val.Id_User};
			$inf={"Id_User":$val.Id_User};
			$inf.Money=100000;
			$inf.Current_map=1;
			$inf.Ranking=1;

			$warehouse={
				"Id_User" : $val.Id_User,
				"Level" : 1,
				"Max_size" : 1,
				"Max_level" : 30,
				"Price_warehouse" : 100,
				"Banana_count" : 1,
				"Sugar_count" : 1,
				"Tobacco_count" : 1,
				"Coffee_count" : 1};

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
			DB.getOther(function (res) {

				if (res != null ){
					callback();
				}else{
					DB.dbSendOne("User", $inf, db);
					DB.dbSendOne("Warehouse", $warehouse, db);
					DB.dbSendOne("Parsel", $parsel, db);
					DB.getOtherMore(function (res1) {
					for(i=1;i<5;i++) {
						for (j = 0; j < 5; j++) {
							json = {};
							json.Type_employer = j;
							json.Position = i;
							json.Id_User = $val.Id_User;
							json.Id_employer = -1;
							if (i == 1) {
								json.Status = 1;
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
						callback();
							},"EmployeerItems",{},db);

				}
			}, "User", $infor, db);
		}catch(e){
		}
}

