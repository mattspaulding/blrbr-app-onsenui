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

var gotoRoute=function(r) {
	   var ref = window.open('http://blrbrdev.azurewebsites.net/' + r, '_blank', 'toolbar=no,location=no');
	ref.addEventListener('loadstart', function(event) {
		// debugger;
		// alert("url: " + event.url);
		
		// if (event.url.indexOf('Blrb/Create') != -1) {
			// ref.close();
			// window.location = "create.html?" + event.url.split('?')[1];
		// }
// 
	// if (event.url.indexOf('Blrb/me') != -1) {
			// ref.close();
			// ons.slidingMenu.setMainPage('home.html', {closeMenu: true});
			// //window.location = "stream.html?" + event.url.split('?')[1];
		// }


alert(event.url);
	if (event.url.indexOf('Account') == -1) {
			ref.close();
			ons.slidingMenu.setMainPage('home.html', {closeMenu: true});
			//window.location = "stream.html?" + event.url.split('?')[1];
		}


		var segs = event.url.split("/");
		if (segs[3] == "") {
			ref.close();
			window.location = "index.html";
		}

	});
	ref.addEventListener('loaderror', function(event) {
		//alert('error: ' + event.message);
	});
	ref.addEventListener('exit', function(event) {
		//alert("Exit");
	});

};

// 
// debugger;
	// var route = localStorage.route;
	// localStorage.route = null;
// 
	// var web= gotoRoute(route);
