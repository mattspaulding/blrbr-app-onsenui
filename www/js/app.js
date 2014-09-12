(function() {'use strict';
	var app = angular.module('myApp', ['onsen.directives']);

	app.controller('HomeCtrl', function($scope, $http) { debugger;
		$scope.response = {};
		$scope.response.get = function() {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Account/WhoAmI");

			responsePromise.success(function(data, status, headers, config) { debugger;
				alert("name: " + data);
				localStorage.isLoggedIn = true;
				$('#isLoggedInTrue').show();
				$('#isLoggedInFalse').hide();
				$('#loginBtn').hide();
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				// alert("AJAX failed! "+status);
				debugger;
				localStorage.isLoggedIn = false;
				$('#isLoggedInTrue').hide();
				$('#isLoggedInFalse').show();
				$('#loginBtn').show();
			});

		}; debugger;
		var res = $scope.response.get();

	});

	app.controller('StreamCtrl', function($scope, $http) { debugger;
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson");

			responsePromise.success(function(data, status, headers, config) { debugger;
				alert("AJAX success!");
				alert("data: " + data.NumberOfBlrbs);
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { debugger;
				// alert("AJAX failed! "+status);
				// debugger;
				gotoRoute("Account/Login");
			});

		};

	});

	app.controller('CreateCtrl', function($scope) {
	});
})();
