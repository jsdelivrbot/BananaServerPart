
exports.in=function(data){
	try {
		infor = JSON.parse(data);
		console.log("TRUE");
	}catch(e){
		console.log("FALSE");
	}

};
exports.out=function(data){};
