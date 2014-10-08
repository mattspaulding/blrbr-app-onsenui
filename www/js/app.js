(function() {'use strict';
	var app = angular.module('myApp', ['onsen.directives']);

	app.directive('htmldiv', function($compile, $parse) {
		return {
			restrict : 'E',
			link : function(scope, element, attr) {
				scope.$watch(attr.content, function() {
					element.html($parse(attr.content)(scope));
					$compile(element.contents())(scope);
				}, true);
			}
		}
	});

	app.controller('MenuCtrl', function($scope) {
		$scope.gotoPage = function(page) {
			alert("in gotopage");
			localStorage.channel = "";
			localStorage.username = "";
			localStorage.blrbId = "";
			ons.slidingMenu.setMainPage(page + '.html', {
				closeMenu : true
			});
		};
	});

	app.controller('HomeCtrl', function($scope, $http) {
		$scope.response = {};
		$scope.response.get = function() {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Account/WhoAmI");

			responsePromise.success(function(data, status, headers, config) {
				localStorage.isLoggedIn = true;
				$('#loginBtn').hide();
				$('#logoutBtn').show();
				$('#loadingBtn').hide();
				$('#isLoggedInTrue').fadeIn("slow");
				$scope.response = data;
			});
			responsePromise.error(function(data, status, headers, config) {
				localStorage.isLoggedIn = false;
				$('#isLoggedInTrue').hide();
				$('#loginBtn').show();
				$('#logoutBtn').hide();
				$('#loadingBtn').hide();
			});

		};
		var res = $scope.response.get();

	});

	app.controller('StreamCtrl', function($scope, $http) {
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Blrb/StreamJson/" + localStorage.channel);

			responsePromise.success(function(data, status, headers, config) {
				$scope.response = data;
				$('#streamLoad').hide();
				$('#streamMain').fadeIn('slow');

				if (localStorage.channel === "") {
					$("#profile").fadeIn("slow");
				} else {
					$("#channel").fadeIn("slow");
				}
				$state.reload();

			});
			responsePromise.error(function(data, status, headers, config) {
				//alert("Stream failed! " + status); debugger;
				gotoRoute("Account/Login");
			});

		};

		var res = $scope.response.get();

		$scope.gotoChannel = function(channel) {
			localStorage.channel = channel;
			ons.slidingMenu.setMainPage('stream.html', {
				closeMenu : true
			});
		};
		
		$scope.reply = function(data) {
			debugger;
						localStorage.username = data.blrb.UserName;
						localStorage.blrbId = data.blrb.Id;
						alert('set blrbId: '+localStorage.blrbId);
			ons.slidingMenu.setMainPage('create.html', {
				closeMenu : true
			});
		};

		var channel = "";
		// @if(Model.Channel!=null&&Model.Channel.Hashtag!=null)
		// {
		// @:channel = "@Model.Channel.Hashtag";
		// }
		$('audio').css("visibility", "hidden");
		$('#liveItem').css("display", "block");
		$('#playingItem').css("display", "none");
		// Reference the auto-generated proxy for the hub.
		var blrb = $.connection.blrbHub;
		// Create a function that the hub can call back to display messages.
		blrb.client.showBlrb = function(blrb) { debugger;
			// Add the message to the page.
			$scope.response.BlrbStreamItems.unshift(blrb);
			$scope.$apply();
			var val = parseInt($('#numberOfBlrbs').text());
			var newval = val + 1;
			$('#numberOfBlrbs').html(newval);
			if (pagePlayer.soundCount == 0 || pagePlayer.sounds[pagePlayer.soundCount - 1].playState == 0) {
				$('#' + blrb.Id + ' .play').click();
			}
		};
		$.connection.hub.url = 'http://blrbrdev.azurewebsites.net/signalr';

		// Start the connection.
		$.connection.hub.start().done(function() {
			// $('#startStream').click(function () {
			// // Call the Send method on the hub.
			//blrb.server.go("it works!");
			// //$('#startStream').hide();
			// });
			if ($scope.response.Channel != null) {
				blrb.server.subscribeToChannel($scope.response.Channel.Hashtag);
			} else if ($scope.response.UserProfile != null) {
				blrb.server.subscribe($scope.response.UserProfile.TwitterId.ToString());
			}

		});

		// This optional function html-encodes messages for display in the page.
		// function htmlEncode(value) {
		// var encodedValue = $('<div />').text(value).html();
		// return encodedValue;
		// }

		//
		// });

		$scope.LoadBlrbs = function() { debugger;
			var lastId = $scope.response.BlrbStreamItems.slice(-1)[0].Id;
			if (lastId === undefined) {
				lastId = 9999999999;
			}debugger;
			var loadUrl;
			if ($scope.response.Channel == null) {
				loadUrl = 'http://blrbrdev.azurewebsites.net/Blrb/LoadBlrbs?id=' + lastId;
			} else {
				loadUrl = 'http://blrbrdev.azurewebsites.net/Blrb/LoadBlrbs?id=' + lastId + "&channel=" + $scope.response.Channel.Hashtag;
			}
			var responsePromise = $http.get(loadUrl);
			responsePromise.success(function(data, status, headers, config) { debugger;
				$scope.response.BlrbStreamItems = $scope.response.BlrbStreamItems.concat(data);
			});
			responsePromise.error(function(data, status, headers, config) {
				alert("Uh oh!" + status);
				debugger;
			});
		};

	});

	app.controller('ChannelCtrl', function($scope, $http) {
		$scope.response = {};
		$scope.response.get = function(item, event) {

			var responsePromise = $http.get("http://blrbrdev.azurewebsites.net/Channel/FeaturedChannels");

			responsePromise.success(function(data, status, headers, config) {
				$scope.response = data;
				$('#channelLoad').hide();
				$('#channelMain').fadeIn('slow');
			});
			responsePromise.error(function(data, status, headers, config) {
				alert("Channel failed! " + status);
				debugger;
				gotoRoute("Account/Login");
			});

		};

		var res = $scope.response.get();

		$scope.gotoChannel = function(channel) {
			localStorage.channel = channel;
			ons.slidingMenu.setMainPage('stream.html', {
				closeMenu : true
			});
		};

	});

	app.controller('CreateCtrl', function($scope) {

		$scope.twitterToggle = function(val) {
			if (val == "yes") {
				isTweet = true;
				$('#twitterYes').show();
				$('#twitterNo').hide();
			} else {
				isTweet = false;
				$('#twitterYes').hide();
				$('#twitterNo').show();
			}

		}
		var deviceready = false;
		var mediaVar = null;
		var status = null;
		var recordFileName = "recording.amr";
		var isTweet = true;
		if (localStorage.channel != "")
			$("#text_textarea").val('#' + localStorage.channel);
	if (localStorage.username != "")
			$("#text_textarea").val($("#text_textarea").val()+' @' + localStorage.username);

		//function onBodyLoad() { debugger;
		document.addEventListener("deviceready", onDeviceReady, false);
		deviceready = true;
		if (phoneCheck.ios != null) {
			recordFileName = "recording.wav";
		}

		//}

		function resetView() {
			$("#recordBtn").show();
			$("#backBtn").show();
			$("#stopBtn").hide();
			$("#twitterYes").show();
			$("#playBtn").hide();
			$("#playBtnOff").show();
			$("#blrbBtn").hide();
			$("#blrbBtnOff").show();
			$("#twitterNo").hide();
			$("#text_textarea").show();
			$("#text_textarea").val('');
			$("#loading").hide();
		};

		//$(document).ready(function() {
		//resetView();
		try {
			var href = decodeURIComponent(window.location.href);
			var p = href.split('username=')[1];
			var q = p.split('&channel=')[1];
			window.username = p.split('&channel=')[0];
			window.channel = q.split('&text=')[0];
			if (window.channel == " ") {
				window.channel = "";
			}
			window.text = q.split('&text=')[1];
			if (window.text == " " || window.text == "  ") {
				window.text = "";
			}

			$("#text_textarea").val(window.text);
		} catch(err) {
			//alert("data transfer error: " + err);
			//window.location="index.html";

		}

		//validation to check if device is ready is skipped

		$("#recordBtn").click(function() {
			//alert("record");
			record();
		});

		$("#backBtn").click(function() {
			//route('blrb/me');
			//window.location = "index.html";
		});

		$("#playBtn").click(function() {
			//alert("play");
			play();
		});

		$("#stopBtn").click(function() {
			//alert("stop");
			stop();
		});
		$("#blrbBtn").click(function() {
			uploadVoice();
		});
		//});
		// Set audio position
		//
		function setAudioPosition(position) {
			$("#audioPosition").html(position);
		}

		function record() {
				status = "countdown";
				$("#recordBtn").hide();
				$("#stopBtn").show();
				$("#playBtn").hide();
				$("#playBtnOff").show();
				$("#blrbBtn").hide();
				$("#blrbBtnOff").show();
				$("#text_textarea").hide();
				$("#recording_textarea").show();
	$(".fa-microphone-slash").show();
				$(".fa-microphone").hide();
					$("#recording_textarea").css("background-color","red");
				
				// Stop recording after 6 sec
				var recTime = 3;
				setAudioPosition(recTime);
				var recInterval = setInterval(function() {
					if (status == 'countdown') {
						recTime = recTime - 1;
						setAudioPosition(recTime);
					}
					if (recTime == 2) {
						$("#recording_textarea").css("background-color","orange");
					}
					if (recTime == 1) {
						$("#recording_textarea").css("background-color","yellow");
					}
					if (recTime <= 0 ) {
						clearInterval(recInterval);
						recordAudio();
					}
					if (status != 'countdown') {
						clearInterval(recInterval);
						
					}
			}, 1000);
		}

		function recordAudio() {
			debugger;
			createMedia(function() {
				debugger;
				status = "recording";
				mediaVar.startRecord();
						$("#recording_textarea").css("background-color","#6FBF46");
				$(".fa-microphone-slash").hide();
				$(".fa-microphone").show();
				
				// Stop recording after 6 sec
				var recTime = 0;
				setAudioPosition(recTime);
				var recInterval = setInterval(function() {
					if (status == 'recording') {
						recTime = recTime + 1;
						setAudioPosition(recTime);
					}
					if (recTime >= 6 || status != 'recording') {
						clearInterval(recInterval);
						stop();
								
					}
				}, 1000);
			});
		}

		function createMedia(onMediaCreated, mediaStatusCallback) {
			if (mediaVar != null) {
				onMediaCreated();
				return;
			}

			if ( typeof mediaStatusCallback == 'undefined')
				mediaStatusCallback = null;
			if (phoneCheck.ios != null) {
				//first create the file
				window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSystem) {
					// save the file system for later access
					fileSystem.root.getFile(recordFileName, {
						create : true,
						exclusive : false
					}, function(fileEntry) {
						mediaVar = new Media(fileEntry.fullPath, function() {
							//alert("File " + recordFileName + " created at " + fileEntry.fullPath);
							//alert("Media created successfully");
							//uploadVoice();
						}, null, mediaStatusCallback);
						//of new Media
						onMediaCreated();
					}, onError);
					//of getFile
				}, onError);
				//of requestFileSystem
			} else//it's Android
			{
				mediaVar = new Media(recordFileName, function() {
					//alert("Media created successfully: " + recordFileName);
				}, onError, mediaStatusCallback);
				onMediaCreated();
			}
		}

		function stop() {
			//alert("mediavar: "+mediaVar);
			if (mediaVar == null)
				return;
			//alert("status: "+status);
			if (status == 'recording') {
				mediaVar.stopRecord();

				log("Recording stopped");
			} else if (status == 'playing') {
				mediaVar.stop();
				log("Play stopped");
			} else {
				log("Nothing stopped");
			}
			$("#recordBtn").show();
			$("#stopBtn").hide();
			$("#playBtn").show();
			$("#playBtnOff").hide();
			$("#blrbBtn").show();
			$("#blrbBtnOff").hide();
		$("#text_textarea").show();
				$("#recording_textarea").hide();
					status = 'stopped';
		}

		function play() {
			//playAudio("recording.amr");
			//alert("getting media");
			var media = new Media(recordFileName, function() {
				//alert( "Media Success" );
			}, function() {
				//alert("Media Failure, reason: " + err);
			});
			//alert("playing");
			media.play();
			//alert("done");
		}

		
		function onSuccess() {
			//do nothing
		}

		function onError(err) {
			if ( typeof err.message != 'undefined')
				err = err.message;
			alert("Error : " + err.message);
		}

		function log(message) {
			//alert(message);
		}

		function onDeviceReady() {

		}

		function uploadVoice() { debugger;
			var audioURI = "mnt/sdcard/recording.amr";

			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.fileName = "recording.amr";
			options.mimeType = "audio/amr";

			if (phoneCheck.ios != null) {
				//alert("ios");
				//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
				//		var directoryReader = fs.root.createReader();
				//		directoryReader.readEntries(function(entries) {
				//			audioURI = "cdvfile://localhost/persistent/recording.wav";
				//				audioURI = entries[1].toURI();
				//	alert(audioURI);
				//		});
				//	});

				audioURI = "cdvfile://localhost/temporary/recording.wav";
				options.fileName = "recording.wav";
				options.mimeType = "audio/wav";
				options.chunkedMode = false;
			}
alert('blrbId: '+localStorage.blrbId);
			var params = new Object();
			//params.channel = window.channel;
			params.channel = "";
			params.text = $("#text_textarea").val();
			//params.username = window.username;
			params.username = "";
			params.isTweet = isTweet;
			params.inReplyToStatusId = localStorage.blrbId;
			//alert("params: "+params.username + params.channel + params.isTweet + params.text);
			options.params = params;
			var ft = new FileTransfer();
			//ft.upload(audioURI, "http://blrbr.co/Blrb/UploadAudio", win, fail, options);
			//ft.upload(audioURI, "http://localhost:49379/Blrb/UploadAudio", win, fail, options);
			ft.upload(audioURI, "http://blrbrdev.azurewebsites.net/Blrb/UploadAudio", win, fail, options);
			$("#backBtn").hide();
			$("#recordBtn").hide();
			$("#stopBtn").hide();
			$("#playBtn").hide();
			$("#blrbBtn").hide();
			$("#text_textarea").hide();
			$("#twitterYes").hide();
			$("#twitterNo").hide();
			$("#loading").show();
			
			localStorage.blrbId="";
			localStorage.username="";
			//document.getElementById('audio_position').innerHTML = "blrbing...";

		}

		function win(r) {
			//alert("Code = " + r.responseCode);
			//alert("Response = " + r.response);
			//app.initialize();
			ons.slidingMenu.setMainPage('stream.html', {
				closeMenu : true
			});
		}

		function fail(error) {
			alert("blrb error: " + error.code);
			ons.slidingMenu.setMainPage('stream.html', {
				closeMenu : true
			});
		}

	});
})();
