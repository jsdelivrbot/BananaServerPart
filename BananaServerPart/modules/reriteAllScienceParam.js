var DB=require("./db.js");


exports.rerite=function ($user, db) {
   
    $status = { "Id_User": $user.Id_User };
    $status.Item_status = 1;
    DB.getOtherMore(function (allScienceThree) {
        $employer = { "Id_User": $user.Id_User, "Type_employer": 3 };
        $percent = 0;

        
        for (var key in allScienceThree) {

            $percent += allScienceThree[key]["Product_percent"];
        }
        
        DB.getOtherMore(function (allEmployer) {
            var $id = [];
            
          
            dataUpdate = { "Bonus_percent": $percent };
            $id=[]
            for (var key in allEmployer) {
                $id.push(allEmployer[key]["Id_employer"]);

                DB.dbUpdateOne("UserEmployer", { "Id_employer": allEmployer[key]["Id_employer"] }, dataUpdate, db);



                DB.getOtherMore(function (allEmployerItem) {
                    $fert = 1;
                    $idEmp = [];
                    for (var key in allEmployerItem) {
                        if (allEmployerItem[key]["Id_employer"] != -1) {
                            $idEmp.push(allEmployerItem[key]["Id_employer"]);
                        }
                    }

                    $findEmp = { "Id_User": $user.Id_User };
                    $findEmp.Id_employer = $idEmp;
                    DB.getOtherMore(function (allUsedPercent) {
                        $finalPercent = 0;

                        for (var key in allUsedPercent) {
                            $finalPercent = allUsedPercent[key]["Bonus_percent"];
                        }
                        DB.getOtherMore(function (allParsel) {
                            $fert = $fert + $fert * $finalPercent / 100;
                            for (var key in allParsel) {
                                DB.dbUpdateOne("UserEmployer", { "Id_User": $user.Id_User, "Id_parsel": allParsel[key]["Id_parsel"] }, { "FertFertility": $fert }, db);
                            }
                        }, "Parsel", $user, db);
                    }, "UserEmployer", $findEmp, db);

                }, "UserEmployeerItems", $employer, db);


            }

        }, "UserEmployer", $employer, db);

    }, "ScienceTree", $status, db);

}