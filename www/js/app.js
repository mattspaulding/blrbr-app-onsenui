(function() {'use strict';
	var app = angular.module('myApp', ['onsen.directives']);

	app.controller('HomeCtrl', function($scope, $http) { 
		$scope.response = {};
		$scope.response.get = function() {
		
			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Account/WhoAmI");

			responsePromise.success(function(data, status, headers, config) { 
				localStorage.isLoggedIn = true;
				$('#isLoggedInTrue').show();
					$('#loginBtn').hide();
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { 
				localStorage.isLoggedIn = false;
				$('#isLoggedInTrue').hide();
				$('#loginBtn').show();
			});

		};
		var res = $scope.response.get();

	});

	app.controller('StreamCtrl', function($scope, $http) { debugger;
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				// alert("AJAX failed! "+status);
				// debugger;
				gotoRoute("Account/Login");
			});

		};

	var res = $scope.response.get();

	});

	app.controller('CreateCtrl', function($scope) {
	});
})();
