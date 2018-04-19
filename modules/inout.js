
function detectedType(data){
	console.log(data);
	console.log(typeof(data));
	switch(typeof(data)){
		case "number":

			console.log("number");
			break;
		case "string":
			console.log("number");
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
