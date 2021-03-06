/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var gaPlugin;

var app = {

	// Application Constructor
	initialize : function() {
		$("#app-status-ul").append('<li>init</li>');

		//onBodyLoad();
		//$('#createPage').hide();
		//$('#homePage').hide();
		//$('#loadingPage').hide();

		this.bindEvents();
		//debugger;
		// var ro = localStorage.route;
		// alert("ro: " + ro);
		// if (ro != "null") {
		// alert("in ro");
		// route(ro);
		// }

	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() { 
		debugger;
		//alert("onReady");


		//$("#app-status-ul").append('<li>registering</li>');
		//$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
		//var pushNotification = window.plugins.pushNotification;
		//pushNotification.register(pushSuccessHandler, pushErrorHandler, {
		//	"senderID" : "47813446527",
		//	"ecb" : "onNotificationGCM"
		//});

		gaPlugin = window.plugins.gaPlugin;
		gaPlugin.init(successHandler, errorHandler, "UA-47554552-3", 10);

debugger;
		var pushNotification = window.plugins.pushNotification;
		//alert("phoneChkAnd: "+phoneCheck.android);
		//alert("phoneChkIos: "+phoneCheck.ios);

		if (phoneCheck.android != null) {
			//alert("this is android");
			pushNotification.register(
				successHandler,
				errorHandler,
				{
					"senderID": "47813446527",
					"ecb": "onNotificationGCM"
				});
		} else if (phoneCheck.ios != null) {
			//alert("this is iphone");
			pushNotification.register(
				tokenHandler,
				errorHandler,
				{
					"badge": "true",
					"sound": "true",
					"alert": "true",
					"ecb": "onNotificationAPN"
				});
		}
		else {
			alert("error registering device");
		}
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

// result contains any message sent from the plugin call
function pushSuccessHandler(result) {
	//alert('Callback Success! Result = ' + result)
}

function pushErrorHandler(error) {
	alert(error);
}

// for iOS tokens
function tokenHandler (result) {
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
	//alert('device token = ' + result);

	localStorage.regid = result;
	$.get("http://blrbr.co/Account/RegisterDevice/" + result).success(function(data) {
		$("#app-status-ul").append('<li>register: ' + data + '</li>');
		//alert("iphone registered")
	}).fail(function(data) {
		//alert("ERROR: Device not registered");
	});
	//$.get("http://blrbr.co/home/push?title=iosapp&id="+result).success(function(data) {
	//	$("#app-status-ul").append('<li>' + data + '</li>');
	//	alert("iphone pushed")
	//	//alert("data: "+data);
	//}).fail(function(data) {
	//	alert("ERROR: Device not pushed");
	//});
}

// iOS
function onNotificationAPN (event) {
	alert( event.alert);
	if ( event.alert )
	{
		navigator.notification.alert(event.alert);
	}

	if ( event.sound )
	{
		var snd = new Media(event.sound);
		snd.play();
	}

	if ( event.badge )
	{
		pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
	}
}



// Android and Amazon Fire OS
function onNotificationGCM(e) {
	//$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

	switch( e.event ) {
		case 'registered':
			if (e.regid.length > 0) {
				$("#app-status-ul").append('<li>API Registered</li>');
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
				localStorage.regid = e.regid;
				$.get("http://blrbr.co/Account/RegisterDevice/" + e.regid).success(function(data) {
					$("#app-status-ul").append('<li>' + data + '</li>');
					//alert("android registered")
				}).fail(function(data) {
					//alert("ERROR: Device not registered");
				});

			}
			break;

		case 'message':
			//$("#app-status-ul").append('<li>--NOTIFICATION--' + '</li>');
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (e.foreground) {
				$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

				// on Android soundname is outside the payload.
				// On Amazon FireOS all custom attributes are contained within payload
				var soundfile = e.soundname || e.payload.sound;
				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/" + soundfile);
				my_media.play();
			} else {// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart) {
					$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
				} else {
					$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
				}
			}

			//$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			//Only works for GCM
			//$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			//$("#app-status-ul").append('<li>MESSAGE -> SOUND: ' + e.payload.sound + '</li>');
			//Only works on Amazon Fire OS
			//$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
			break;

		case 'error':
			$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
			break;

		default:
			$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
			break;
	}
}

function successHandler(data) {
	//alert("init success");
	debugger;
}

function errorHandler(error) {
	//alert("init fail");
	debugger;
}

//
// var route = function(r) {
// //alert("route: "+r);
// var ref = window.open('http://blrbr.co/' + r, '_blank', 'toolbar=no,location=no,hidden=yes');
// ref.addEventListener('loadstart', function(event) {
// //navigator.notification.activityStart("Please Wait", "Its loading....");
// //alert('refurl: ' + event.url);
// $('#createPage').hide();
// $('#homePage').hide();
// $('#loadingPage').show();
//
// if (event.url.indexOf('Blrb/Create') != -1) {
// $('#loadingPage').hide();
// $('#homePage').hide();
// $('#createPage').show();
// var params = event.url.split('?')[1].split(/[=&]/);
// //localStorage.username = params[1];
// //localStorage.channel = params[3];
// resetView();
// //window.open('create.html?' + event.url.split('?')[1], '_self');
// ref.close();
// }
// if (event.url == "http://blrbr.co/") {
// $('#loadingPage').hide();
// $('#createPage').hide();
// $('#homePage').show();
// ref.close();
// }
//
// // if (event.url.indexOf('Blrb/Create') != -1) {
// // localStorage.stuff=event.url.split('?')[1];
// // window.open('create.html?' + event.url.split('?')[1], '_self');
// // ref.close();
// //
// // }
// // if (event.url == "http://blrbr.co/") {
// // window.open('index.html', '_self');
// // ref.close();
// // }
//
// });
//
// ref.addEventListener('loadstop', function(event) {
// ref.show();
// //navigator.notification.activityStop();
// });
//
// navigator.notification.activityStop();
// ref.addEventListener('loaderror', function(event) {
// alert('error: ' + event.message);
// });
// ref.addEventListener('exit', function(event) {
// //alert('exit: ' + event.message);
// });
//
// };
