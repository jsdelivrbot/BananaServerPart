
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");
exports.buffTraderItem=function (socket,iosockets,db){
	socket.on("buffTraderItem",function(data){
		try {

            $finZap1 = transformData.in(data);
            $employer = { "Position": $finZap1.Hire_position };
            $employer.Id_User = $finZap1.Id_User;
            $employer.Type_employer = 4;
			$Fuser={};
			$user={"Id_User":$finZap1.Id_User};
			$Fuser.Id_User=$finZap1.Id_User;
			$Fuser.Type_employer= { $ne: 0};
            $Fuser.Position = $finZap1.Hire_position;
            $Fuser.Id_map = $finZap1.Id_map;
			createUsers.create(db,$finZap1,function() {
				$coolUpd1={"Status":5};
				$coolUpd2={"Status":3};

                DB.getOther(function (resTrader) {
             
                    if (resTrader != null) {
                 
						$findEmployer=$user;
                        $findEmployer.Id_employer = resTrader.Id_employer;
                        DB.getOther(function (resEmployer) {
                            if (resEmployer != null) {
                                
                                
                                $time = resEmployer.Base_time_buff;
                            data = $findEmployer;

                            cooldown.Colldown(db, "UserEmployer", $time, data,
                                {}, {}, "Current_time_buff");

                            cooldown.ColldownBack(db, "UserEmployeerItems", $time, data,
                                $coolUpd2, $coolUpd1, "Item_CoolDown_Current", function () {
                                    DB.getOtherMore(function (res) {
                                        if (res != null && res.length != 0) {
                                            if (typeof (res) != "string") {
                                                for (var $key in res) {
                                                    delete res[$key]["_id"];
                                                    delete res[$key]["Id_User"];
                                                    delete res[$key]["Type_employer"];
                                                    delete res[$key]["Position"];
                                                }
                                            }
                                            socket.emit('buffTraderItem', res);
                                        } else {
                                            socket.emit('buffTraderItem', -1);
                                        }
                                    }, "UserEmployeerItems", $Fuser, db);
                                });

                        }
					},"UserEmployer",$findEmployer,db);
					}else{
						socket.emit('buffTraderItem', -1);
					}

                }, "UserEmployeerItems", $employer,db)
			});
		}catch(e){
			socket.emit('buffTraderItem', "Invalid request format");
		}
	});
}



