
/* This service is used by the directive link function to 
   instantiate the youtube video object and manipulate it */	
(function() {
	'use strict';
	angular
		.module('utubeApp')
		.factory('youtubeService', youtubeService);

	youtubeService.$inject = ['$window'];

	function youtubeService($window){
		var player;
		var vId;
		var vhegiht;
		var vwidth;

		var service ={
			init : init,
			changingSize : changingSize,
			changingContent : changingContent,
			rotator : rotator
		};

		return service;

		function init(hght, wdth, vid){
			vId = vid;
			vhegiht = hght;
			vwidth = vwidth;
			var tag = document.createElement('script');

	      	tag.src = "https://www.youtube.com/iframe_api";
	      	var firstScriptTag = document.getElementsByTagName('script')[0];
	      	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      	$window.onYouTubeIframeAPIReady = function() {
	        	player = new YT.Player('player', {
	          		height: vhegiht,
		          	width: vwidth,
		          	videoId: vId
	        	});
	      	};
		}

		function changingSize(width, height){
			player.setSize(width, height);
		}

		function changingContent(videoId){
			player.cueVideoById(videoId);
		}

		function rotator(el, degree){
			el.css('transition', '-webkit-transform 800ms ease');
			el.css({
				'-ms-transform' : 'rotate(' + degree + 'deg)', 
    			'-webkit-transform' : 'rotate(' + degree + 'deg)',
    			'transform' : 'rotate(' + degree + 'deg)'
			});
		}
	}

}());