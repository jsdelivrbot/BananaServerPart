
var DB=require("./db.js");
var transformData=require("./inout.js");
var createUsers=require("./createdUsers.js");
exports.getUserBaseInfo=function (socket,iosockets,db){
    socket.on("getUserBaseInfo", function (data) {

    	try {
            infor = transformData.in(data);

		    createUsers.create(db, infor, function () {
			    if (infor != null) {
				    DB.getOther(function (res) {
					    if (res != null) {
						    if (typeof(res) != "string") {
							    delete res["_id"];
							    delete res["Id_User"];
							    delete res["Ranking"];
						    }
						    socket.emit('getUserBaseInfo', res);
					    } else {
						    socket.emit('getUserBaseInfo', "No User");
					    }
				    }, "User", infor, db);
			    } else {
				    socket.emit('getUserBaseInfo', "Invalid request format");
			    }
		    });
        } catch (e) {
            socket.emit('getUserBaseInfo', "Invalid request format");
        }
    });

}


exports.getUserAgronom=function (socket,iosockets,db){
	socket.on("getUserAgronom",function(data){
		infor=transformData.in(data);
		infor.Type_employer=0;
		getOneEmployer(infor,db,'getUserAgronom',socket,"Agronom");
	});
}

exports.getUserAgronoms=function (socket,iosockets,db){
	socket.on("getUserAgronoms",function(data){
		infor=transformData.in(data);
		infor.Type_employer=0;
		getMoreEmployer(infor,db,'getUserAgronoms',socket,"Agronom");
	});
}

exports.getUserLobbyist=function (socket,iosockets,db){
	socket.on("getUserLobbyist",function(data){
		infor=transformData.in(data);
		infor.Type_employer=1;
		getOneEmployer(infor,db,'getUserLobbyist',socket,"Lobbyist");
	});
}

exports.getUserLobbyists=function (socket,iosockets,db){
	socket.on("getUserLobbyists",function(data){
		infor=transformData.in(data);
		infor.Type_employer=1;
		getMoreEmployer(infor,db,'getUserLobbyists',socket,"Lobbyist");
	});
}

exports.getUserDirector=function (socket,iosockets,db){
	socket.on("getUserDirector",function(data){
		infor=transformData.in(data);
		infor.Type_employer=2;
		getOneEmployer(infor,db,'getUserDirector',socket,"Director");
	});
}

exports.getUserDirectors=function (socket,iosockets,db){
	socket.on("getUserDirectors",function(data){
		infor=transformData.in(data);
		infor.Type_employer=2;
		getMoreEmployer(infor,db,'getUserDirectors',socket,"Director");
	});
}

exports.getUserScientific=function (socket,iosockets,db){
	socket.on("getUserScientific",function(data) {
		infor = transformData.in(data);
		infor.Type_employer=3;
		getOneEmployer(infor,db,'getUserScientific',socket,"Scientific");
	});
	}


exports.getUserScientifics=function (socket,iosockets,db){
	socket.on("getUserScientifics",function(data){
		infor=transformData.in(data);
		infor.Type_employer=3;
		getMoreEmployer(infor,db,'getUserScientifics',socket,"Scientific");
	});
}


exports.getUserTraider=function (socket,iosockets,db){
	socket.on("getUserTraider",function(data){
		infor=transformData.in(data);
		infor.Type_employer=4
		getOneEmployer(infor,db,'getUserTraider',socket,"Traider");
	});
}



exports.getUserTraiders=function (socket,iosockets,db){
	socket.on("getUserTraiders",function(data){
		infor=transformData.in(data);
		infor.Type_employer=4;
		getMoreEmployer(infor,db,'getUserTraiders',socket,"Traider");
	});
}

function getMoreEmployer(infor,db,Emit,socket,named){
	$names=named+"_Level";
	createUsers.create(db,infor,function() {
		DB.getOtherMore(function (res) {
			if (res != null && res.length!=0) {
				if (typeof(res) != "string") {
					for (var $key in res) {
						res[$key][$names]=res[$key]["Employer_Level"];
						delete  res[$key]["_id"];
						delete  res[$key]["Id_User"];
						delete  res[$key]["Job_Offer"];
						delete  res[$key]["Type_employer"];
						delete  res[$key]["Hire_status"];
						delete  res["Hire_position"];
						delete  res[$key]["Employer_Level"];
					}
				}
				socket.emit(Emit, res);
			}else{
				socket.emit(Emit, -1);
			}
		}, "UserEmployer", infor, db);
	});
}


function getOneEmployer(infor,db,Emit,socket,named){
	$names=named+"_Level";
	createUsers.create(db,infor,function() {
		DB.getOther(function (res) {
			if (res != null) {
				if (typeof(res) != "string") {
					res[$names]=res.Employer_Level;
					delete res["_id"];
					delete res["Id_User"];
					delete res["Job_Offer"];
					delete res["Type_employer"];
					delete res["Hire_status"];
					delete res["Hire_position"];
					delete res["Employer_Level"];
				}
				socket.emit(Emit, res);
			}else{
				socket.emit(Emit, -1);
			}
		}, "UserEmployer", infor, db);
	});
}


exports.getUserEmployer=function (socket,iosockets,db){
	socket.on("getUserEmployer",function(data){
		infor=transformData.in(data);
		createUsers.create(db,infor,function() {
			DB.getOther(function (res) {
				if (res != null) {
					if (typeof(res) != "string") {
						delete res["_id"];
						delete res["Id_User"];
						delete res["Job_Offer"];
						delete res["Hire_status"];
						delete res["Id_parsel"];
						delete res["Hire_position"];
						delete res["Id_map"];
					}
					socket.emit('getUserEmployer', res);
				}else{
					socket.emit('getUserEmployer', -1);
				}
			}, "UserEmployer", infor, db);
		});
	});
}

exports.getUserEmployers=function (socket,iosockets,db){
	socket.on("getUserEmployers",function(data){
		infor=transformData.in(data);
		createUsers.create(db,infor,function() {
			DB.getOtherMore(function (res) {
				if (res != null && res.length!=0) {
					if (typeof(res) != "string") {
						for (var $key in res) {
							delete res[$key]["_id"];
							delete res[$key]["Id_User"];
							delete res[$key]["Job_Offer"];
							delete res[$key]["Hire_status"];
							delete res[$key]["Id_parsel"];
							delete res[$key]["Hire_position"];
							delete res[$key]["Id_map"];
						}
					}
					socket.emit('getUserEmployers', res);
				}else{
					socket.emit('getUserEmployers', -1);
				}
			}, "UserEmployer", infor, db);
		});
	});
}

exports.getUserEmployeerItems=function (socket,iosockets,db) {
		socket.on("getUserEmployeerItems", function (data) {
            infor = transformData.in(data);
            createUsers.EmployeerItems(infor,db);
		createUsers.create(db,infor,function() {
			DB.getOtherMore(function (res) {
				if (res != null && res.length!=0) {
					if (typeof(res) != "string") {
						for (var $key in res) {
							delete res[$key]["_id"];
							delete res[$key]["Id_User"];
							delete res[$key]["Type_employer"];
							delete res[$key]["Position"];
						}
					}
					socket.emit('getUserEmployeerItems', res);
				}else{
					socket.emit('getUserEmployeerItems', -1);
				}
			}, "UserEmployeerItems", infor, db);
		});
	});
}
	exports.deleteUser=function (socket,iosockets,db) {
		socket.on("deleteUser", function (data) {
			infor = transformData.in(data);
			$tables = ["Agronom", "Director", "Employeer",
				"EmployeerItems", "Employer", "Install",
				"Lobbyist", "Parsel", "Scientific", "Traider",
				"User", "UserAgronom", "UserEmployer",
				"Warehouse", "WarehouseAll", "buyEmployer"];
			$tables.forEach(function (item, i, $tables) {
				DB.deleteDatas(item, infor, db);
			});
			socket.emit('deleteUser', "User Deleted");

		});
	}

