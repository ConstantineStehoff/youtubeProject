
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