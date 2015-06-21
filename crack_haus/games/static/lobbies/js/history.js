var History = {
	
	path: "/",
	
	pageType: "arcade",
	
	init: function(url){
		
		window.addEventListener("popstate", History.onBack);
		
		
	},
	
	onBack: function(e){
		
		
		console.log(e);
		
		console.log("it's poppin");
		var data = e.state;
		
		if(!data){
			//root
			History.pageType = "arcade";
			Arcade.init();
		}else{
			switch(data.pageType){
			case "game":
				History.pageType = "game";
		//		history.pushState(data, null, "game/" + History.toUrl(data.name));
				Game.init(data);
				break;
				
			case "match":
				History.pageType = "match";
				Match.showOutOfDate();
			///	Match.init(data);
			//	if(data.role == "host"){
		///			Game.hostMatch();
		//		}else{
					
			//	}
		//		history.pushState(data, null, "match/" +  History.toUrl(data.name));
		//		Game.init(data);
				break;
				
			case "static":
				History.pageType = "static";
				Static[data.pageName]();
				break;
		}
		//alert(JSON.stringify(state.data));
		}
		
		
	},
	
	navTo: function(data){
		
		switch(data.pageType){
			case "game":
				History.pageType = "game";
				history.pushState(data, null, History.toUrl(data.name));
				Game.init(data);
				break;
				
			case "match":
				History.pageType = "match";
				history.pushState(data, null, History.toUrl(data.name));
				Match.init(data);
				break;
				
			case "profile":
				History.pageType = "profile";
				history.pushState(data, null, "profile");
				Profile.init(data);
				break;
				
			case "static":
				History.pageType = "static";
				history.pushState(data, null, data.pageName);
				Static[data.pageName]();
				break;
				
			case "playing":
				History.pageType = "static";
				history.pushState({}, null, null);
				break;
		}
	},
	
	toUrl: function(str){
		return str.replace(/\s/g, "-").replace(/'/g, "").toLocaleLowerCase(); 
	}
	
	
	
};