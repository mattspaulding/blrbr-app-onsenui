(function() {'use strict';
	var app = angular.module('myApp', ['onsen.directives']);

	app.controller('StreamCtrl', function($scope, $http) { debugger;
		$scope.myData = {};
		$scope.myData.doClick = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				alert("AJAX success!");
				alert("data: "+data.NumberOfBlrbs);
				$scope.BlrbStreamResponse = data;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				// alert("AJAX failed! "+status);
				// debugger;
				gotoRoute("Account/Login");
			});

		};
	$scope.myData.doUser = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/TestUserJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				alert("AJAX success!");
				$scope.myData.fromServer = data.title;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				alert("AJAX failed! "+status);
				debugger;
				gotoRoute("Account/Login");
			});

		};
	$scope.myData.doNoUser = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/TestNoUserJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				alert("AJAX success!");
				$scope.myData.fromServer = data.title;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				alert("AJAX failed! "+status);
				debugger;
				gotoRoute("Account/Login");
			});

		};
	});

	app.controller('CreateCtrl', function($scope) {
	});
})();
