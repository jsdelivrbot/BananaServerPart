var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var rankStatus=require("./rankStatus.js");
exports.getMarketPrice=function (socket,iosockets,db){
	socket.on("getMarketPrice",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res._id;
				}
				socket.emit('getMarketPrice', res);
			}},"Market", "",db);

	});
}

exports.buyMarket=function (socket,iosockets,db){
	socket.on("buyMarket",function(data){
		$finZap = transformData.in(data);
		$user={"Id_User":$finZap.Id_User};
		$ranker={"Id_User":$finZap.Id_User};
		createUsers.create(db, $finZap, function () {
		DB.getOther(function(res){
			if(res!=null) {
				if (typeof(res) != "string") {
					delete res._id;
				}
				$prices=0;
				switch($finZap.Resource){
					case 1:
						$prices=res.Banana_price;
						break;
					case 2:
						$prices=res.Sugar_price;
						break;
					case 3:
						$prices=res.Tobacco_price;
						break;
					case 4:
						$prices=res.Coffee_price;
						break;
				}
					rankStatus.addRank("Player_rank",100,$ranker,db);
					$allPrice=$prices*$finZap.Resource_count;
					DB.getOther(function($user){

						if($user.Money<$allPrice){
							socket.emit('buyMarket', "NoMoney");
						}else{
							$Money={"Money":$user.Money-$allPrice};
							$warehouse={"Id_User":$finZap.Id_User,"Resource":$finZap.Resource};
							DB.dbUpdateOne("User", $user, $Money, db);

							DB.getOther(function($warehouses) {
								$count=0;
								$finders={};
								

								switch($finZap.Resource){
									case 1:
										$count=	$warehouses.Banana_count;
										$count+=$finZap.Resource_count;
										$finders.Banana_count=$count
										break;
									case 2:
										$count=	$warehouses.Sugar_count;
										$count+=$finZap.Resource_count;
										$finders.Sugar_count=$count
										break;
									case 3:
										$count=	$warehouses.Tobacco_count;
										$count+=$finZap.Resource_count;
										$finders.Tobacco_count=$count
										break;
									case 4:
										$count=	$warehouses.Coffee_count;
										$count+=$finZap.Resource_count;
										$finders.Coffee_count=$count
										break;
								}
								$mon=$user.Money-$allPrice;

								if($count==null||isNaN($count)){
									socket.emit('buyMarket', -1);
								}else {
									$results={"Resource":$finZap.Resource,"Resource_count":$count,"Money":$mon.toFixed(2)};
									socket.emit('buyMarket', $results);
									DB.dbUpdateOne("Warehouse", $warehouses, $finders, db);
								}
							},"Warehouse", $warehouse, db);
						}

					},"User", $user, db);


			}},"Market", "",db);
		});
	});
}



exports.sellMarket=function (socket,iosockets,db){
	socket.on("sellMarket",function(data){
		$finZap = transformData.in(data);
        $user = { "Id_User": $finZap.Id_User };
        $request = { "Id_User": $finZap.Id_User };
        
        $request.Type_employer = 4;
        createUsers.create(db, $finZap, function () {
            DB.getOtherMore(function (resTrader) {
        
                $id = [];
                for (var key in resTrader) {
                    if (resTrader[key]["Status"] == 5) {
                        $id.push(resTrader[key]["Id_employer"]);
                    }
                }

               
                if ($id.length > 1) {
                    $final = $id;
                   
                } else {
                    $final = $id[0];
                }

                $requestEmployer = { "Id_User": $finZap.Id_User };
                $requestEmployer.Id_employer = $final;
       
                DB.getOtherMore(function (resEmployer) {
                    $addingPrice = 0;
          
                    for (var key in resEmployer) {
                        $addingPrice += parseFloat(resEmployer[key]["Bonus_percent"]);
                      
                    }

              
                    DB.getOther(function (res) {

                        if (res != null) {

                            if (typeof (res) != "string") {

                            delete res._id;
                            }

                            $prices = 0;

                            switch ($finZap.Resource) {

                                case 1:

                                    $prices = res.Banana_price;

                                    break;                             
                                case 2:
                                    $prices = res.Sugar_price;

                                    break;
                                case 3:
                                    $prices = res.Tobacco_price;
                                    break;
                                case 4:
                                    $prices = res.Coffee_price;
                                    break;
                            }
                           
                            $allPrice = ($prices + $addingPrice / 100 * $prices) * $finZap.Resource_count;
                            DB.getOther(function ($user) {

                                $Money = { "Money": $user.Money + $allPrice };
                                $warehouse = { "Id_User": $finZap.Id_User, "Resource": $finZap.Resource };
                                DB.dbUpdateOne("User", $user, $Money, db);

                                DB.getOther(function ($warehouses) {
                                    $count = 0;
                                    $finders = {};
                                    switch ($finZap.Resource) {
                                        case 1:
                                            resuults = $warehouses.Banana_count;
                                            $count = resuults - $finZap.Resource_count;
                                            $finders.Banana_count = $count
                                            break;
                                        case 2:
                                            resuults = $warehouses.Sugar_count;
                                            $count = resuults - $finZap.Resource_count;
                                            $finders.Sugar_count = $count
                                            break;
                                        case 3:
                                            resuults = $warehouses.Tobacco_count;
                                            $count = resuults - $finZap.Resource_count;
                                            $finders.Tobacco_count = $count
                                            break;
                                        case 4:
                                            resuults = $warehouses.Coffee_count;
                                            $count = resuults - $finZap.Resource_count;
                                            $finders.Coffee_count = $count
                                            break;
                                    }

                                    if ($count == null || isNaN($count)) {
                                        socket.emit('sellMarket', -1);
                                    } else {
                                        DB.dbUpdateOne("Warehouse", $warehouses, $finders, db);
                                        $mon = $user.Money + $allPrice
                                        $results = { "Resource": $finZap.Resource, "Resource_count": $count, "Money": $mon.toFixed(2) };

                                        socket.emit('sellMarket', $results);
                                    }


                                }, "Warehouse", $warehouse, db);


                            }, "User", $user, db);


                        }

                    }, "Market", "", db);

                }, "UserEmployer", $requestEmployer, db);
            }, "UserEmployeerItems", $request,db);
		});
	});
}



