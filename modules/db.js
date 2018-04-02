var MongoClient = require('mongodb').MongoClient;
result=null;

function setResult(res){
	result= res;
}
exports.dbSend=function(table,data){

	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertOne(infos, function(err, result){
			db.close();
		});
	});
}


exports.dbGetOne=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);
		collection.findOne(infos).then(function(res){
			setResult(res);
		});
		db.close();
	});
return result;
}


exports.dbGetMore=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
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