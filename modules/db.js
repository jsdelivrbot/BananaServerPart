
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
		var infos = data;
		collection.insertOne(infos, function(err, result){
		});
}



exports.dbUpdateOne=function(table,dataFilter,dataUpdate,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = dataUpdate;
		collection.updateOne(dataFilter,{$set:infos}, function(err, result){});

}


exports.dbInsertOne=function(table,dataInsert,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		collection.insert(dataInsert);
}


exports.dbSendMore=function(table,data,db){
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.insertMany(infos, function(err, result){
		});
}

exports.getOther=function(callback,table,data,db){

		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);

		$res=collection.findOne(infos,function(err,res){
			callback(res);
		});
		return $res;
}


exports.getOtherMore=function(callback,table,data,db){

	var datas = db.db("banandata");
	var collection = datas.collection(table);
	var infos = JSON.parse(data);
	$res=collection.find(infos).toArray(function(err,res){
		callback(res);
	});
	return $res;
}
var finres;
var oldres;
exports.dbGetOne=function(table,data,db){
	finres=null;
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = JSON.parse(data);
		collection.findOne(infos).then(function(res,err){
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

exports.dbGetMore=function(table,data,db){
		var datas = db.db("banandata");
		var collection = datas.collection(table);
		var infos = data;
		collection.find(data).toArray(function(err,res){
			finres=res;
			 
	});
	if(oldres!=finres){
		return finres;
		finres=oldres;
	}
}