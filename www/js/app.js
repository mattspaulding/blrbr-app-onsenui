(function() {'use strict';
	var app = angular.module('myApp', ['onsen.directives']);

	app.controller('StreamCtrl', function($scope, $http) { debugger;
		$scope.myData = {};
		$scope.myData.doClick = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				$scope.myData.fromServer = data.title;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				alert("AJAX failed!");
				debugger;
				gotoRoute("Account/Login");
			});

		};
	});

	app.controller('CreateCtrl', function($scope) {
	});
})();
