var DB=require("./db.js");

var transformData=require("./inout.js");
var index=0;
var coolers=[];
var $idInter=[];

exports.Colldown=function(db,Tables,fullCoolDown,$finder2,lessTime,moreTime,coolDownParam){
	index++;
	coolers[index]=fullCoolDown;
	$idInter[index]=setInterval(updateAfterCoolDown,1000,Tables,fullCoolDown,db,$finder2,lessTime,moreTime,coolDownParam,$idInter,index);
}

function updateAfterCoolDown(Tables,cool,db,$finder,lessTime,moreTime,coolDownParam,$idInter,i){
	coolers[i]--;
	if(coolers[i]<=-1) {
		moreTime[coolDownParam]=0;
		DB.dbUpdateOne(Tables, $finder, lessTime, db);
		clearInterval($idInter[i]);
	}else{
		moreTime[coolDownParam]=coolers[i];
		DB.dbUpdateOne(Tables, $finder, moreTime, db);
	}
}

