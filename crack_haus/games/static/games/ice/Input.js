var Input = {
	
	x: 100,
	y: 100,
	
	init: function(){
		Input.initMouseListeners();	
	},
	
	initMouseListeners: function(){
		$("#game-wrapper").mousemove(function(e){
			Input.x = e.pageX;// * 800 / $("#game-wrapper").width();		
			Input.y = e.pageY;// * 800 / $("#game-wrapper").height();	
		});
	}
	
	
	
	
	
	
}