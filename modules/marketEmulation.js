var DB=require("./db.js");

var Banana_Tick=[];
var Sugar_Tick=[];
var Tobacco_Tick=[];
var Coffee_Tick=[];


var Banana_Price=[];
var Sugar_Price=[];
var Tobacco_Price=[];
var Coffee_Price=[];

exports.marketEmulation=function (db){
	startenMarket(db);
	$sut=24*60*60*1000;
	setInterval(startenMarket,$sut,db);
}


function setTickOnTime(db,$product_price){
	$product={"Product":$product_price};
	DB.getOther(function (res) {
		$resultTime=0;
		for(var key in res){
			$resultTime+=5*1000*res.Tick;
			setTimeout(changedPrice,$resultTime,$product_price,res.Price,db);
		}

	},"MarketEvolution",$product,db);
}

function changedPrice($product_price,price,db){

	$text=$product_price;
	$json={};
	$json[$text]=price;
	DB.dbUpdateOne("Market", {}, $json, db);
}

function randomTick(min,max){
	hours24=24*60*12;
	timeNow=0;
	i=0;
	$vals=max-min;
	ticks=[];
	while(timeNow<hours24) {
		tick = Math.floor(Math.random() * ($vals))+min;
		ticks[i]=tick;
		timeNow+=tick;
		i++;
	}
	return ticks;
}


function randomPriceEvo(productTick,$priceNull,$product){
	$price=$priceNull;
	$i=0;
	for(var key in productTick){
		$percent=0;

		if(Math.floor(Math.random() * (100))>50) {
			$od =+1
		}else{
			$od =-1
		}

		if(productTick[key]>=1 && productTick[key]<5){
			$percent=$od*0.005;
		}

		if(productTick[key]>=5 && productTick[key]<20){
			$percent=$od*0.003;
		}

		if(productTick[key]>=20){
			$percent=$od*0.002;
		}
		$price=$price+$price*$percent;
		$price=parseFloat($price.toFixed(2));

		switch($product){
			case "Banana":
				Banana_Price[$i]=$price;
				break;
			case "Sugar":
				Sugar_Price[$i]=$price;
				break;
			case "Tobacco":
				Tobacco_Price[$i]=$price;
				break;
			case "Coffee":
				Coffee_Price[$i]=$price;
				break;
		}
		$i++;

	}
}

function setPricesAndTicks(db){
		setTickOnTime(db,"Banana_price");
		setTickOnTime(db,"Sugar_price");
		setTickOnTime(db,"Tobacco_price");
		setTickOnTime(db,"Coffee_price");
}


function setPricesAndTicksNextDay(db){
	DB.getOther(function (res) {
		DB.deleteDatas("MarketEvolutionNextDay",{},db);
		generateAllTick();
		bananaPrice=150;
		sugarPrice=150;
		tobaccoPrice=150;
		coffeePrice=150;
		if(res!=null) {
			for (var key in res) {
				switch (res[key]["Product"]) {
					case "Banana_price":
						bananaPrice = res[key]["Banana_price"];
						break;
					case "Sugar_price":
						sugarPrice = res[key]["Sugar_price"];
						break;
					case "Tobacco_price":
						tobaccoPrice = res[key]["Tobacco_price"];
						break;
					case "Coffee_price":
						coffeePrice = res[key]["Sugar_price"];
						break;
				}
			}
			price=[bananaPrice,sugarPrice,tobaccoPrice,coffeePrice];
			product=["Banana","Sugar","Tobacco","Coffee"];
			tick=[Banana_Tick,Sugar_Tick,Tobacco_Tick,Coffee_Tick];
			prices=[Banana_Price,Sugar_Price,Tobacco_Price,Coffee_Price];
			randomWriteAll(db,price,product,tick,prices);
			rewritePrices(db);
		}else{
			DB.getOther(function (res) {
				price=[res.Banana_price,res.Sugar_price,res.Tobacco_price,res.Coffee_price];
				product=["Banana","Sugar","Tobacco","Coffee"];
				tick=[Banana_Tick,Sugar_Tick,Tobacco_Tick,Coffee_Tick];
				prices=[Banana_Price,Sugar_Price,Tobacco_Price,Coffee_Price];
				randomWriteAll(db,price,product,tick,prices);
				rewritePrices(db);
			},"Market",{},db);
		}

	},"MarketEvolution",{},db)
}
function randomWrite(db,price,type,tick,pricetick){
	randomPriceEvo(tick, price, type);
	writePriceTicksNextDay(db,tick,pricetick,type);
}

function randomWriteAll(db,price,product,tick,prices){
	randomWrite(db,price[0],product[0],tick[0],prices[0]);
	randomWrite(db,price[1],product[1],tick[1],prices[1]);
	randomWrite(db,price[2],product[2],tick[2],prices[2]);
	randomWrite(db,price[3],product[3],tick[3],prices[3]);
}

function writePriceTicksNextDay(db,tick,price,product){

	for(var key in tick){
		$json={};
		$json.Price=price[key];
		$json.Tick=tick[key];
		$json.Product=product+"_price";
		DB.dbSendOne("MarketEvolutionNextDay", $json, db);
	}
}

function rewritePrices(db){
	DB.deleteDatas("MarketEvolution",{},db);

	DB.getOtherMore(function(res){
		if(res!=null) {
			for (var key in res) {
				$json=res[key];
				delete $json._id;
				DB.dbSendOne("MarketEvolution", $json, db);
			}
		}
	},"MarketEvolutionNextDay",{},db);

}

function startenMarket(db){
	console.log("_______________________");
	console.log("Restart");
	console.log("_______________________");
	rewritePrices(db);
	setPricesAndTicks(db);
	setPricesAndTicksNextDay(db);
}

function randomTickGeneratedBanan(){
	Banana_Tick=randomTick(1,40);
}
function randomTickGeneratedSugar(){
	Sugar_Tick=randomTick(1,40);
}
function randomTickGeneratedTobacco(){
	Tobacco_Tick=randomTick(1,40);
}
function randomTickGeneratedCoffee(){
	Coffee_Tick=randomTick(1,40);
}


function generateAllTick(){
	randomTickGeneratedBanan();
	randomTickGeneratedSugar();
	randomTickGeneratedTobacco();
	randomTickGeneratedCoffee();
}