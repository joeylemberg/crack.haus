var Game = {
	
	init: function(options){
		console.log(options);
		console.log(options);
		
		
	},
	
	init: function(options){
		
		Game.url = options.url;
		Game.name = options.name;
		Game.id = options.id;
		
		$("#lobby-title").html(Game.name);
		
		$("#lobby").html("<div class='game-room'></div>");
		
		$(".game-room").append($("<div class='game-room-title'>Open <em>" + Game.name + "</em> Matches</div>"));
		
		$(".game-room").append("<div class='game-list'>Loading matches " + Util.loaderHtml() + "</div>");
		
		
		$(".game-list").after($("<div class='host-a-match button' >Host a Match</div>"));
        $(".host-a-match").click(lobby.hostMatch);
		
		
		$("#lobby").on("click", ".open-match", Game.joinMatch);
		$("#lobby").on("click", ".host-a-match", Game.hostMatch);
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
			html += "<tr class='open-match clickable' data-url='" + lobby.url + "'>";
			html += "<td>" + lobby.name + "</td>";
			html += "</tr>";
		}
		
		$(".game-list").html(html);
	},
	
	joinMatch: function(e){
		console.log("ASDFDFASDf");
	},
	
	hostMatch: function(e){
		console.log("asdfasdf");
	}
	
	
}