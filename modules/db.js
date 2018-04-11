var MongoClient = require('mongodb').MongoClient;


var result=null;
max=null;
function setMax(maximum){
	max=maximum;
}

function setResult(res){
	result= res;
}




exports.dbSendOne=function(table,data,db){
	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertOne(infos, function(err, result){
			db.close();
		});
	//});
}



exports.dbUpdateOne=function(table,dataFilter,dataUpdate,db){

	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = dataUpdate;
		collection.updateOne(dataFilter,{$set:infos}, function(err, result){

			db.close();
		});
	//});
}


exports.dbInsertOne=function(table,dataInsert,db){

	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insert(dataInsert);
		db.close();
	//});
}


exports.dbSendMore=function(table,data,db){
	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertMany(infos, function(err, result){
			db.close();
		});
	//});
}

exports.getOther=function(callback,table,data,db){

	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);
		collection.findOne(infos,function(err,res){
			callback(res);
		});
		db.close();
	//});

}
exports.dbGetOne=function(table,data,db){
	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);
		console.log(infos);
		$res=collection.findOne(infos).lean();
	//});
	console.log($res);
return null;
}

exports.getMaxValParam=function(table,param,db){
	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		$a=collection.find({}).toArray(function(err,res){
			$length=res.length;
			$val=0;
			for($i=0;$i<$length;$i++){
				if($i==0){
					$val=res[$i][param];
				}else{
					if($val<res[$i][param]){
						$val=res[$i][param];
					}
				}
			}
			$val++;
			setMax($val);
			
		});

	//});
return max;
}

exports.dbGetMore=function(table,data,db){
	//MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.find(data).toArray(function(err,res){
			setResult(res);
			db.close();
		//})
	});

	return result;
}