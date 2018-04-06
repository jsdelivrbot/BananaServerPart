var MongoClient = require('mongodb').MongoClient;
result=null;
max=null;

function setMax(maximum){
	max=maximum;
}

function setResult(res){
	result= res;
}
exports.dbSendOne=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertOne(infos, function(err, result){
			db.close();
		});
	});
}



exports.dbUpdateOne=function(table,dataFilter,dataUpdate){

	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = dataUpdate;
		collection.updateOne(dataFilter,{$set:infos}, function(err, result){
			db.close();
		});
	});
}


exports.dbInsertOne=function(table,dataInsert){

	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insert(dataInsert);

	});
}


exports.dbSendMore=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertMany(infos, function(err, result){
			db.close();
		});
	});
}


exports.dbGetOne=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);
		collection.findOne(infos).then(function(res){
			setResult(res);
			db.close();
		});
	});
return result;
}

exports.getMaxValParam=function(table,param){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		$a=collection.find({}).toArray(function(err,res){
			console.log(res);
			db.close();
		});

	});

}

exports.dbGetMore=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.find(data).toArray(function(err,res){
			setResult(res);
			db.close();
		})
	});

	return result;
}