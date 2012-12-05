
var deviceInfo = function() {
    //document.getElementById("platform").innerHTML = device.platform;
    //document.getElementById("version").innerHTML = device.version;
    try {
        document.getElementById("uuid").innerHTML = device.uuid;
        document.getElementById("uuidi").innerHTML = device.uuid;
        document.getElementById("name").innerHTML = device.name;
    } catch (Error) {
        document.getElementById("uuid").innerHTML = "PC";
    }
    //document.getElementById("width").innerHTML = screen.width;
    //document.getElementById("height").innerHTML = screen.height;
    //document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        //alert(p.coords.latitude + " " + p.coords.longitude);
        return (p.coords.latitude + "," + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

function format_bounds(bds) {
  
var bds2 = bds.replace("((","");
var bds3 = bds2.replace("))","");
var bds4 = bds3.replace("), (",",");
var bds5 = bds4.replace(" ","");
var bds6 = bds5.replace(" ","");
return(bds6);
}

function SaveGPSLocation(lat,lng) {
   
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'loc_data',
        lat: lat,
        lng: lng
    };

    // save it
    store.save(me);
    return 1;
}

function SaveFirstLoginDetails(lat, lng, town) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'loc_data',
        lat: lat,
        lng: lng,
        town: town
    };

    // save it
    store.save(me);
   
}

function SaveLoginDetails(APIcalls,phonename,userID,site_ct,total,lat_nm,lat_tn) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'login_data',
        APIcalls: APIcalls,
        phonename: phonename,
        userID: userID,
        site_ct: site_ct,
        total: total,
        lat_nm: lat_nm,
        lat_tn: lat_tn
    };

    // save it
    store.save(me);

}

var getGPSLocation = function() {

var suc = function(p) {
    var GPS_saved = SaveGPSLocation(p.coords.latitude, p.coords.longitude);
        if (GPS_saved == 1) {
            $("#data_status").append("<br /> saved GPS:" + p.coords.latitude, p.coords.longitude);
            GPS_done(1);
        } else {
            GPS_done(0);
        }
    };
    var locFail = function() {
        alert("GPS fail");
        $("#data_status").append("<br /> GPS fail");
        GPS_done(0);
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var refreshGPSLocation = function() {

    var suc = function(p) {
        var GPS_saved = SaveGPSLocation(p.coords.latitude, p.coords.longitude);
        if (GPS_saved == 1) {
            $("#data_status").append("<br /> saved GPS:" + p.coords.latitude, p.coords.longitude);
            GPS_refresh(1);
        } else {
        GPS_refresh(0);
        }
    };
    var locFail = function() {
        alert("GPS fail");
        $("#data_status").append("<br /> GPS fail");
        GPS_refresh(0);
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function check_network() {
try {
    var networkState = navigator.network.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'NONE';

    //confirm('Connection type:\n ' + states[networkState]);
    
} catch (Error) {
//alert(Error);
     return "PC";
    }
return states[networkState];
}

var watchID = null;

function nuke() {
    var storea = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(storea) {
});


storea.nuke();

alert("nuked");

}

function getUserIDstore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.userID;
            });
        } else {
        }
    });
    return (item);
}

function getEpochstore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("app_data", function(available) {
        if (available) {
            store.get("app_data", function(theJsonData) {
                item = theJsonData.epoch;
            });
        } else {
        }
    });
  
    return (item);
}


function getSiteCtstore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.site_ct;
            });
        } else {
        }
    });
    return (item);
}

function getTotalstore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.total;
            });
        } else {
        }
    });
    return (item);
}

function getLat_tn() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.lat_tn;
            });
        } else {
        }
    });
    return (item);
}

function getLat_nm() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.lat_nm;
            });
        } else {
        }
    });
    return (item);
}

function getTownstore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("loc_data", function(available) {
        if (available) {
            store.get("loc_data", function(theJsonData) {
                item = theJsonData.town;
            });
        } else {
        }
    });
    return (item);
}

function getPhoneNamestore() {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });
    store.exists("login_data", function(available) {
        if (available) {
            store.get("login_data", function(theJsonData) {
                item = theJsonData.phonename;
            });
        } else {
        }
    });
   
    return (item);
}

function getFromStore(storetype,storeval) {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    
    return item;
    });

    store.exists(storetype, function(available) {

    if (available) {
            store.get(storetype, function(theJsonData) {
                item = theJsonData.storeval;              
            });
        } else {
            
        }
    });
}

function FTLcheck() {
  
    
 var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.exists('loc_data', function(available) {

        if (available) {
            $("#data_status").append('<br />have login data');
            //do epoch check here
            var epochdata = getEpochstore();
            var diff = Math.round(new Date().getTime() / 1000) - parseInt(epochdata);
            $("#data_status").append('<br /> diff= ' + diff);
            DataCheck(0, diff);
            
        } else {
            $("#data_status").append('<br />no login data');
            //first time login
            DataCheck(1,100);
        }

    });

}

function DataCheck(level,diff) {
    var network = check_network();
    //network = "NONE";
    var hours = Math.round(diff / 360);
    if (level == 1) {
        if (network == "NONE" || network == null) {
            alert("This app needs a data connection for the initial boot up.");
            alert("Can't find one, so closing, sorry.");
            close();
        } else {
            GetGPSData();
        }
    } else {
    if (network == "NONE" || network == null) {
        $("#weather").removeClass("ui-disabled");
        $("#weather").addClass("ui-enabled");
        $("#status").removeClass("ui-disabled");
        $("#status").addClass("ui-enabled");
        $("#twitter").trigger('collapse');
        $("#statustxt").html("<p>No data connection found. Weather data from " + hours + " hours ago is available.</p>").trigger('create');
        getCacheBW("olddata");
    } else {


        if (diff <= 5000) {
            //get site count, town, lat, lng from store
            $("#data_status").append('<br />less 500, simple refresh');
            load_data_refresh();
        } else {
            //get name, count, etc from store, then weather (checkstore) => start
            $("#data_status").append('<br />greater than 500, full refresh');
            load_data_db();
        }
    }
    }
   
}



function checkStore() {
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.exists('app_data', function(available) {

        if (available) {
            store.get('app_data', function(theJsonData) {
                var epochdata = theJsonData.epoch;
                $("#data_status").append('<br />stored:' + epochdata + 'now: ' + Math.round(new Date().getTime() / 1000));
                var diff = Math.round(new Date().getTime() / 1000) - epochdata;
                if (diff < 600) {
                    $("#data_status").append('<br />' + diff + ' revent data, get cache edit');
                    getWeather(0);

                } else {
                $("#data_status").append('<br />' + diff + ' expired data, get new');
                    getWeather(1);
                }
            });
        } else {
        $("#data_status").append('<br />no app data');
        getWeather(1);


        }
    });



}

function logWeather(userid,latval,longval) {

    $.ajax({
        type: "POST",
        url: "http://washingapp.apphb.com/Home/GetWeather",
        //url: "http://localhost:3192/Home/GetWeather",
        data: "userID=" + userid + "&latval=" + latval + "&longval=" + longval,
        dataType: "text/plain",
        success: function(response) {
            //alert("posted" + lat + ":" + lval);
            //var json = eval('(' + response + ')');
            //alert("out=" + json);
        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

            //alert("save error" + data);
        },
        complete: function(xhr, status) {
        $('#data_status').append("<br /> logged: " + userid);

        }
    });

}


function getWeather(timediff) {

    var lat = "";
    var longval = "";
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('loc_data', function(theJsonData) {
        lat = theJsonData.lat;
        longval = theJsonData.lng;
        $('#data_status').append("<br /> for weather: lat " + lat + "long " + longval);

    });

    var loc = lat + "," + longval;

    //var APIcalls = getFromStore("login_data", "APIcalls");
    var userid = getUserIDstore();
    //getFromStore("login_data", "userID");
    $('#data_status').append("<br /> API from store " + userid);

    if (timediff == 1) {

        logWeather(userid,lat,longval);

        $.ajax({
            type: "GET",
            url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            //url: "json.txt",
            //dataType: "html",
            dataType: "jsonp",
            success: function(json) {
                //var jsontxt = eval('(' + json + ')');

                var jsontext = JSON.stringify(json);
                var location = json['location']['city'];
                $('#data_status').append("<br /> Location from data local new " + location);

                var epoch = Math.round(new Date().getTime() / 1000)
                var timenow = new Date();
                var hour_now = timenow.getHours();
                var minute_now = timenow.getMinutes();
                var today = timenow.getDate();
               
                $('#data_status').append("<br /> save w: " + epoch);
                var me = {
                    key: 'app_data',
                    json: jsontext,
                    hoursaved: hour_now,
                    minsaved: minute_now,
                    datesaved: today,
                    timesaved: timenow,
                    epoch: epoch
                };

                store.save(me);

                //getCacheNew("newdata");
            },
            error: function(xhr, error) {
                console.debug(xhr); console.debug(error);
            },
            complete: function() {
                //load weather

                getCacheBW("newdata");
                $.mobile.loading('hide');
                start();


            }

        });

    } else {

    getCacheBW("olddata");
    $.mobile.loading('hide');
    start();
    }


}


function setPC(postcode) {
    //$("setloc").dialog("close");
    //var postcode = $("set_pc").val();
    var postcode = document.getElementById("postcode").value;
    var pc_uri = encodeURI(postcode);
    
    getLatLng(pc_uri);
}

function closeDetails() {

$('#my_details').dialog('close');
}

function saveName() {
    //$("setloc").dialog("close");
    //var postcode = $("set_pc").val();
    var username = document.getElementById("username1").value;
    var userid = getUserIDstore();
    //

    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Saving name ...</p>"
    });
    alert(username + userid);
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/SavePhonename",
        url: "http://washingapp.apphb.com/Home/SavePhonename",
        data: "userid=" + userid + "&phonename=" + username,
        dataType: "jsonp",
        success: function(json) {

        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            $("#phone_name").html(username);
            $('#name_msg').html("");
            $("#add_site_link").removeClass("ui-disabled");
            $("#add_site_link").addClass("ui-enabled");
            $("#my_sites_link").removeClass("ui-disabled");
            $("#my_sites_link").addClass("ui-enabled");
            closeDetails();
            load_data_db();
            $.mobile.loading('hide');

        }
    });

}

function saveSite1() {
    $("#set_map_overlay").fadeIn();
    var latval = document.getElementById("lat_coord").innerHTML;
    var longval = document.getElementById("long_coord").innerHTML;
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Saving new site ...</p>"
    });
    var town;
    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
        url: "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + latval + "&lng=" + longval + "&username=fletch1",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.geonames, function(i, geo) {
                town = geo.toponymName;

            });

        },
        error: function(xhr, error) {
            //$("#loc_here").html("No town listed for: " + lat + "," + lng);
            town = "Unknown";

        },
        complete: function(xhr, status) {
            saveSite2(town);
            //alert(town);
            //$("#map_msg").html("Done.");
        }

    });

}


function saveSite2(town) {
    var sitename = document.getElementById("sitenameid").value;
    var comment = document.getElementById("commentid").value;
    var latval = document.getElementById("lat_coord").innerHTML;
    var longval = document.getElementById("long_coord").innerHTML;
    var userid = getUserIDstore();
    var username = getPhoneNamestore();

    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/SavePlace",
        url: "http://washingapp.apphb.com/Home/SavePlace",
        data: "userid=" + userid + "&placename=" + sitename + "&comment=" + comment + "&latval=" + latval + "&longval=" + longval + "&username=" + username + "&town=" + town,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);
            alert("Save Failed");

        },
        complete: function(xhr, status) {
            document.getElementById("sitenameid").value = "";
            document.getElementById("commentid").value = "";
            document.getElementById("lat_coord").innerHTML = "";
            document.getElementById("long_coord").innerHTML = "";
            var new_ct = parseInt(getSiteCtstore()) + 1;
            $("#my_sites_ct").html(new_ct.toString());
            $.mobile.loading('show', {
                text: 'foo',
                textVisible: true,
                theme: 'a',
                html: "<p>Saved. Press Menu to return.</p>"
            });
            //$.mobile.changePage('index.html');

        }
    });
    //$.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}

function refreshPage(msg) {
    $.mobile.changePage(
    'index.html',
    {
        allowSamePageTransition: true,
        transition: 'none',
        showLoadMsg: false,
        reloadPage: true,
        html: "<p>" + msg + "</p>"

    }
  );

}

function saveMovedSite() {
    $("#set_map_overlaym").fadeIn();
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Saving new position</p>"
    });
    var PID = document.getElementById("MPID").innerHTML;
    var latval = document.getElementById("lat_coordm").innerHTML;
    var longval = document.getElementById("long_coordm").innerHTML;
   
    var userid = getUserIDstore();
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/MovePlace",
        url: "http://washingapp.apphb.com/Home/MovePlace",
        data: "latval=" + latval + "&longval=" + longval + "&PID=" + PID,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);

        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);
            $("#saveSitem").html("Move Failed");

        },
        complete: function(xhr, status) {
            //$("#saveSitem").html("New location saved");
        $.mobile.loading('show', {
            text: 'foo',
            textVisible: true,
            theme: 'a',
            html: "<p>Saved. Press Menu to return.</p>"
        });
            //$.mobile.changePage('index.html#one', { allowSamePageTransition: true, transition: "none" });

        }
    });
    //$.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}


function GetGPSData() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Getting location</p>"
    });
    getGPSLocation();
        }


function GPS_done(retval) {
    if (retval == 1) {
        var position = getPosition();
        var latlng = position.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        getPlace(lat, lng, 0);
    } else {
        $.mobile.loading('hide');
        $("#loc_here").html("Click here to set manually");
    }

}

function GPS_refresh(retval) {
    if (retval == 1) {
        var position = getPosition();
        var latlng = position.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        getPlace(lat, lng, 1);
    } else {
        $.mobile.loading('hide');
        $("#loc_here").html("Click here to set manually");
    }

}

function popTwitter() {
    $('#twitter').html();
    var ultop = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview\">";
    var ulbtm = "</ul>";
    var url = "http://api.twitter.com/1/statuses/user_timeline/uksledge.json?screen_name=uksledge&count=6&callback=?";
    //var url = 'http://search.twitter.com/search.json?q=';
    var query = 'uksledge';
    var options = '&result_type=recent&rpp=4&page=1&callback=?';
    var colltop = "<div id=\"tweetw\"  data-role=\"collapsible\" data-theme=\"a\" data-inset=\"true\" data-content-theme=\"a\"><h4>Tweets</h4>";
    var htmlt = "";

    $.getJSON(url, function(json) {
        $.each(json, function(i, zone) {

        //<img style=\"padding:10px\" src=" + zone.profile_image_url_https + " />
        var para = "<li class=\"ui-li ui-li-static ui-body-c\"><p class=\"ui-li-heading\" style=\"color:#66A68B\">" + zone.created_at + "</p><p style=\"white-space: normal\" class=\"ui-li-desc\">" + zone.text + "</p></li>";
            htmlt += ultop + para + ulbtm;

        });
        $('#twitter').html(colltop + htmlt + "</div>").trigger('create');

    });
}
function popTwitter_o() {
    //alert("t");
    var ultop =  "<ul data-role=\"listview\" class=\"ui-listview\">";
var ulbtm = "</ul>";
var para = "";
$.ajax({
    type: "GET",
    url: "http://api.twitter.com/1/statuses/user_timeline/uksledge.json?screen_name=uksledge&count=20",
    dataType: "jsonp",
    success: function(json) {
        //txt = json['text'];
       // var json_parsed = eval('(' + json + ')');
        //var jsontext = JSON.stringify(json);
        //alert(json_parsed);
        $.each(json.results, function(i, zone) {
            //  var res = "<p>" + zone.text + "</p>";
            var time = zone.created_at;
            //  var lang = "<p><img src=" + zone.profile_image_url_https + "</></p>";
            alert(time);
            //var para = "<li class=\"ui-li ui-li-static ui-body-c\"><h3 class=\"ui-li-heading\">" + zone.from_user + "</h3><p class=\"ui-li-desc\">" + zone.text + "</p><p class=\"ui-li-desc\">" + zone.created_at + "</p></li>";
        });
    },
    error: function(xhr, error) {
        console.debug(xhr); console.debug(error);

        //alert("save error");
    },
    complete: function(xhr, status) {
        // $("#twitter").html(ultop + para + ulbtm).trigger('create');

    }

});
    //
}


var start = function() {

    popTwitter();
    $.mobile.loading('hide');
    $("#showmaplink").removeClass("ui-disabled");
    $("#showmaplink").addClass("ui-enabled");

    $("#my_details_link").removeClass("ui-disabled");
    $("#my_details_link").addClass("ui-enabled");
    var phonename = document.getElementById("username1").value;
    if (phonename.length > 0) {
        $("#add_site_link").removeClass("ui-disabled");
        $("#add_site_link").addClass("ui-enabled");

        $("#my_sites_link").removeClass("ui-disabled");
        $("#my_sites_link").addClass("ui-enabled");
    }
    $("#search_link").removeClass("ui-disabled");
    $("#search_link").addClass("ui-enabled");

    $("#weather").removeClass("ui-disabled");
    $("#weather").addClass("ui-enabled");

    $("#status").removeClass("ui-disabled");
    $("#status").addClass("ui-enabled");

    $("#mydeets").removeClass("ui-disabled");
    $("#mydeets").addClass("ui-enabled");

    $("#twitter").removeClass("ui-disabled");
    $("#twitter").addClass("ui-enabled");
    $("#twitter").trigger('expand');

    //startmap();
    //document.getElementById("uuidi").innerHTML = device.uuid;
    var network = check_network();
    //alert(network);
    $('#connection').html(network);
    if (network == "NONE" || network == null) {
        //checkCache(0, network);
    } else {
        //checkCache(1, network);
    }
};


function init() {

    //document.addEventListener("deviceready", FTLcheck, false);
   // showmap();
  
}

function save_id() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Checking connection id</p>"
    });
    try {
        var phoneid = device.uuid;
       // $("#uuid").html(phoneid);
} catch (Error) {
    var phoneid = "laptop2";
    }
    $.ajax({
        type: "POST",
        url: "http://washingapp.apphb.com/Home/Save",
        //url: "http://localhost:3192/Home/Save",
        data: "lat=22&lval=37&city=nb&country=uk&comment=" + phoneid,
        dataType: "text/plain",
        success: function(response) {
            //alert("posted" + lat + ":" + lval);
            //var json = eval('(' + response + ')');
            //alert("out=" + json);
        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

            //alert("save error" + data);
        },
        complete: function(xhr, status) {
        $("#phone_name").html("Dave");
        GetGPSData();
        $("#data_status").html("Almost done...");
            
        }
    });

}

function load_data_refresh() {
    var browser_w = parseInt($(document).width()) - 10;
    $('#data_status').append("widths: " + browser_w);
    $('#map_overlay').css('width', browser_w.toString() + 'px');
    $('#set_map_overlaym').css('width', browser_w.toString() + 'px');
    $('#set_map_overlay').css('width', browser_w.toString() + 'px');
    $('#logosid').css('width', browser_w.toString() + 'px');
    $('#twitter_div').css('width', browser_w.toString() + 'px');
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Refreshing data</p>"
    });

    var site_ct = getSiteCtstore();
    var phonename = getPhoneNamestore();
    if (phonename.length == 0) {
        $('#name_msg').html("Please add a name in My Details before adding sites.");
    } 
    var town = getTownstore();
    var total = getTotalstore();
    var lat_tn = getLat_tn();
    var lat_nm = getLat_nm();
    $('#phone_name').html(phonename);
    document.getElementById("username1").value = phonename;
    $('#my_sites_ct').html(site_ct);
    $('#data_status').append("API: unknown");
    $('#loc_here').html(town);
    $("#gps_results").html(town);
    $("#lat_nm").html(lat_nm);
    $("#lat_tn").html(lat_tn);
    $("#total_sites").html(total);
    //id, town, from store
    getWeather(0);
   

}

//get name + userID, API calls #
function load_data_db() {
    var browser_w = parseInt($(document).width()) - 10;
    $('#data_status').append("widths: " + browser_w);
    $('#map_overlay').css('width', browser_w.toString() + 'px');
    $('#set_map_overlaym').css('width', browser_w.toString() + 'px');
    $('#set_map_overlay').css('width', browser_w.toString() + 'px');
    $('#twitter_div').css('width', browser_w.toString() + 'px');
    $('#logosid').css('width', browser_w.toString() + 'px');
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Loading data e</p>"
    });
    try {
        var phoneid = device.uuid;
       // $("#uuid").html(phoneid);
    } catch (Error) {
    var phoneid = "laptop3";
   // $("#uuid").html(phoneid);
    }
    var userID;
    var phonename;
    var APIcalls;
    var site_ct;
    var new_user = "false";
    var lat_nm;
    var lat_tn;
    var total;
    $.ajax({
        type: "POST",
        url: "http://washingapp.apphb.com/Home/SaveID",
        //url: "http://localhost:3192/Home/SaveID",
        data: "phoneID=" + phoneid,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
            userID = json['userID'];
            phonename = json['Name'];
            APIcalls = json['APIcalls'];
            site_ct = json['site_ct'];
            lat_nm = json['lat_nm'];
            lat_tn = json['lat_tn'];
            total = json['total'];
            new_user = "true";

        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            SaveLoginDetails(APIcalls, phonename, userID, site_ct, total, lat_nm, lat_tn);
            $('#phone_name').html(phonename);
            document.getElementById("username1").value = phonename;
            if (phonename.length == 0) {
                $('#name_msg').html("Please add a name in My Details before adding sites.");
            } 
            $('#my_sites_ct').html(site_ct);
            $('#data_status').append("API: " + userID);
            var town = getTownstore();
            $('#loc_here').html(town);
            $("#gps_results").html(town);
            $('#lat_nm').html(lat_nm);
            $('#lat_tn').html(lat_tn);
            $('#total_sites').html(total);

            getWeather(1);


        }
    });

}

var timer_m;

function setMarkers(map, bounds_map, PID) {
    clearTimeout(timer_m);
    //var bds_fmt = "50,-4,60,4";
    var bds_fmt = format_bounds(bounds_map.toString());
    var marktxt = "";
    removeMarkers();
    var markers_array = [];
    var ct = 0;
    if (parseInt(PID) > 0) {
//        var infoWindowLive = new google.maps.InfoWindow({ content: 'This one: ' + PID });
    }
    var timage = 'marker_search.png';
    var position = getPosition();
    var latlng = position.split(',');
    var tlat = latlng[0];
    var tlng = latlng[1];
    var hereLatLng = new google.maps.LatLng(latlng);

    $.ajax({
        type: "GET",
        url: "http://washingapp.apphb.com/Home/GetSitesInRange",
        //url: "http://localhost:3192/Home/GetSitesInRange",
        data: "bounds=" + bds_fmt,
        dataType: "jsonp",
        success: function(json) {
            var json_loc = { "points": [{ "lat": tlat, "longval": tlng, "name": "You are here!", "PID": "1"}] };
            ct = json.ct; //56.208,-3.15
            $.merge(json.points, json_loc.points);
            var jsontext = JSON.stringify(json);
           
            $.each(json.points, function(i, markers) {
                console.log(json);
                if (markers.PID == parseInt(PID)) {
                    var image = 'marker_search.png';
                    ListComments(markers.PID);
                    $('#place_name').html(markers.name);
                } else if (markers.PID == 1) {
                    var image = 'marker_search.png';
                } else {
                    var image = 'marker_s4.png';
                }
                //var infoWindow = new google.maps.InfoWindow({ content: 'Place ID' + markers.PID });
                var siteLatLng = new google.maps.LatLng(markers.lat, markers.longval);
                var markerp = new google.maps.Marker({ 'position': siteLatLng, 'icon': image });
                markers_array.push(markerp);
                marktxt = marktxt + "<p>" + markers.name + i + "</p>";
                
                //attach infowindow on click
                google.maps.event.addListener(markerp, "click", function() {
                    //$('#map_markers').fadeOut().html("<p>Click: " + markers.name + markers.PID + "</p>").fadeIn();
                    if (markers.PID != 1) {
                        ListComments(markers.PID);
                        $('#place_name').html(markers.name);
                    } else {
                    $('#place_name').html(markers.name);
                    }
                    //infoWindow.open(map, markerp);
                });

            });
            // var image = 'marker_search.png';
            //  var position = getPosition();
            // var latlng = position.split(',');
            // var hereLatLng = new google.maps.LatLng(latlng);

            // var markerp = new google.maps.Marker({ 'position': hereLatLng, 'icon': image });
            // markers_array.push(markerp);

            //attach infowindow on click
            // google.maps.event.addListener(markerp, "click", function() {
            //$('#map_markers').fadeOut().html("<p>Click: " + markers.name + markers.PID + "</p>").fadeIn();

            //   $('#place_name').html("you are here");
            //infoWindow.open(map, markerp);
            // });


            var mcOptions = { gridSize: 100, maxZoom: 18 };
            //$("#popupPadded").popup("close");
            $("#map_overlay").fadeOut();
            var markerCluster = new MarkerClusterer(map, markers_array, mcOptions);
            // var position = getPosition();
            //var latlng = position.split(',');
            //var marker_here = new google.maps.Marker({ 'position': latlng, 'icon': 'marker_s4.png' });

            //markers_array2.push(marker_here);
            //var markerCluster2 = new MarkerClusterer(map, markers_array2, mcOptions);
        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {

            var bannermsg = "";
            if (ct == 0) {
                $("#map_msg").html(ct + " No sledging sites listed in this view.");

            } else {
                $("#map_msg").html(ct + " Loaded. Click to see comments ...");

            }

        }
    });

}

function setMarker_site(map, bounds_map, lat, lng) {
    var image = 'marker_n.png';
    $('#lat_coord').html(lat.toString().slice(0, 9));
    $('#long_coord').html(lng.toString().slice(0, 9));
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    var siteLatLng = new google.maps.LatLng(lat, lng);
    var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, 'icon': image, map: map });
    google.maps.event.addListener(markerp, "drag", function() {
    $('#lat_coord').html(markerp.position.lat().toString().slice(0, 9));
    $('#long_coord').html(markerp.position.lng().toString().slice(0, 9));
    });
    $("#set_map_overlay").fadeOut();
}

function setMarker_move(map, bounds_map, lat, lng) {
    var latstr = lat.toString().slice(0,9);
    var lngstr = lng.toString().slice(0,9);
    var image = 'marker_n.png'
    $('#lat_coordm').html(latstr);
    $('#long_coordm').html(lngstr);
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    var siteLatLng = new google.maps.LatLng(lat, lng);
    var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, 'icon': image, map: map });
    google.maps.event.addListener(markerp, "drag", function() {
        $('#lat_coordm').html(markerp.position.lat().toString().slice(0,9));
        $('#long_coordm').html(markerp.position.lng().toString().slice(0,9));
    });
    $("#set_map_overlaym").fadeOut();
}

function DeleteSite(pid) {
    
if (confirm("Delete. Are you sure?")) { 
// do this

    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/DeletePlace",
        url: "http://washingapp.apphb.com/Home/DeletePlace",
        data: "PID=" + pid,
        dataType: "jsonp",
        success: function(json) {
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            $("#place" + pid).slideUp();
            $("#sites_msg").html("Site deleted");
            var new_ct = parseInt(getSiteCtstore()) - 1;
            if (new_ct < 0) {
                $("#my_sites_ct").html("0");
            } else {
                $("#my_sites_ct").html(new_ct.toString());
            }
        }
    });
}
}

function ListSites() {
    
    var sites_html = "";
    var ct = 0;
    var userID = getUserIDstore();
    $.ajax({
        type: "GET",
        //url: "http://localhost:3192/Home/ListMySites",
        url: "http://washingapp.apphb.com/Home/ListMySites",
        data: "UserID=" + userID,
        dataType: "jsonp",
        success: function(json) {
            $.each(json.sites, function(i, result) {
                sites_html = sites_html + "<div id=\"place" + result.PID + "\"><div class=\"ui-grid-b\">" +
 "<div class=\"ui-block-a\"><div class=\"ui-bar ui-bar-c\"><p></p>" + result.name + "</div></div>" +
 "<div class=\"ui-block-b\"><div class=\"ui-bar ui-bar-c\"><a href=\"index.html#move_site\" data-role=\"button\" data-icon=\"gear\" data-iconpos=\"left\" data-mini=\"true\" data-theme=\"b\" data-inline=\"true\" onclick=\"move_site_map(" + result.latitude + "," + result.longitude + "," + result.PID + ")\">Move</a></div></div>" +
"<div class=\"ui-block-c\"><div class=\"ui-bar ui-bar-c\"><a href=\"#\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"left\" data-mini=\"true\" data-theme=\"b\" data-inline=\"true\" onclick=\"DeleteSite(" + result.PID + ")\">Delete</a></div></div></div>" +
                "<div class=\"ui-bar ui-bar-b\" style=\"height:2px\"></div></div>";
               
            });
             ct = json.ct;
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {

        $("#sites_list").html(sites_html).trigger('create');
            $("#sites_msg").html("Sites loaded. (" + ct + ")");

        }
    });

}

function doSearch() {
    $("#sites_search_msg").show();
    $("#sites_search_msg").html("Searching ...");
    var search_str = document.getElementById("searchid").value;
    var sites_html = "<ul data-role=\"listview\" data-theme=\"a\" data-inset=\"true\">";
    var ct = 0;
    $.ajax({
        type: "GET",
        //url: "http://localhost:3192/Home/ListPlaces",
        url: "http://washingapp.apphb.com/Home/ListPlaces",
        data: "search_str=" + search_str,
        dataType: "jsonp",
        success: function(json) {
            $.each(json.sites, function(i, result) {
            sites_html = sites_html + "<li><a href=\"index.html#two\" onClick=\"search_result_map(" +result.latitude + "," + result.longitude + "," + result.PID + ")\">" + result.town + ", " + result.name + ". Added by " + result.username + "</a></li>";
                ct = json.ct;
            });
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {

            $("#sites_search_list").html(sites_html).trigger('create');
            $("#sites_search_msg").html("Sites found: (" + ct + ")");

        }
    });

}

function ListComments(PID) {
if (PID == 0) {
    PID = document.getElementById("hidPID").innerHTML;
    console.log(PID + "hid");
}
console.log(PID);
var ultop = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview\">";
var ulbtm = "</ul>";


var comments_html2 = "";
var comments_html = "";
var ct = 0;
$.ajax({
    type: "GET",
    //url: "http://localhost:3192/Home/ListComments",
    url: "http://washingapp.apphb.com/Home/ListComments",
    data: "PID=" + PID,
    dataType: "jsonp",
    success: function(json) {
        $.each(json.cmts, function(i, result) {
            var para = "<li class=\"ui-li ui-li-static ui-body-c\"><p class=\"ui-li-heading\" style=\"color:#66A68B\">" + result.datetime + "</p><p style=\"white-space: normal\" class=\"ui-li-desc\">" + result.comment + "</p></li>";
            comments_html = comments_html + "<div class=\"ui-bar ui-bar-c\"><h4>" + result.datetime + "</h4></div>" +
              "<div class=\"ui-bar ui-bar-c\"><h4>" + result.username + "</h4></div>" +
 "<div class=\"ui-bar ui-bar-c\"><h4>" + result.comment + "</h4></div>" +
 "<div class=\"ui-bar ui-bar-b\" style=\"height:1px\"></div>";
            comments_html2 = comments_html2 + ultop + para + ulbtm;
        });
        ct = json.ct;
    },
    error: function(xhr, error) {
        // console.debug(xhr); console.debug(error);

    },
    complete: function(xhr, status) {
        if (ct == 0) {
            $("#place_comments").html("No comments");
        } else {
            $("#place_comments").html(comments_html2).trigger('create');
            //$("#place_comments").html(comments_html + "<div style=\"display:none\" id=\"hidPID\">" + PID + "</div>").trigger('create');
            $("#addcomm").show();
        }
        $("#map_msg").html(ct + " comments loaded.");

    }
});

}


function SaveComment() {

    var PID = document.getElementById("hidPID").innerHTML;
    var comment = document.getElementById("addcommentid").value;
    console.log(PID + "hid");
    var userID = getUserIDstore();
    var comments_html = "";
    var ct = 0;
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/SaveComment",
        url: "http://washingapp.apphb.com/Home/SaveComment",
        data: "PID=" + PID + "&comment=" + comment + "&userID=" + userID,
        dataType: "jsonp",
        success: function(json) {
            $.each(json.cmts, function(i, result) {
                comments_html = comments_html + "<div class=\"ui-grid-a\" style=\"font-weight:12px\">" +
 "<div class=\"ui-block-a\"><div class=\"ui-bar ui-bar-c\">" + result.datetime + "</div></div>" +
 "<div class=\"ui-block-b\"><div class=\"ui-bar ui-bar-c\">" + result.username + "</div></div></div>" +
 "<div class=\"ui-bar ui-bar-c\">" + result.comment + "</div>" +
 "<div class=\"ui-bar ui-bar-b\" style=\"height:1px\"></div>";
            });
            ct = json.ct;
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            document.getElementById("addcommentid").value = "";
            if (ct == 0) {
                $("#place_comments").html("No comments");
            } else {
                $("#place_comments").html(comments_html);
                $("#comments_ct").html("Comments (" + ct + ")" + "<div style=\"display:none\" id=\"hidPID\">" + PID + "</div>");
                $("#addcomm").show();
            }
            $("#map_msg").html("Comment saved.");

        }
    });


}

function getPosition() {
    var lat = "";
    var longval = "";
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('loc_data', function(theJsonData) {
        lat = theJsonData.lat;
        longval = theJsonData.lng;
        //$("#map_msg").append("from store: lat " + lat + "long " + longval);

    });

    var loc = lat + "," + longval;
   
    return loc;

}

var markers = [];

function removeMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers.length=0;

      }


function GoogleMap(lat,lng) {
    $("#map_overlay").fadeIn();
    //alert(lat + lng);
    this.initialize = function() {

        var map = showMap();
        $('#place_name').html("&nbsp");
        $('#place_name').html("&nbsp");
        $('#place_comments').html("&nbsp");
        $('#comments_ct').html("&nbsp");
        $("#addcomm").hide();
    }
    var showMap = function() {
    ;
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
        var bounds;

        google.maps.event.addListener(map, 'bounds_changed', (function() {
            bounds = map.getBounds();
            $("#map_msg").html("Map moved ...");
            var timer;
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {

                    bounds = map.getBounds();
                    $("#map_msg").html("Downloading sites ...");
                    setMarkers(map, bounds, "0");
                }, 2000);
            }
        } ()));


        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });
        $("#map_msg").html("Loading markers ... ");

        return map;
    }

}

function GoogleMap_set(lat, lng) {
    $("#set_map_overlay").fadeIn();
    var siteLatLng = lat + "," + lng;
    this.initialize = function() {

        var map = showMap();
    }
    var showMap = function() {
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("set_map_canvas"), mapOptions)
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', function() {
            bounds = map.getBounds();
        });
        setMarker_site(map, bounds, lat, lng);
       
        var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
        $("#set_map_overlay").fadeOut();
        
        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

        return map;
    }

}

function GoogleMap_move(lat, lng, PID) {
    $("#set_map_overlaym").fadeIn();
    var siteLatLng = lat + "," + lng;
    this.initialize = function() {

        var map = showMap();
    }
    var showMap = function() {
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("set_map_canvasm"), mapOptions)
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', function() {
            bounds = map.getBounds();
        });
        setMarker_move(map, bounds, lat, lng);

        var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
        $("#set_map_overlaym").fadeOut();

        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

        return map;
    }

}

function GoogleMap_result(lat, lng, PID) {
    var siteLatLng = lat + "," + lng;
    this.initialize = function() {
        var map = showMap();
        $('#place_name').html("&nbsp");
        $('#place_name').html("&nbsp");
        $('#place_comments').html("&nbsp");
        $('#comments_ct').html("&nbsp");
        $("#addcomm").hide();
    }
    var showMap = function() {
        ;
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
        var bounds;

        google.maps.event.addListener(map, 'bounds_changed', (function() {
            bounds = map.getBounds();
            $("#map_msg").html("Map moved ...");
            var timer;
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {

                    bounds = map.getBounds();
                    $("#map_msg").html("Downloading sites ...");
                    setMarkers(map, bounds, PID);
                }, 2000);
            }
        } ()));


        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });
        $("#map_msg").html("Loading markers ... ");

        return map;
    }


}


function getPlace(lat,lng,fresh) {
    var town;
    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
        url: "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + lat + "&lng=" + lng + "&username=fletch1",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.geonames, function(i, geo) {
                town = geo.toponymName;

            });
            $("#loc_here").html(town);
            $("#gps_results").html(town);
            //SaveNewLocation(lat, lng, town);

        },
        error: function(xhr, error) {
            $("#loc_here").html("No town listed for: " + lat + "," + lng);
            $("#gps_results").html("No town listed for: " + lat + "," + lng);
        },
        complete: function(xhr, status) {
            SaveFirstLoginDetails(lat, lng, town);
            if (fresh == 1) {
                getWeather(1);
            } else {
                load_data_db();
            }
            //FTL path: check APIcalls, save ID, get weather

            //CheckForUser(lat, lng, town);
            //checkStore(30);

            //$("#map_msg").html("Done.");
        }

    });
}

function getLatLng(postcode) {
    var lat;
    var lng;
    var town;
    $.ajax({
        type: "GET",
        url: "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=" + postcode + "&country=GB&username=fletch1",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.postalCodes, function(i, geo) {
                town = geo.placeName;
                lat = geo.lat;
                lng = geo.lng;
            });
            //$("#pc_results").html("<h4>" + town + "</h4><h4>Lat: " + lat + "</h4><h4>Long: " + lng + "</h4>");
            SaveNewLocation(lat, lng, town);
            $("#loc_here").html(town);
            $("#gps_results").html(town);
            $("#showmaplink").removeClass("ui-disabled");
            $("#showmaplink").addClass("ui-enabled");

        },
        error: function(xhr, error) {
            $("#loc_here").html("No town listed for: " + lat + "," + lng);
            $("#gps_results").html("No town listed for: " + lat + "," + lng);


        },
        complete: function(xhr, status) {
            //$("#map_msg").html("Done.");
            getWeather(1);
        }

    });
}

function SaveNewLocation(lat, lng, town) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'loc_data',
        lat: lat,
        lng: lng,
        town: town
    };

    // save it
    store.save(me);
}
//pc_results = <h3>lat lng here</h3><h3>34343 343444433</h3>

var timera;
var timerb;
var timerc;
var timerd;
function startmap() {
    clearTimeout(timera);
    var position = getPosition();

    var latlng = position.split(',');
    var lat = latlng[0];
    var lng = latlng[1];
    var map = new GoogleMap(lat,lng);
    map.initialize();
    //google.maps.event.trigger(map, 'resize');

}

function startmap_set() {
    clearTimeout(timerb);
    var position = getPosition();
    var latlng = position.split(',');
    var lat = latlng[0];
    var lng = latlng[1];
    var map = new GoogleMap_set(lat, lng);
    map.initialize();
}

function startmap_move(lat, lng, PID) {
    clearTimeout(timerc);
    $("#MPID").html(PID);
    $("#movePlaceName").html("name here");
    console.log(name);
    var map = new GoogleMap_move(lat, lng, PID);
    map.initialize();
}

function startmap_result(lat, lng, PID) {
    clearTimeout(timerd);
    $("#MPID").html(PID);
    $("#movePlaceName").html("name here");
    console.log(name);
    var map = new GoogleMap_result(lat, lng, PID);
    map.initialize();
}

function showmap() {
    timera = setInterval(function() { startmap() }, 1000);
}

function add_site_map() {
    timerb = setInterval(function() { startmap_set() }, 1000);
}

function move_site_map(lat, lng, PID) {
    timerc = setInterval(function() { startmap_move(lat, lng, PID) }, 1000);
}

function search_result_map(lat, lng, PID) {
    timerd = setInterval(function() { startmap_result(lat, lng, PID) }, 1000);
}


function checkCache(data,network) {
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
});

if (data == 1) {

    store.exists('app_data', function(available) {

        if (available) {
            //check data age, get epoch, have location
            checkDataAge();

        } else {
            //no stored data, first time login
            $("#loc_result").append('<br />no stored data, first time login:');
            var loc = checkLocation(network);
            if (loc == 1) {
                getDatalocalNew();
            } else {
            $("#loc_result").append('<br />cant get location');
            }

        }
    });
} else {
//no data, check cache
store.exists('app_data', function(available) {

    if (available) {
        //check data age, get epoch, have location
        getCacheNew("olddata");

    } else {
        //no data, first time login
    var loc = checkLocation(network);
    if (loc == 1) {
        $("#loc_result").append('<br />no data, can get location');
    } else {
        $("#loc_result").append('<br />no data, cant get location');
    }

    }
});


//quit

}
}

function checkDataAge() {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
});

store.get('app_data', function(theJsonData) {
    var epochdata = theJsonData.epoch;
    $("#loc_result").append('<br />stored:' + epochdata + 'now: ' + Math.round(new Date().getTime() / 1000));
    var diff = Math.round(new Date().getTime() / 1000) - epochdata;
    if (diff > 600) {
        $("#loc_result").append('<br />' + diff + ' exp data, get new');
        var network = check_network();
        //alert(network);
        $('#connection').html(network);
        if (network == "NONE" || network == null) {
            $("#loc_result").append('<br />' + diff + ' old data, get cache anyway');
            getCacheNew("olddata");
        } else {
            getDatalocalNew();
            
        }    
        
    } else {
    $("#loc_result").append('<br />' + diff + ' recent data, get cache');
    getCacheNew("olddata");
    }
});



    return 1;

}


function checkLocation(network) {
    if (network == "PC") {
        var store = new Lawnchair({
            adapter: "dom",
            name: "data_store"
        }, function(store) {
        });

        var me = {
            key: 'loc_data',
            lat: "56.058168",
            lng: "-2.719811"
        };

        // save it
        store.save(me);

        return 1;
    } else {
      
      var suc = function(p) {
            //alert(p.coords.latitude + " " + p.coords.longitude);
            var store = new Lawnchair({
                adapter: "dom",
                name: "data_store"
            }, function(store) {
            });

            var me = {
                key: 'loc_data',
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };

            // save it
            store.save(me);
            return 1;
        };
        var locFail = function() {

            return 0;
        };
        navigator.geolocation.getCurrentPosition(suc, locFail);


    }
  
}

function checkDataMain() {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.exists('loc', function(available) {

        if (available) {
            store.get('loc', function(me) {
            $("#loc_result").append('<br />Found loc:' + me.value);
                //checkData();
            });
        } else {
        $("#loc_result").append('<br />no location');

          
        }
    });



}