var MongoClient = require('mongodb').MongoClient;
result=null;

function setResult(res){
	result= res;
}
exports.dbSendOne=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertOne(infos, function(err, result){
			console.log(err);
			console.log(result);
			db.close();
		});
	});
}


exports.dbUpdateOne=function(table,data,dataFilter){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = dataFilter;
		collection.updateOne({$mod:infos},{$set:data}, function(err, result){
			console.log(err);
			console.log(result);
			db.close();
		});
	});
}

exports.dbUpdateOne=function(table,data,dataFilter){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = dataFilter;
		collection.updateOne(infos,{$set:data}, function(err, result){
			console.log(err);
			console.log(result);
			db.close();
		});
	});
}


exports.dbSendMore=function(table,data){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertMany(infos, function(err, result){
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
			db.close();
		});
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