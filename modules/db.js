
var result=null;
var max=null;
function setMax(maximum){
	max=maximum;
}

function setResult(res){
	result= res;
}




exports.dbSendOne=function(table,data,db){
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insertOne(data, function(err, result){
		});
}



exports.dbUpdateOne=function(table,dataFilter,dataUpdate,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.updateOne(dataFilter,{$set:dataUpdate}, function(err, result){

		});

}


exports.dbUpdateCallback=function(table,dataFilter,dataUpdate,db,callback){

	var datas = db.db("banandata");
	var collection = datas.collection(table);
	collection.updateOne(dataFilter,{$set:dataUpdate}, function(err, result){
		callback(result);
	});

}

exports.dbInsertOne=function(table,dataInsert,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insert(dataInsert);
}


exports.dbSendMore=function(table,data,db){
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insertMany(data, function(err, result){
		});
}

exports.getOther=function(callback,table,data,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		$res=null;
		try {
			$res = collection.findOne(data, function (err, res) {
				callback(res);
			});
		}catch (err){
			callback("Invalid request format");
		}
		return $res;

}


exports.getOtherMore=function(callback,table,data,db){

	var datas = db.db("banandata");
	var collection = datas.collection(table);
	$res=null;
	try {
	$res=collection.find(data).toArray(function(err,res){
		callback(res);
	});
	}catch (err){
		callback("Invalid request format");
	}
	return $res;
}
var finres;
var oldres;
exports.dbGetOne=function(table,data,db){
	finres=null;
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.findOne(data).then(function(res,err){
			finres=res;
			return res;
		});
if(oldres!=finres){
	return finres;
	finres=oldres;
}
}

exports.getMaxValParam=function(table,param,db){
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
return max;
}

exports.deleteDatas=function(table,data,db){
	var datas = db.db("banandata");
	var collection = datas.collection(table);
	collection.deleteMany(data,function(err,res){});
}

exports.dbGetMore=function(table,data,db){
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.find(data).toArray(function(err,res){
			finres=res;
			 
	});
	if(oldres!=finres){
		return finres;
		finres=oldres;
	}
}