var MongoClient = require('mongodb').MongoClient;
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
	dat="result";
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);


		collection.findOne(infos,function(err,res){
			dat=res;
			db.close();
			console.log(dat);
		})
		console.log("___________________");
		console.log(dat);
	});


	return dat;
}


exports.dbGetMore=function(table,data){
	var $return_info="";
	MongoClient.connect('mongodb://Singuliarity1:Qazxswedc1@ds215759.mlab.com:15759/banandata', function(err, db) {
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.find(data).toArray(function(err,res){
			$return_info=res;
			db.close();
		})
	});

	return $return_info;
}