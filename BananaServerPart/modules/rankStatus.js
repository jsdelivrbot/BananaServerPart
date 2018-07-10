
var DB=require("./db.js");
exports.addRank=function (rank,rankVal,$user,db){
	var date=new Date();
	DB.getOther(function(resUser){
		DB.getOther(function(res){
            medals($user, db);
			$infos={};
			$infos[rank]=res[rank]+rankVal;

			DB.dbUpdateOne("Ranking", $user, $infos, db);

			if(rank=="Player_rank") {
				if (Math.floor((date.getTime() - resUser.Time) / (1000 * 60 * 60 * 24)) > resUser.Day) {
					$day={"Today_rank":rankVal};
					DB.dbUpdateOne("Ranking", $user, $day, db);
					DB.dbUpdateOne("UserInfosRank", $user, {"Day":(resUser.Day+1)}, db);

				}else{
					$day={"Today_rank":(res.Today_rank+rankVal)};
					DB.dbUpdateOne("Ranking", $user, $day, db);
				}



				if (Math.floor((date.getTime()-resUser.Time) / (1000 * 60 * 60 * 24*7)) > resUser.Week) {
					$week={"Weekly_rank":rankVal};

					DB.dbUpdateOne("UserInfosRank", $user, {"Week":(resUser.Week+1)}, db);
					DB.dbUpdateOne("Ranking", $user, $week, db);
				}else{
					$week={"Weekly_rank":(res.Weekly_rank+rankVal)};
					DB.dbUpdateOne("Ranking", $user, $week, db);
				}

			}
		},"Ranking",$user,db);
	},"UserInfosRank",$user,db);


}

/*exports.getMedals = */function medals($user,db) {

    DB.getOtherMore(function (res) {

        $allCount = res.length;

        $goldPercent = Math.ceil($allCount *0.03);
        $silverPercent = Math.floor($allCount * 0.02) * $goldPercent;
        $bronzePercent = Math.floor($allCount * 0.05) * $goldPercent;

        $nowPercent = Math.floor(Math.random() * $allCount);

        if ($nowPercent <= $goldPercent) {
            addMedal($user, "Gold_medals", db); 
        }

        if ($nowPercent > $goldPercent && $nowPercent <= $silverPercent) {
            addMedal($user, "Silver_medals", db);
        }

        if ($nowPercent > $silverPercent && $nowPercent <= $bronzePercent) {
            addMedal($user, "Bronze_medals", db);
        }

    }, "User", {}, db);

}

function addMedal($user, medal, db) {

    DB.getOther(function (res) {
        $medals = {};
        switch (medal) {
            case "Gold_medals":
                $medals.Gold_medals = res.Gold_medals + 1;
                $medals.Bonus_gold = res.Bonus_gold + 3;
                $medals.Total_value = res.Total_value + 1;
                $medals.Total_medals_bonus = res.Total_medals_bonus + 3;
                break;
            case "Silver_medals":
                $medals.Silver_medals = res.Silver_medals + 1;
                $medals.Bonus_silver = res.Bonus_silver + 2;
                $medals.Total_value = res.Total_value + 1;
                $medals.Total_medals_bonus = res.Total_medals_bonus + 2;
                break;
            case "Bronze_medals":
                $medals.Bronze_medals = res.Bronze_medals + 1;
                $medals.Bonus_bronze = res.Bonus_bronze + 1;
                $medals.Total_value = res.Total_value + 1;
                $medals.Total_medals_bonus = res.Total_medals_bonus + 1;
                break;
        }
        DB.dbUpdateOne("Ranking", $user, $medals, db);


    }, "Ranking", $user, db)

}

exports.addMore=function (rank,rankVal,$user,db){

		DB.getOther(function(res){

			$infos={};
			$infos[rank]=res[rank]+rankVal;
			DB.dbUpdateOne("Ranking", $user, $infos, db);

		},"Ranking",$user,db);



}


