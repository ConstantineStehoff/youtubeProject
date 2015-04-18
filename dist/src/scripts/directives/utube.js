
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