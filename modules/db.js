var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var result=null;
max=null;
var _db=null;
function setMax(maximum){
	max=maximum;
}
function setDB(DB){

	_db=DB;
}
function setResult(res){
	result= res;
}

exports.DataWork = {

	connectToServer: function () {
		MongoClient.connect("mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata", function (err, db) {
			setDB(db);
		});
	},

	getDb: function () {
		return _db;
	},
	closeDB: function(){
		if(_db!=null) {
			_db.close();
		}
	},
	dbGetOne: function (table, data) {
		if(_db!=null){
					var datas = _db.db("banandata");
					var collection = datas.collection(table);
					var infos = JSON.parse(data);
			console.log("__________");
			console.log(infos);
			var resu = collection.findOne(infos);
			console.log(resu);

					return resu;
			}else{

			}
	}
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
		resu=collection.findOne(infos);
		db.close();
	});
return result;
}

exports.getMaxValParam=function(table,param){
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata', function(err, db) {
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
			db.close();
		});

	});
return max;
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