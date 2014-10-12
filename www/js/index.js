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

var app = {

	// Application Constructor
	initialize : function() {
		onBodyLoad();
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
	bindEvents : function() { debugger;
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready'); debugger;
		StatusBar.hide();
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

var route = function(r) {
	//alert("route: "+r);
	var ref = window.open('http://blrbr.co/' + r, '_blank', 'toolbar=no,location=no,hidden=yes');
	ref.addEventListener('loadstart', function(event) {
		//navigator.notification.activityStart("Please Wait", "Its loading....");
		//alert('refurl: ' + event.url);
		$('#createPage').hide();
		$('#homePage').hide();
		$('#loadingPage').show();

		if (event.url.indexOf('Blrb/Create') != -1) {
			$('#loadingPage').hide();
			$('#homePage').hide();
			$('#createPage').show();
			var params = event.url.split('?')[1].split(/[=&]/);
			//localStorage.username = params[1];
			//localStorage.channel = params[3];
			resetView();
			//window.open('create.html?' + event.url.split('?')[1], '_self');
			ref.close();
		}
		if (event.url == "http://blrbr.co/") {
			$('#loadingPage').hide();
			$('#createPage').hide();
			$('#homePage').show();
			ref.close();
		}

		// if (event.url.indexOf('Blrb/Create') != -1) {
		// localStorage.stuff=event.url.split('?')[1];
		// window.open('create.html?' + event.url.split('?')[1], '_self');
		// ref.close();
		//
		// }
		// if (event.url == "http://blrbr.co/") {
		// window.open('index.html', '_self');
		// ref.close();
		// }

	});

	ref.addEventListener('loadstop', function(event) {
		ref.show();
		//navigator.notification.activityStop();
	});

	navigator.notification.activityStop();
	ref.addEventListener('loaderror', function(event) {
		alert('error: ' + event.message);
	});
	ref.addEventListener('exit', function(event) {
		//alert('exit: ' + event.message);
	});

};
