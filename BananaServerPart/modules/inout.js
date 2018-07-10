
function detectedType(data){
	var $val;
	switch(typeof(data)){
			case "number":
				$val=data;
			break;
			case "string":
				if(parseFloat(data)){
					$val=parseFloat(data);
				}else{
					$val=data;
				}
			break;
	}
	return $val;
}
function toString($val){
	return String($val);
}
exports.in=function(data){
	console.log(data);

	try {
		infor = JSON.parse(data);

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
