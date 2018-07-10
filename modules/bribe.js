
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
var cooldown=require("./colldown.js");

exports.getBribeInfo=function (socket,iosockets,db){
	socket.on("getBribeInfo",function(data) {
			try {

				$data = transformData.in(data);
				createUsers.create(db,$data,function() {
					DB.getOther(function (res) {

						if (res != null) {

								delete res.Id_User;
								delete res._id;
								delete res.Id_Card
						
							socket.emit('getBribeInfo', res);
						} else {
							socket.emit('getBribeInfo', -1);
						}
					}, "Bribe", $data, db);
				});
			}catch(e){
				socket.emit('getBribeInfo', "Invalid request format");
			}


		}
	);
}


exports.setBribeProcess=function (socket,iosockets,db){
	socket.on("setBribeProcess",function(data) {
			try {

				$data = transformData.in(data);
				$user={"Id_User":$data.Id_User};
				createUsers.create(db,$data,function() {




					setCard($data,$user,socket,db);



				});
			}catch(e){
				socket.emit('setBribeProcess', "Invalid request format");
			}


		}
	);
}

function getVariation($percent){
	$get=false;
	if(Math.floor(Math.random() * (100))>$percent){
		$get=true;
	}
	return $get;
}

function setCard($data,$user,socket,db){
	$User={"Id_User":$data.Id_User};

	DB.getOther(function (res) {

		if (res != null) {
			$percent=0;
			switch($data.Bribe_Type){
				case 0:
					$percent=res.Easy_percent;
					break;
				case 1:
					$percent=res.Ambitions_percent;
					break;
				case 2:
					$percent=res.Hardcore_percent;
					break;
			}
			$getCard=getVariation($percent);
			if($getCard){
				$card=genrateCard();
				$card.Id_User=$data.Id_User;
				DB.dbSendOne("BonusCard", $card, db);

			}
			time=res.Base_bribe_time;
			cooldown.Colldown(db, "Bribe", time,$User,
				{}, {}, "Current_bribe_time");
		}

		DB.getOtherMore(function (res) {

			if (res != null) {
				for (var key in res) {
					delete res[key]["Id_User"];
					delete res[key]["_id"];
					delete res[key]["Id_Card"];
				}
				socket.emit('setBribeProcess', res);
			} else {
				socket.emit('setBribeProcess', "NoCard");
			}
		}, "BonusCard", $user, db);


	}, "Bribe", $User, db);
}

function genrateCard(){
	$card={
		"Id_Card":Math.floor(Math.random() * 999999999999),
		"Level_card":Math.floor(Math.random() * 4)+1,
		"Bonus_card_type":Math.floor(Math.random() * 9)+1,
		"Bonus_resource_type":Math.floor(Math.random() * 3)+1,
		"Bonus_employer_type":Math.floor(Math.random() * 4),
		"Bonus_employer_level_type":Math.floor(Math.random() * 4)+1,
		"Bonus_Info":"INFO"};
	return $card;
}