var DB=require("./db.js");

var transformData=require("./inout.js");
var index=0;
var coolers = [];
var $idInter = [];

var $timeBuff = [];
var $tovar = [];

exports.Colldown=function(db,Tables,fullCoolDown,$finder2,lessTime,moreTime,coolDownParam){
	index++;
    coolers[index] = fullCoolDown;
    updateAfterCoolDown(Tables, fullCoolDown, db, $finder2, lessTime, moreTime, coolDownParam, $idInter, index);
	$idInter[index]=setInterval(updateAfterCoolDown,1000,Tables,fullCoolDown,db,$finder2,lessTime,moreTime,coolDownParam,$idInter,index);
}




exports.ColldownBack = function (db, Tables, fullCoolDown, $finder2, lessTime, moreTime, coolDownParam,callback) {
    index++;
    coolers[index] = fullCoolDown;
    updateAfterCoolDown(Tables, fullCoolDown, db, $finder2, lessTime, moreTime, coolDownParam, $idInter, index);
    $idInter[index] = setInterval(updateAfterCoolDown, 1000, Tables, fullCoolDown, db, $finder2, lessTime, moreTime, coolDownParam, $idInter, index);
    setTimeout(callback, 1000);

}

exports.ColldownEmployer = function (db, Tables, fullCoolDown, $finder2, lessTime, moreTime, coolDownParam,callback) {
    index++;
    coolers[index] = fullCoolDown;
    updateAfterCoolDownCallback(Tables, fullCoolDown, db, $finder2, lessTime, moreTime, coolDownParam, $idInter, index, callback);
    $idInter[index] = setInterval(updateAfterCoolDownCallback, 1000, Tables, fullCoolDown, db, $finder2, lessTime, moreTime, coolDownParam, $idInter, index, callback);
}


function updateAfterCoolDownCallback(Tables, cool, db, $finder, lessTime, moreTime, coolDownParam, $idInter, i, callback) {

    callback(Tables, cool, db, $finder, lessTime, moreTime, coolDownParam, $idInter, i, coolers);

   

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

exports.AddInDocument = function (db, Tables, fullCoolDown, $user, $param, $val,$nowVal) {
    index++;
    $timeBuff[index] = fullCoolDown;
    $thiser = {};

    $thiser[$param] = $nowVal;
    addVal(Tables, db, $user, $param, $val, $thiser, $tovar, index);
    $tovar[index] = setInterval(addVal, 1000, Tables, db, $user, $param, $val, $thiser, $tovar,index);

}

function addVal(Tables, db, $user, $param, $val, $thiser, $tovar,i) {
    $timeBuff[i]--;
   

    if ($timeBuff[i] <= -1) {
        clearInterval($tovar[i]);
    } else {
        $thiser[$param] = $thiser[$param] + $val;
        DB.dbUpdateOne(Tables, $user, $thiser, db);
    }
}

