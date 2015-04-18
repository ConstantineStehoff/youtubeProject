(function() {
	'use strict';

	angular
		.module('utubeApp', []);
		
}());	 
(function(window) {
	'use strict';
	
	angular
		.module('utubeApp')
		.controller('Video', Video);

	function Video(){
		// initial values for variables
		var vm = this;
	  	vm.height = 390;
	  	vm.width = 640;
	  	vm.videoId = 'UoUEQYjYgf4';
	  	vm.rotated = 0;
	}
}());	 
/* This is a simple directive for a youtube video */
(function() {
	'use strict';	
	angular
		.module('utubeApp')
		.directive('utube', utube);

	utube.$inject =  ['$window', 'youtubeService']; 
		
	function utube($window, youtubeService) {
	  	var directive ={
	  		link: link,
	  		template: '<div id="player"></div>',
	  		restrict: 'EA',
	  		scope: {
	  			height: '@',
	  			width: '@',
	  			videoId: '@',
	  			rotated: '@'
	  		}
	  	};

	  	return directive;

	  	function link(scope, element, attrs){
	  		youtubeService.init(scope.height, scope.width, scope.videoId);
	  		// watching the varibales and apply api etc. functions 
	  		scope.$watch('height + width', function(newValue, oldValue) {
			  	if (newValue == oldValue) {
			    	return;
			  	}
			  	youtubeService.changingSize(scope.width, scope.height);
			});

	  		scope.$watch('videoId', function(newValue, oldValue) {
    			if (newValue == oldValue) {
      				return;
    			}
				youtubeService.changingContent(scope.videoId);
			});

	  		scope.$watch('rotated', function(newValue, oldValue) {
    			if (newValue == oldValue) {
      				return;
    			}
    			youtubeService.rotator(element.find('#player'), scope.rotated);
			});  
			youtubeService.rotator(element.find('#player'), scope.rotated);
	  	} 	
	}
}()); 
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