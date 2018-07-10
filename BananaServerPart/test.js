
var file = require("fs");
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);

var Banana_Tick = [];
var Sugar_Tick = [];
var Tobacco_Tick = [];
var Coffee_Tick = [];


var Banana_Price = [];
var Sugar_Price = [];
var Tobacco_Price = [];
var Coffee_Price = [];


var Banana_Tick_Month = [];
var Sugar_Tick_Month = [];
var Tobacco_Tick_Month = [];
var Coffee_Tick_Month = [];


var Banana_Price_Month = [];
var Sugar_Price_Month = [];
var Tobacco_Price_Month = [];
var Coffee_Price_Month = [];

const PORT = /* process.env.PORT || */5892;
const INDEX = path.join(__dirname, 'index.html');

app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.set('view options', { layout: 'layout' });
server.listen(PORT, () => console.log(`Listening on ${PORT}`));






function marketEmulationMonth () {
    

        //  DB.getOther(function (res) {



        var $priceBanan = [1, 0, Math.floor(Math.random() * 100)];
        var $priceSugar = [1, 0, Math.floor(Math.random() * 100)];
        var $priceTobaco = [1, 0, Math.floor(Math.random() * 100)];
        var $priceCoffee = [1, 0, Math.floor(Math.random() * 100)];

        randomTickGeneratedMonth();
        var writeStream = file.createWriteStream("priceLog.csv");
        var $str = "Days" + " ; " + " Tick" + " ; " + "Banana" + " ; " + "Sugar" + "; " + "Tobaco" + " ; " + "Coffee" + " ; " + "BananaTrend" + " ; " + "SugarTrend" + "; " + "TobacoTrend" + " ; " + "CoffeeTrend" + " \n";
        writeStream.write($str);
        oldday = 0;
        var $fullTime = 24 * 60 * 60;

        for (var d = 0; d <= 29; d++) {

            for (var time = 0; time <= $fullTime; time += 5) {
                res = false;
                if (d != oldday) {
                    res = true;
                    oldday = d;
                }

                $priceBanan = randomPriceEvoMonth(Banana_Tick_Month, $priceBanan[0], "Banana", d, time, $priceBanan[1], res, $priceBanan[2]);
                $priceSugar = randomPriceEvoMonth(Sugar_Tick_Month, $priceSugar[0], "Sugar", d, time, $priceSugar[1], res, $priceSugar[2]);
                $priceTobaco = randomPriceEvoMonth(Tobacco_Tick_Month, $priceTobaco[0], "Tobacco", d, time, $priceTobaco[1], res, $priceTobaco[2]);
                $priceCoffee = randomPriceEvoMonth(Coffee_Tick_Month, $priceCoffee[0], "Coffee", d, time, $priceCoffee[1], res, $priceCoffee[2]);

                $str = (d + 1) + " ; ";
                if (time == 0) {
                    $str += "0:0:0 ;";
                } else {
                    $str += Math.ceil(time / 3600 % 24 - 1) + ":" + Math.ceil(time / 59 % 60 - 1) + ":" + Math.ceil(time % 60) + " ; ";
                }
                $str += $priceBanan[0].toFixed(4) + " ; ";
                $str += $priceSugar[0].toFixed(4) + " ; ";
                $str += $priceTobaco[0].toFixed(4) + " ; ";
                $str += $priceCoffee[0].toFixed(4) + " ; ";
                $str += $priceBanan[3] + " : " + $priceBanan[4] + " ; ";
                $str += $priceSugar[3] + " : " + $priceBanan[4] + " ; ";
                $str += $priceTobaco[3] + " : " + $priceBanan[4] + " ; ";
                $str += $priceCoffee[3] + " : " + $priceBanan[4] + " \n ";

                writeStream.write($str);
            }
            oldday = d;
        }
        // file.writeFile("priceLog.csv", $str, { encoding: "text" })
        writeStream.end();

        //writeStream.close();
        $priceBanan = null;
        $priceSugar = null;
        $priceTobaco = null;
        $priceCoffee = null;
        Banana_Tick_Month = null;
        Sugar_Tick_Month = null;
        Tobacco_Tick_Month = null;
        Coffee_Tick_Month = null;
        Banana_Price_Month = null;
        Sugar_Price_Month = null;
        Tobacco_Price_Month = null;
        Coffee_Price_Month = null;
        writeStream = null;
        // }, "Market", {}, db);

  
}




function randomTickMonth(min, max) {
    ticks = [];
    for (var j = 0; j <= 29; j++) {

        hours24 = 24 * 60 * 12;
        timeNow = 0;
        i = 0;
        $min = 0;
        $vals = 1;

        ticks[j] = [];
        while (timeNow < hours24) {


            $percent = Math.random() * 100;
            if ($percent <= 50) {

                $vals = 4;
                $min = 1;
            }

            if ($percent > 50 && $percent <= 75) {
                {
                    $vals = 15;
                    $min = 5;
                }
                if ($percent > 75) {

                    $vals = 20;
                    $min = 20;
                }

                tick = Math.floor(Math.random() * ($vals)) + $min;
                ticks[j][i] = tick;
                timeNow += tick;
                i++;
            }


        }
    }
    return ticks;
}


function randomPriceEvoMonth(productTick, $priceNull, $product, day, times, tick, reset, $percent) {
    $price = $priceNull;
    $str = "";


    $finalTime = 0

    var $tick = tick;
    var $stick = -1;
    var $i = 0;
    if (reset == true) { $tick = 0; $percent = 0; }
    while (times >= $finalTime) {


        $finalTime += productTick[day][$i] * 5;
        $stick = $i;
        $i++;
    }
    if ($tick < $stick) {
        $tick = $stick;
        $percent = Math.floor(Math.random() * 100);
    }

    $adding = variation($percent);

    $price = $price + $adding[0];
    if ($price < 0.5) {
        
            $percent = Math.floor(Math.random() * 100);
            $adding = variationLow($percent);
            $price = $price + $adding[0];
        
    }
    if ($price > 3) {
       
            $percent = Math.floor(Math.random() * 100);
            $adding = variationHigh($percent);
            $price = $price + $adding[0];
        
    }
    $price = parseFloat($price.toFixed(4));

    return [$price, $tick, $percent, $adding[1], $adding[0]];
}

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


function variationLow($percent) {
    $add = 0;
    $type = "";
    while ($add == 0) {
        if ($percent < 20) {
            $type = "flat";
            $add = Math.round(Math.random() * 2 - 1) * 0.002
        }
        if ($percent >= 20 && $percent < 70) {
            $type = "small up";
            $add = Math.round(Math.random() * 25 + 10) / 10000;
        }
        if ($percent >= 70) {
            $type = "big up";
            $add = Math.round(Math.random() * 4 + 4) / 1000;
        }
       
    }
    return [$add, $type];
}





function variationHigh($percent) {
    $add = 0;
    $type = "";
    while ($add == 0) {
        if ($percent < 10) {
            $type = "flat";
            $add = Math.round(Math.random() * 2 - 1) * 0.002
        }
        if ($percent >= 10 && $percent < 20) {
            $type = "small up";
            $add = Math.round(Math.random() * 25 + 10) / 10000;
        }
       
        if ($percent >= 20 && $percent < 70) {
            $type = "small down";
            $add = -Math.round(Math.random() * 25 + 10) / 10000;
        }
        if ($percent >= 70) {
            $type = "big down";
            $add = -Math.round(Math.random() * 4 + 4) / 1000;
        }
    }
    return [$add, $type];
}


function randomTickGeneratedMonth() {
    Banana_Tick_Month = randomTickMonth(1, 40);
    Sugar_Tick_Month = randomTickMonth(1, 40);
    Tobacco_Tick_Month = randomTickMonth(1, 40);
    Coffee_Tick_Month = randomTickMonth(1, 40);
}



function generateAllTickMonthMonth() {
    randomTickGeneratedBananMonth();
    randomTickGeneratedSugarMonth();
    randomTickGeneratedTobaccoMonth();
    randomTickGeneratedCoffeeMonth();
}





marketEmulationMonth();












