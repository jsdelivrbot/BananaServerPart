
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getGraphicItem=function (socket,iosockets,db){
	socket.on("getGraphicItem",function(data){
		DB.getOther(function(res){
			if(res!=null) {
				delete res["_id"];
				socket.emit('getGraphicItem', res);
			}else{
				socket.emit('getGraphicItem', -1);
			}
			},"Graphic",  transformData.in(data),db);

	});
}

exports.graphicCount=function (socket,iosockets,db){
	h1=1000*60*60;
	h=1000*20;
	h2=2*h1;
	h3=3*h1;
	h4=4*h1;
	h5=5*h1;
	h6=6*h1;
	h7=7*h1;

		setInterval(writingCourse,h,1,db,h);
		setInterval(writingCourse,h1,2,db,h1);
		setInterval(writingCourse,h2,3,db,h2);
		setInterval(writingCourse,h3,4,db,h3);
		setInterval(writingCourse,h4,5,db,h4);
		setInterval(writingCourse,h5,6,db,h5);
		setInterval(writingCourse,h6,7,db,h6);
}

function UpdatedMarketGraphic($resource,$position,$prices,db){
	$text='{"'+$position+'":'+$prices+"}";
	$find={"Resource":parseInt($resource)};
	$upda=JSON.parse($text);
	DB.dbUpdateOne("Graphic", $find, $upda, db);
}
function writingCourse($pos,db,time){
	$resource=[];
	$position="Pos"+$pos;
	DB.getOther(function(res){
		if(res!=null) {
			if (typeof(res) != "string") {
				delete res._id;
			}
			$resource[1]=res.Banana_price;
			$resource[2]=res.Sugar_price;
			$resource[3]=res.Tobacco_price;
			$resource[4]=res.Coffee_price;

			for(var key in $resource){
				setTimeout(UpdatedMarketGraphic,time,key,$position,	$resource[key],db);
			}
		}},"Market", "",db);
}


exports.getGraphics=function (socket,iosockets,db){
	socket.on("getGraphics",function(data){
		DB.getOtherMore(function(res){
			if(res!=null) {
				for (var $key in res) {
					delete res[$key]["_id"];
				}
				socket.emit('getGraphics', res);
			}},"Graphic",  transformData.in(data),db);

	});
}



