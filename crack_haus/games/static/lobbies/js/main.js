var Main = {
	
	init: function(){
		
		User.init();
		History.init();
		
	},
	
	interval: undefined,
	
	shakeCup: function(){
		var rand = Math.round(Math.random() * 5);
		var randy = Math.round(Math.random() * 5);
		$("#crack-haus-title img").css({
			"margin-top": rand + "px",
			"margin-left": randy + "px"
		});
		setTimeout(Main.shakeCup, rand);	
	}
	
	
}