var Main = {
    init: function(){
		
		User.init();
		History.init();
		Arcade.init();
		
		Main.initFooter();
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
	},
	
	clearPage: function(){
		
		clearInterval(Main.interval);
		$("#lobby").off("click");
		$("#lobby").off("keydown");
		$("body").scrollTop(0);
	},
	
	initFooter: function(){
		
		$("#lobby-footer").on("click", "a", Main.footerLinkClick);
	},
	
	footerLinkClick: function(e){
		History.navTo({
			pageType: "static",
			pageName: $(e.target).attr("data-page-name")
		});
	}
};