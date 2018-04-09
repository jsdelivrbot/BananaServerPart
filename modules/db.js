var MongoClient = require('mongodb').MongoClient;
var _db=null;
MongoClient.connect("mongodb://Singuliarity1:Qazxswedc1@lobster-lab.net:27017/banandata", function (err, db) {
	_db=db;
});

result="result";
max=null;

function setMax(maximum){
	max=maximum;
}

function setResult(res){
	result= res;
}


exports.DataWork = {

	connectToServer: function () {

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
		$res=12;
		if(_db!=null){
					var datas = _db.db("banandata");
					var collection = datas.collection(table);
					var infos = JSON.parse(data);
					$res=collection.find(infos);/*.then(function(res){
						result=res;
						console.log("___________");
						console.log(data);
						console.log(result);

					});*/

		}
		return $res;
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