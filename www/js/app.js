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
					$('#loadingBtn').hide();
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { 
				localStorage.isLoggedIn = false;
				$('#isLoggedInTrue').hide();
				$('#loginBtn').show();
				$('#loadingBtn').hide();
			});

		};
		var res = $scope.response.get();

	});

	app.controller('StreamCtrl', function($scope, $http) { 
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson/firstblrbever");

			responsePromise.success(function(data, status, headers, config) { 
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { 
				// alert("AJAX failed! "+status);
				// debugger;
				gotoRoute("Account/Login");
			});

		};

	var res = $scope.response.get();



        var channel = "";
        // @if(Model.Channel!=null&&Model.Channel.Hashtag!=null)
        // {
                // @:channel = "@Model.Channel.Hashtag";
                                                                                                                                                                            // }
        $('audio').css("visibility", "hidden");
        $('#liveItem').css("display", "block");
        $('#playingItem').css("display", "none");
        $(function () {
          

            // Reference the auto-generated proxy for the hub.
            // var blrb = $.connection.blrbHub;
            // // Create a function that the hub can call back to display messages.
            // blrb.client.showBlrb = function (blrb) {
                // // Add the message to the page.
                // $('.playlist').prepend(
                                   // '<li style="background-color:#' + blrb.Color + ';"  class="blrbItem" id="' + blrb.Id + '">\
                 // <a href="'+ blrb.Sound + '" class="clip" >\
                         // <div class="row" style="background-color:white; ">\
                              // <div class="col-xs-2" style="padding:0;">\
                // <img src="../../Content/pause.png" alt="pause" class="pause" width="48" />\
                // <img src="../../Content/play.png" alt="play" class="play" width="48" />\
            // </div>\
        // <div class="col-xs-10">\
            // <img src="'+ blrb.Img + '" />\
            // '+ blrb.ScreenName + '\
        // </div>\
    // </div>\
          // </a>\
                       // <div style="background-color: white;">\
                             // <span class="raw-text">\
                                // '+ blrb.TextWithMarkup + '\
                             // </span>\
                         // </div>\
                         // </li>'
                    // );
                // var val = parseInt($('#numberOfBlrbs').text());
                // var newval = val + 1;
                // $('#numberOfBlrbs').html(newval);
                // if (pagePlayer.soundCount == 0 || pagePlayer.sounds[pagePlayer.soundCount - 1].playState == 0) {
                    // $('#' + blrb.Id + ' .play').click();
                // }
//                
            // };
            // Start the connection.
            //$.connection.hub.start().done(function () {
                //$('#startStream').click(function () {
                //    // Call the Send method on the hub.
                //    blrb.server.go("it works!");
                //    //$('#startStream').hide();
                //});
                // @if (Model.Channel != null)
            // {
                    // @:blrb.server.subscribeToChannel("@Model.Channel.Hashtag");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // }
            // else if (Model.UserProfile != null)
            // {
                    // @:blrb.server.subscribe("@Model.UserProfile.TwitterId.ToString()");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // }
// 
            //});




            // This optional function html-encodes messages for display in the page.
            function htmlEncode(value) {
                var encodedValue = $('<div />').text(value).html();
                return encodedValue;
            }
        });




        function LoadBlrbs(id) {
            lastId = $('.blrbItem').last().attr('id');
            if (lastId === undefined) {
                lastId = 9999999999;
            }
            var loadUrl = '@Url.Action("LoadBlrbs")?id=' + lastId + "&channel=@hashtag&blrbr=";
            $.get(loadUrl)
             .success(function (data) {
                 data.forEach(function (blrb) {
                     $('.playlist').append(
                                '<li style="background-color:#' + blrb.Color + ';"  class="blrbItem" id="' + blrb.Id + '">\
                 <a href="'+ blrb.Sound + '" class="clip" >\
                         <div class="row" style="background-color:white; ">\
                              <div class="col-xs-2" style="padding:0;">\
                <img src="../../Content/pause.png" alt="pause" class="pause" width="48" />\
                <img src="../../Content/play.png" alt="play" class="play" width="48" />\
            </div>\
        <div class="col-xs-10">\
            <img src="'+ blrb.Img + '" />\
            '+ blrb.ScreenName + '\
        </div>\
    </div>\
          </a>\
                       <div style="background-color: white;">\
                             <span class="raw-text">\
                                '+ blrb.TextWithMarkup + '\
                             </span>\
                         </div>\
                         </li>'
                        );
                 });

             });
        };


	});
	app.controller('ChannelCtrl', function($scope, $http) { 
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://localhost:49379/Blrb/StreamJson/firstblrbever");

			responsePromise.success(function(data, status, headers, config) { 
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) { 
				 alert("AJAX failed! "+status);
							});

		};

	var res = $scope.response.get();

	});

	app.controller('CreateCtrl', function($scope) {
	});
})();
