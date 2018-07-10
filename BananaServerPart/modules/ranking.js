
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");
exports.getRankingMain=function (socket,iosockets,db){
	socket.on("getRankingMain",function(data) {
			try {

				$data = transformData.in(data);
				createUsers.create(db,$data,function() {

					DB.getOther(function (res) {

						if (res != null) {
							delete res._id;
							delete res.Id_User;
							delete res.Today_rank;
							delete res.Rank_status;
							delete res.Weekly_rank;
							delete res.Parcels_unlock;
							delete res.Parcel_installations;
							delete res.For_warehouse;
							delete res.For_science;
							delete res.For_employees_recruitment;
							delete res.In_warehouses;
							delete res.Available_cash;
							delete res.Total_assets_value;
							delete res.Bonus_gold;
							delete res.Bonus_silver;
							delete res.Bonus_bronze;
							delete res.Total_medals_bonus;
							delete res.Total_value;

							socket.emit('getRankingMain', res);
						} else {
							socket.emit('getRankingMain', -1);
						}
					}, "Ranking", $data, db);
				});
			}catch(e){
				socket.emit('getRankingMain', "Invalid request format");
			}


	}
	);
}


exports.getRankingStatistic=function (socket,iosockets,db){
	socket.on("getRankingStatistic",function(data) {
			try {

				$data = transformData.in(data);
				createUsers.create(db,$data,function() {

					DB.getOther(function (res) {

						if (res != null) {
							delete res._id;
							delete res.Id_User;
							socket.emit('getRankingStatistic', res);
						} else {
							socket.emit('getRankingStatistic', -1);
						}
					}, "Ranking", $data, db);
				});
			}catch(e){
				socket.emit('getRankingStatistic', "Invalid request format");
			}


		}
	);
}




exports.getRankingMedalsWall=function (socket,iosockets,db){
	socket.on("getRankingMedalsWall",function(data) {
			try {

				$data = transformData.in(data);

				createUsers.create(db,$data,function() {

					DB.getOther(function (resRankOne) {
						$nowRating=resRankOne.Player_rank;
						DB.getOtherMore(function (resRank) {


						$ar=getArrayRating(resRank);
							
							$Top={};

							for(var i=0;i<13; i++) {
								$n = i + 1;
								$name = "Player" + $n + "_top";
								if ($ar[i] != null) {
									if ($ar[i] <= $nowRating) {
										$Top[$name] = 100;
									} else {

										$percent = parseFloat($nowRating) /  parseFloat($ar[i])*100;
									
										$Top[$name] = $percent;
									}
								}else{
									$Top[$name] = 100;
								}
							}
							DB.dbUpdateCallback("RankingMedalsWall",$data,$Top,db,function(result){

								DB.getOther(function (res) {

									if (res != null) {
										delete res._id;
										delete res.Id_User;
										socket.emit('getRankingMedalsWall', res);
									} else {
										socket.emit('getRankingMedalsWall', -1);
									}
								}, "RankingMedalsWall", $data, db);
							});
						},"Ranking", {}, db);
					},"Ranking", $data, db);
				})
			}catch(e){
				socket.emit('getRankingMedalsWall', "Invalid request format");
			}


		}
	);
}

function getArrayRating(res){
	$rating=[]

	for(var key in res){

		$rating.push(res[key]["Player_rank"]);
	}

	$rating.sort(compareNumeric);
	$rating.reverse();
	return $rating;
}

function compareNumeric(a, b) {
	if (a > b) return 1;
	if (a < b) return -1;
}