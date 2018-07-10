var DB=require("./db.js");
var file = require("fs");
var Banana_Tick=[];
var Sugar_Tick=[];
var Tobacco_Tick=[];
var Coffee_Tick=[];


var Banana_Price=[];
var Sugar_Price=[];
var Tobacco_Price=[];
var Coffee_Price = [];


var Banana_Tick_Month = [];
var Sugar_Tick_Month = [];
var Tobacco_Tick_Month = [];
var Coffee_Tick_Month = [];


var Banana_Price_Month = [];
var Sugar_Price_Month = [];
var Tobacco_Price_Month = [];
var Coffee_Price_Month = [];





function variation($percent) {
    $add = 0;
    $type = "";
    while ($add == 0) {
        if ($percent < 40) {
            $type = "flat";
            $add = Math.round(Math.random() * 2 - 1) * 0.002
        }
        if ($percent >= 40 && $percent < 65) {
            $type = "small up";
            $add = Math.round(Math.random() * 25 + 10) / 10000;
        }
        if ($percent >= 65 && $percent < 70) {
            $type = "big up";
            $add = Math.round(Math.random() * 4 + 4) / 1000;
        }
        if ($percent >= 70 && $percent < 95) {
            $type = "small down";
            $add = -Math.round(Math.random() * 25 + 10) / 10000;
        }
        if ($percent >= 95) {
            $type = "big down";
            $add = -Math.round(Math.random() * 4 + 4) / 1000;
        }
    }
    return [$add, $type];
}















exports.marketEmulationNewServer = function (db) {

    startenMarket(db);
    $sut = 24 * 60 * 60 * 1000;
    setInterval(startenMarket, $sut, db);

}









exports.marketEmulation=function (db,socket,sockets){
    setInterval(getStatusMarket, 60000, db, sockets);
}

function getStatusMarket(db, sockets) {
    DB.getOther(function (res) {
        if (res != null) {
          
            if (res.Coffee_price_tick > 20 && ((res.Coffee_price >= 65 && res.Coffee_price < 70) || (res.Coffee_price >= 95))) {
                sockets.emit("alert", "Coffee Market is down");
            }

            if (res.Banana_price_tick > 20 && ((res.Banana_price >= 65 && res.Banana_price < 70) || (res.Banana_price >= 95))) {
                sockets.emit("alert", "Coffee Market is down");
            }
            if (res.Sugar_price_tick > 20 && ((res.Sugar_price >= 65 && res.Sugar_price < 70) || (res.Sugar_price >= 95))) {
                sockets.emit("alert", "Coffee Market is down");
            }
            if (res.Tobacco_price_tick > 20 && ((res.Tobacco_price >= 65 && res.Tobacco_price < 70) || (res.Tobacco_price >= 95))) {
                sockets.emit("alert", "Coffee Market is down");
            }

        }

    }, "MarketStatus", {}, db);
   
}

function setTickOnTime(db, $product_price, $product_course){
 
   
        $product = { "Product": $product_price };
        DB.getOtherMore(function (res) {
         
            $resultTime = 0;
            $i = 0;
            $course = 0;
            for (var key in res) {
                $now = true;
                for (var tickTime = 1; tickTime <= res[key]["Tick"]; tickTime++){
                    $percent = res[key]["Price"];
                $adding = variation($percent);
                $price = $price + $adding[0];
                if ($price < 0.4) {
                    while ($price < 0.3) {
                        $percent = Math.floor(Math.random() * 100);
                        $adding = variation($percent);
                        $price = $price + $adding[0];
                    }
                }
                if ($price > 3) {
                    while ($price > 2.9) {
                        $percent = Math.floor(Math.random() * 100);
                        $adding = variation($percent);
                        $price = $price + $adding[0];
                    }

                }
                    $resultTime += 5 * 1000;

                    if ($i == 0) {
                        $course = 0;
                    } else {
                        if ($percent > 40 && $percent < 70) {
                            $course = 1;
                        } else {
                            $course = 0;
                        }
                    }

                  
                    $i++;
                    setTimeout(changedPrice, $resultTime, $product_price, $price, $product_course, $course, res[key]["Tick"], $now, $percent, db);
                        
                    $now = false;
                }
            }

        }, "MarketEvolution", $product, db);

 

}

function changedPrice($product_price, price, $product_course, $course, tick,$now,$percent, db){



    $text = $product_price;
    $textTick = $product_price+"_tick";
    $courseproduct = $product_course;
    $jsonStatus = {}
    $jsonStatus[$text] = $percent;
    $jsonStatus[$textTick] = tick;
	$json={};
	$json[$text]=price;
    $json[$courseproduct] = $course;
   
    DB.getOther(function (res) {
       
        DB.dbUpdateOne("Market", {}, $json, db);
        DB.dbUpdateOne("MarketStatus", {}, $jsonStatus, db);

    }, "Market", {}, db);
	
}

function randomTick(min,max){
	hours24=24*60*60;
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
		

        $percent = Math.floor(Math.random() * 100);

      
            switch ($product) {
                case "Banana":


                    Banana_Price[$i] = $percent;
                    break;
                case "Sugar":

                    Sugar_Price[$i] = $percent;
                    break;
                case "Tobacco":

                    Tobacco_Price[$i] = $percent;
                    break;
                case "Coffee":

                    Coffee_Price[$i] = $percent;
                    break;
            }
            $i++;
        
		
	}
}

function setPricesAndTicks(db){
    setTickOnTime(db, "Banana_price", "Banana_cource");
    setTickOnTime(db, "Sugar_price", "Sugar_cource");
    setTickOnTime(db, "Tobacco_price", "Tobacco_cource");
    setTickOnTime(db, "Coffee_price", "Coffee_cource");
}


function setPricesAndTicksNextDay(db){
	DB.getOther(function (res) {
		DB.deleteDatas("MarketEvolutionNextDay",{},db);
		generateAllTick();
		bananaPrice=1;
		sugarPrice=1;
		tobaccoPrice=1;
		coffeePrice=1;
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
            
		}else{
			DB.getOther(function (res) {
				price=[res.Banana_price,res.Sugar_price,res.Tobacco_price,res.Coffee_price];
				product=["Banana","Sugar","Tobacco","Coffee"];
				tick=[Banana_Tick,Sugar_Tick,Tobacco_Tick,Coffee_Tick];
				prices=[Banana_Price,Sugar_Price,Tobacco_Price,Coffee_Price];
				randomWriteAll(db,price,product,tick,prices);
                
			},"Market",{},db);
		}
        rewritePrices(db);
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

    for (var key in tick){
		$json={};
		$json.Price=price[key];
        $json.Tick = tick[key];
		$json.Product=product+"_price";
		DB.dbSendOne("MarketEvolutionNextDay", $json, db);
    }

}

function rewritePrices(db){
	DB.deleteDatas("MarketEvolution",{},db);

    DB.getOtherMore(function (res) {
     
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

    rewritePrices(db);
    
    setPricesAndTicks( db);
    setPricesAndTicksNextDay( db);

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