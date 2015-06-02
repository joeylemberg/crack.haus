var Game = {
	
	init: function(options){
		console.log(options);
		console.log(options);
		
		
	},
	
	init: function(options){
		
		Game.url = options.url;
		Game.name = options.name;
		Game.id = options.id;
		
		$("#lobby-title").html("Open <em>" + Game.name + "</em> Lobbies");
		$("#lobby").html("<div class='arcade'>Loading matches " + Util.loaderHtml() + "</div>");
		$("#lobby").on("click", ".listed-match", Game.joinMatch);
		
		Game.getMatches();	
	},
	
	getMatches: function(){
		Api.request({
		    method: "GET",
		    url: Game.url,
		    onSuccess: function (data) {
		        Game.renderMatches(data);
		    }
		});
	},
	
	
	
	renderMatches: function(data){
		console.log(data);
		var i, lobby;
		
		var html = "<table class='game-table' cellspacing='0' >";
 
		html += "<tr>";
		html += "<th>Tag</th>";
		html += "</tr>";

		for(i = 0; i < data.lobby_set.length; i++){
			lobby = data.lobby_set[i];
			html += "<tr class='open-lobby' data-url='" + lobby.url + "'>";
			html += "<td>" + lobby.name + "</td>";
			html += "</tr>";
		}
		$("#lobby").html(html);
	},
	
	joinMatch: function(e){
		console.log("ASDFDFASDf");	
		$("#lobby").off("click");
		var clickedRow = $(e.target).closest(".listed-game");
		
	}
	
	
}