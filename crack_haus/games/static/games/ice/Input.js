var IceInput = {
	
	x: 100,
	y: 100,
	pressed: false,
	
	init: function(){
		Input.initMouseListeners();	
	},
	
	initMouseListeners: function(){
		$("#game-wrapper").mousemove(function(e){
			Input.x = e.pageX * 1000 / $("#game-wrapper").width();		
			Input.y = e.pageY * 500 / $("#game-wrapper").height();	
		});
		
		$("#game-wrapper").mousedown(function(e){
			Input.pressed = true;
		});
		
		$("#game-wrapper").mouseup(function(e){
			Input.pressed = false;
		});
	}
	
	
	
	
	
	
}