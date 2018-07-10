
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var rankStatus = require("./rankStatus.js");
var reriteAllScienceParam = require("./reriteAllScienceParam.js");

exports.getScienceTreeItem=function (socket,iosockets,db){
	socket.on("getScienceTreeItem",function(data){
        try {

            $data = transformData.in(data);
           
			createUsers.create(db,$data,function() {
					DB.getOther(function (res) {
							delete res._id;
						socket.emit('getScienceTreeItem', res);
					}, "ScienceTree", $data, db);
			});
		}catch(e){
			socket.emit('getScienceTreeItem', "Invalid request format");
		}
	});
}

exports.getScienceTreeColumn=function (socket,iosockets,db){
	socket.on("getScienceTreeColumn",function(data){
		try {
			$data = transformData.in(data);
			createUsers.create(db,$data,function() {
				DB.getOtherMore(function (res) {
						for(var key in res){
							delete res[key]["_id"];
						}
					socket.emit('getScienceTreeItem', res);
				}, "ScienceTree", $data, db);
			});
		}catch(e){
			socket.emit('getScienceTreeColumn', "Invalid request format");
		}
	});
}


exports.getScienceTree=function (socket,iosockets,db){
	socket.on("getScienceTree",function(data){
		try {
            $data = transformData.in(data);
           reriteAllScienceParam.rerite({ "Id_User": $data.Id_User }, db);
           
			createUsers.create(db,$data,function() {
				DB.getOtherMore(function (res) {
					$resOld=1;
					$resNew=1;
					$i=0;
					keys=0;

					$results_array=[];
					$results_array[$i]=[];
					for(var key in res){
						$resNew=res[key]["Resource"];

						delete res[key]["_id"];
						delete res[key]["Id_User"];
						if($resOld!=$resNew){
							$resOld=$resNew;
							$i++;
							$results_array[$i]=[];
                            keys = 0;
                     
                            $results_array[$i][keys] = res[key];
                            keys++
						}else{
							$results_array[$i][keys]=res[key];
							keys++;
						}


					}
                
					socket.emit('getScienceTree', $results_array);
				}, "ScienceTree", $data, db);
			});
		}catch(e){
			socket.emit('getScienceTree', "Invalid request format");
		}
	});
}



exports.setScienceTreeItem=function (socket,iosockets,db){
	socket.on("setScienceTreeItem",function(data){
		try {
			$data = transformData.in(data);
			$data1=transformData.in(data);
			$data1.Item_level+=1;
			$status2={"Item_status":2};
			$status1={"Item_status":1};

			$User={"Id_User":$data.Id_User};
			$find={"Id_User":$data.Id_User,"Resource":$data.Resource};
			createUsers.create(db,$data,function() {
				DB.getOther(function (user) {
					DB.getOther(function (res) {
						delete res._id;
						res.Item_status=2
							$money=user.Money-res.Item_price;
						
							if($money>=0){
								$mon={"Money":$money};
								DB.dbUpdateOne("User", $User, $mon, db);
								DB.dbUpdateOne("ScienceTree", $data, $status2, db);
                                DB.dbUpdateOne("ScienceTree", $data1, $status1, db);


								rankStatus.addMore("For_science", 1, $userRank, db);
								rankStatus.addRank("Player_rank",25,$userRank,db);
								
									DB.getOtherMore(function (res) {
										for(var key in res){
											delete res[key]["_id"];
											delete res[key]["Id_User"];
										}
										socket.emit('setScienceTreeItem', res);
									},"ScienceTree",$find,db);
								


							}else{
								socket.emit('setScienceTreeItem', "NoMoney");
							}
					}, "ScienceTree", $data, db);
				}, "User", $User, db);
			});
		}catch(e){
			socket.emit('setScienceTreeItem', "Invalid request format");
		}
	});
}



