// 
//  --- our app behavior logic ---
//
function getCacheBW(age) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('app_data', function(theJsonData) {
        var jsondata = theJsonData.json;
        var epochdata = theJsonData.epoch;
        //alert("cached");
        var cutoff = parseInt("16");
        var parsed_json = eval('(' + jsondata + ')');
        var location = parsed_json['location']['city'];
        //var theDatas = new Lawnchair('data');
        var timenow = new Date();
        var hour_now = timenow.getHours();
        var today = timenow.getDate();
        var timesaved = theJsonData.timesaved;
        //if (age == "olddata") {
        $('#loc_result').append("<br /> cached data from: " + age);
        // }
        var country = parsed_json['location']['country'];
        //alert("saved= " + json_data);
        var posy = 74;
        var posyt = 85;
        var example = document.getElementById('canvhere');
        var ctx2d = example.getContext('2d');
        ctx2d.fillStyle = "#000";
        ctx2d.fillRect(0, 0, 450, 2000);
        var ni = 1;
        var done_dt = 0;
        var first_hour = -1;
        hour_bg_bk = "000";
        var totalsnow = 0;
        var diff = (Math.round(new Date().getTime() / 1000) - epochdata) / 360;
        var hours = Math.round(diff);
        var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);

        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';
        ctx2d.fillText("Hourly weather for " + location + ".", 0, 10);
        ctx2d.fillText("Last updated: " + hours + " hours ago.", 0, 30);

        ctx2d.fillStyle = "#f2e857";
        ctx2d.fillRect(0, 40, 60, 16);
        ctx2d.fillStyle = '#000';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Wind (mph)", 2, 52);

        ctx2d.fillStyle = "#66A68B";
        ctx2d.fillRect(60, 40, 55, 16);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Temp (C)", 64, 52);

        ctx2d.fillStyle = "#2489ce";
        ctx2d.fillRect(115, 40, 55, 16);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Rain (mm)", 119, 52);

        ctx2d.fillStyle = "#FFF";
        ctx2d.fillRect(170, 40, 60, 16);
        ctx2d.fillStyle = '#000';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Snow (mm)", 172, 52);

        $.each(parsed_json.hourly_forecast, function(i, zone) {
            var imgi = new Image();
            imgi.src = "http://icons.wxug.com/i/c/i/" + zone.icon + ".gif";
            var ws = (parseInt(zone.wspd.english) * 6) + 10;
            var temp = (parseInt(zone.temp.metric) * 3) + 10;
            var start = 53;
            if (parseInt(zone.temp.metric) < 1) {
                start = 42 + (parseInt(zone.temp.metric) * 3);
                temp = 53 - start;
            }
            var hour = zone.FCTTIME.hour;
            if (hour > 12) {
                hour = hour - 12
            }
            var sky = parseInt(zone.sky);
            var rain_txt = parseInt(zone.qpf.metric);

            var rain = (parseInt(zone.qpf.metric) * 20) + 10;
            var snowlen = Math.round(zone.snow.metric);
            totalsnow = totalsnow + Math.round(zone.snow.metric);

            var snow = (parseInt(zone.snow.metric) * 2) + 10;
            var hour_bg_bk = "9F9F9F";
            var wind_bg = "51D251";
            var temp_bg = "FFB336";
            var wind_txt = "2f3e46";
            var temp_txt = "FFF";
            var ampm = zone.FCTTIME.ampm;
            if (first_hour == -1) {
                first_hour = zone.FCTTIME.hour;
            }
            var humid = parseInt(zone.humidity);
            var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);
            var new_score = 0;

            if (humid < 80) {
                new_score = Math.round((parseInt(zone.wspd.metric) * 3) + (parseInt(zone.temp.metric) * 2) + (100 - sky));

            }

            var cond = zone.condition;

            var yday = parseInt(zone.FCTTIME.yday);
            var hour_padded = parseInt(zone.FCTTIME.hour);
            var civil = parseInt(zone.FCTTIME.civil);

            var userhtml = " ";

            //ctx2d.fillStyle = "#778899";
            //ctx2d.fillRect(0, posy+2, 2, 44);
            //ctx2d.drawImage(imgi, 2, posy)
            //here
            ctx2d.font = '20px Arial';
            ctx2d.fillStyle = '#FFF';
            if (hour < 10) {

                ctx2d.fillText(hour, 16, posyt + 10);
            } else {
                ctx2d.fillText(hour, 6, posyt + 10);
            }

            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);

            //wind
            ctx2d.fillStyle = "#f2e857";
            ctx2d.fillRect(53, posy + 16, ws, 16);
            ctx2d.font = '10px Arial';
            ctx2d.fillStyle = wind_txt;
            ctx2d.fillText(zone.wspd.metric, 40 + ws, posyt + 17);

            //temp
            ctx2d.fillStyle = "#66A68B";
            ctx2d.fillRect(start, posy + 32, temp, 16);
            ctx2d.font = '10px Arial';
            ctx2d.fillStyle = temp_txt;
            ctx2d.fillText(zone.temp.metric, (start + 2), posyt + 33);

            //rain
            if (rain == 10 || zone.qpf.metric.length == 0) {
                ctx2d.fillStyle = "#2489ce";
                ctx2d.fillRect(53, posy + 48, 10, 16);
                ctx2d.font = '10px Arial';
                ctx2d.fillStyle = "FFF";
                ctx2d.fillText("0", 55, posyt + 49);
            } else {
                ctx2d.fillStyle = "#2489ce";
                ctx2d.fillRect(53, posy + 48, rain, 16);
                ctx2d.font = '10px Arial';
                ctx2d.fillStyle = "FFF";
                ctx2d.fillText(rain_txt, 45 + rain, posyt + 49);
            }


            //snow
            ctx2d.fillStyle = "#FFF";
            ctx2d.fillRect(53, posy + 64, snow, 16);
            ctx2d.font = '10px Arial';
            ctx2d.fillStyle = "#000";
            ctx2d.fillText(parseInt(zone.snow.metric), 53 + snow - (snowlen.toString().length * 12), posyt + 65);

            total_score = total_score + new_score;

            dt_ct = dt_ct + 1;

            ctx2d.font = '12px Arial';
            ctx2d.fillStyle = "#FFF";
            ctx2d.fillText(cond, 53, posyt);

            ctx2d.font = '13px Arial Bold ';

            if (first_hour >= 0) {
                //alert("f=" + first_hour);
                if (first_hour > 18) {
                    $('#calc').html("It's a bit late to hang out the washing now.");
                }
                first_hour = -2;
            }

            if (total_score > 270) {
                var res = dt_ct;
                if (done_dt == 0) {
                    $('#calc').html("Drying time: " + res + " hours");
                }
                done_dt = 1;
                total_score = 0;
            }
            posy = posy + 96;
            posyt = posyt + 96;

        });

        if (totalsnow > 10) {
            totalsnow = (totalsnow / 10);
            $('#snowfall').html(": " + Math.round(totalsnow) + " cm of snow on the way :-)");
        }

    });




}

        
        
function checkCacheDate() {
var gotdata = 0;
// Getting some data out of the lawnchair database
lawnchair.get('mydata', function(obj) {
    if (obj !== null) {
    //alert("have data");
    gotdata = -1;
    } else {
    alert("no data");
    gotdata = -1
    }
    doSomething(gotdata);
});

// Saving to the database
//lawnchair.save({key:'my_data_key', lastSync: currentTime, dataList: someData});         
    
}

function doSomething(datar) {
//alert("func" + datar);
if (datar == -1) {
getData();
} else {
getCache("olddata");
}
}

function resultsClick() {
//var somedata = "hihi";
//lawnchair.save({key:'mydata', lastSync:somedata});
$('#map').show();

}


function tryData() {
alert("trying");
getData();
}



function moveBox() { 
 var canvas = document.getElementById('canvasElement'); 
var context = canvas.getContext('2d'); 
var canvasWidth = "300"; 
var canvasHeight = "50"; 
var x = 10; 
var y = 10; 
context.font = '16px Arial';
// Clears out our canvas to redraw 
//context.clearRect(0,0, canvasWidth, canvasHeight); 
// Draws our box 
context.fillStyle = '#DE613F';
context.fillRect(x, y, 20, 20); 
var dt = 8;
// Increases our x variable by 1 each time this function is called, moving our box along the horizontal axis 
x++; 
// Calls our moveBox() every 33 milliseconds, causing the whole process to loop 
setTimeout(moveBox, 10); 

context.fillStyle = '#FFF';
//context.fillText("Drying time: " + dt + " hours", 15, 26);
//context.clearRect(0,0, 300, 50);
}





function getCacheNew(age) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('app_data', function(theJsonData) {
        var jsondata = theJsonData.json;
        var epochdata = theJsonData.epoch;
        //alert("cached");
        var cutoff = parseInt("16");
        var parsed_json = eval('(' + jsondata + ')');
        var location = parsed_json['location']['city'];
        //var theDatas = new Lawnchair('data');
        var timenow = new Date();
        var hour_now = timenow.getHours();
        var today = timenow.getDate();
        //if (age == "olddata") {
        $('#loc_result').append("<br /> cached data from: " + age);
        // }
        var country = parsed_json['location']['country'];
        //alert("saved= " + json_data);
        var posy = 14;
        var posyt = 25;
        var example = document.getElementById('canvhere');
        var ctx2d = example.getContext('2d');
        var ni = 1;
        var done_dt = 0;
        var first_hour = -1;
        hour_bg_bk = "8695B7";


        var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);

        $.each(parsed_json.hourly_forecast, function(i, zone) {
            var imgi = new Image();
            imgi.src = "http://icons.wxug.com/i/c/i/" + zone.icon + ".gif";
            var ws = (parseInt(zone.wspd.english) * 6) + 10;
            var temp = (parseInt(zone.temp.metric) * 3) + 10;
            var hour = zone.FCTTIME.hour;
            var sky = parseInt(zone.sky);
            var rain = parseInt(zone.qpf.metric);
            var hour_bg_bk = "9F9F9F";
            var wind_bg = "51D251";
            var temp_bg = "FFB336";
            var wind_txt = "FFF";
            var temp_txt = "FFF";
            var ampm = zone.FCTTIME.ampm;
            if (first_hour == -1) {
                first_hour = zone.FCTTIME.hour;
            }
            var humid = parseInt(zone.humidity);
            var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);
            var new_score = 0;

            if (humid < 80) {
                new_score = Math.round((parseInt(zone.wspd.metric) * 3) + (parseInt(zone.temp.metric) * 2) + (100 - sky));

            }




            var cond = zone.condition + new_score;

            var yday = parseInt(zone.FCTTIME.yday);
            var hour_padded = parseInt(zone.FCTTIME.hour);
            var civil = parseInt(zone.FCTTIME.civil);

            var userhtml = " ";

            ctx2d.fillStyle = "#77A3D7";
            ctx2d.fillRect(2, posy, 180, 44);
            //ctx2d.drawImage(imgi, 2, posy)
            //here
            ctx2d.font = '20px Arial';
            ctx2d.fillStyle = '#FFF';
            if (hour.length == 1) {
                ctx2d.fillText(hour, 16, posyt + 10);
            } else {
                ctx2d.fillText(hour, 6, posyt + 10);
            }

            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);


            ctx2d.fillStyle = "#FFBD35";
            ctx2d.fillRect(53, posy + 30, ws, 14);
            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = wind_txt;
            ctx2d.fillText(zone.wspd.metric, 40 + ws, posyt + 30);

            ctx2d.fillStyle = "#DD6C42";
            ctx2d.fillRect(53, posy + 16, temp, 14);
            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = temp_txt;
            ctx2d.fillText(zone.temp.metric, 40 + temp, posyt + 16);

            total_score = total_score + new_score;

            dt_ct = dt_ct + 1;

            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = "#FFFFFF";
            ctx2d.fillText(cond, 53, posyt);

            ctx2d.font = '13px Arial Bold ';

            if (first_hour >= 0) {
                //alert("f=" + first_hour);
                if (first_hour > 18) {
                    $('#calc').html("It's a bit late to hang out the washing now.");
                }
                first_hour = -2;
            }

            if (total_score > 270) {
                var res = dt_ct;
                if (done_dt == 0) {

                    $('#calc').html("Drying time: " + res + " hours");


                }
                done_dt = 1;


                total_score = 0;
            }

            posy = posy + 60;
            posyt = posyt + 60;

        });

    });




}
        
 function saveData(lat,lval,pid) {
  $.ajax({
                    type: "POST",
                    //url: "http://washingapp.apphb.com/Home/Save",
                    url: "http://localhost:3192/Home/Save",
                    data: "lat=22&lval=37",
                    dataType: "text/plain",
                    success: function(response) {
                    //alert("posted" + lat + ":" + lval);
                      var json = eval('(' + response + ')');
                      alert("out=" + json);
                    },
            error: function(data) {
            alert("save error");
                 }
                 });
 }

function checkLoc() {

//navigator.geolocation.getCurrentPosition(function (position) {
//  loc = position.coords.latitude + "," + position.coords.longitude;
//  alert(loc);
  return 1;
//  }, function () {
//  alert("no location");
//  return 0
//  });

}

function getDatalocalNew() {
    var lat = "";
    var longval = "";
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
});
    
       store.get('loc_data', function(theJsonData) {
       lat = theJsonData.lat;
       longval = theJsonData.longval;
        $('#loc_result').append("<br /> lat " + lat + "long " + longval);
        
    });

 var loc = lat + "," + longval;
 $.ajax({
     type: "GET",
     url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
     //dataType: "jsonp",
     //success: function(json) {


     //url: "json.txt",
     dataType: "jsonp",
     success: function(json) {
         //var json = eval('(' + jsontxt + ')');
         var jsontext = JSON.stringify(json);
         var location = json['location']['city'];

         $('#loc_result').append("<br /> Location from data local new " + location + " (" + loc + ")");

         var epoch = Math.round(new Date().getTime() / 1000)
         var timenow = new Date();
         var hour_now = timenow.getHours();
         var minute_now = timenow.getMinutes();
         var today = timenow.getDate();
         alert(timenow);
         var me = {
             key: 'app_data',
             json: jsontext,
             hoursaved: hour_now,
             minsaved: minute_now,
             datesaved: today,
             timesaved: timenow,
             epoch: epoch
         };

         // save it
         store.save(me);

         //lawnchair_s.save({ key: 'mydata', json: jsontext, hoursaved: hour_now, minsaved: minute_now, datesaved: today, epoch: epoch });

         getCacheNew("newdata");
     },
     error: function(xhr, error) {
         console.debug(xhr); console.debug(error);
     },
     complete: function() {

     }

 });
        
}


 function getDatalocal() {
 var lawnchair_s = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
});
 //var deviceID = device.uuid;
 var loc = "56.058168,-2.719811";
 var locck = checkLoc();
 // alert("get data " + locck);
 if (locck == 1) {

        $.ajax({
            //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            //dataType: "jsonp",
            //success: function(json) {
            
            type: "GET",
	    url: "json.txt",
	    dataType: "html",
	    success: function(jsontxt) {
           	var json = eval('(' + jsontxt + ')');
		var jsontext =  JSON.stringify(json);	
            	var location = json['location']['city'];
          
           $('#loc_result').append("<br /> Location from data local" + location + " (" + loc + ")");
           
                var epoch = Math.round(new Date().getTime() / 1000)
	        var timenow = new Date();
		var hour_now  = timenow.getHours();
                var minute_now = timenow.getMinutes();
		var today = timenow.getDate();
        
        lawnchair_s.save({key:'mydata', json:jsontext, hoursaved:hour_now, minsaved:minute_now, datesaved:today, epoch:epoch});
      
           getCache("newdata");    
       	        },
           error: function(xhr, error) {
	                      console.debug(xhr); console.debug(error);
	                  },
	                  complete: function() {
	   
               }
                          
        });
        
        } else {
        
        alert("not loc for data");
        }
      
        
        }
        