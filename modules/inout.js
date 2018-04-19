
function detectedType(data){
	console.log(data);
	console.log(typeof(data));
	switch(typeof(data)){
		case "Number":

			console.log("Number");
			break;
		case "String":
			console.log("Number");
			break;
	}
}

exports.in=function(data){
	try {
		infor = JSON.parse(data);

		for(var $key in infor){
				detectedType(infor[$key]);
		}
		return infor;
	}catch(e){
		return false;
	}

};
exports.out=function(data){
	try {
		infor = JSON.stringify(data);
		return infor;
	}catch(e){
		return false;
	}
};
