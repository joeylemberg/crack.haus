var History = {
	
	path: "/",
	
	init: function(url){
		
		Arcade.init();
		
		window.addEventListener("popstate", History.onBack);

		
	},
	
	onBack: function(e){
		
		
		console.log(e);
		
		console.log("it's poppin");
		var data = e.state;
		
		if(!data){
			//root
			Arcade.init();
		}else{
			switch(data.pageType){
			case "game":
		//		history.pushState(data, null, "game/" + History.toUrl(data.name));
				Game.init(data);
				break;
				
			case "match":
				Match.showOutOfDate();
			///	Match.init(data);
			//	if(data.role == "host"){
		///			Game.hostMatch();
		//		}else{
					
			//	}
		//		history.pushState(data, null, "match/" +  History.toUrl(data.name));
		//		Game.init(data);
				break;
		}
		//alert(JSON.stringify(state.data));
		}
		
		
	},
	
	navTo: function(data){
		console.log("NAVIT");
		console.log(data);
		switch(data.pageType){
			case "game":
				history.pushState(data, null, History.toUrl(data.name));
				Game.init(data);
				break;
				
			case "match":
				history.pushState(data, null, History.toUrl(data.name));
				Match.init(data);
		//		History.inMatch = true;
		//		history.replaceState(history.state, null, History.toUrl(Game.name) + "/" + History.toUrl(data.name))
				
			//	var newPath = History.toUrl(data.name);
			//	if(window.location.pathname.indexOf(History.toUrl(Game.name)) == -1){
			//		newPath = History.toUrl(Game.name) + "/" + newPath;
			//	}
				//history.pushState(data, null, History.toUrl(data.name));
		//		Game.init(data);
				break;
		}
	},
	
	toUrl: function(str){
		return str.replace(/\s/g, "-").replace(/'/g, "").toLocaleLowerCase(); 
	}
	
	
	
};