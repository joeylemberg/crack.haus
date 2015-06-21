var Arcade = {
	
	init: function(){
		
		Main.clearPage();
		
		$("#lobby-title").html("Arcade");
		$("#lobby").html("<div class='arcade'>Loading games " + Util.loaderHtml() + "</div>");
		$("#lobby").on("click", ".listed-game", Arcade.setGame);
		
		Main.interval = setInterval(Arcade.getGames, 500);
	},
	
	getGames: function(){
		Api.request({
		    method: "GET",
		    url: "api/games/",
		    onSuccess: function (data) {
				if(History.pageType == "arcade"){
					Arcade.renderGames(data);
				}
		    }
		});
	},
	
	renderGames: function(games){
		var i, game;

		var html = "<table class='game-table' cellspacing='0' >";
 
		html += "<tr>";
		html += "<th>Game</th>";
		html += "<th>Description</th>";
                html += "<th>Users in lobby</th>";
		html += "</tr>";

		for(i = 0; i < games.length; i++){
			game = games[i];
			html += "<tr class='listed-game clickable' data-url='" + game.url + "' data-id='" + game.id + "' data-name='" + game.name + "' >";
			html += "<td>" + game.name + "</td>";
			html += "<td class='game-description'>" + game.description + "</td>";
		        html += "<td>" + game.lobby_size + "</td>";
                        html += "</tr>"
		}
		$("#lobby").html(html);
	},
	
	setGame: function(e){
		$("#lobby").off("click");
		var clickedRow = $(e.target).closest(".listed-game");
		
		var data = {
			pageType: "game",
            url: clickedRow.attr("data-url"),
			name: clickedRow.attr("data-name"),
			id: clickedRow.attr("data-id"),
			description: clickedRow.find(".game-description").text()
		};
		
		History.navTo(data);
	}

};