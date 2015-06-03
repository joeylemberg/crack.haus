var Match = {
	
	init: function(options){
		console.log(options);
		Match.name = options.name;
		Match.url = options.url;
		
		$("#lobby-title").html(Match.name);
		
		$("#lobby").html("<div class='match-room'></div>");
		
		$(".match-room").append($("<div class='match-room-title'>" + Game.name + " Match</div>"));
		
		var html = "<table><tr>";
		html += "<td><b>Players</b> <div class='add-cpu thin-button' >Add CPU</div>";
		html += "<td><b>Settings</b></td>";
		html += "</tr><tr>";
		html += "<td><div class='match-players'></td>";
		html += "<td><div class='match-settings'></td>";
		html += "</tr><tr>";
		html += "<td><b>Chat</b></td>";
		html += "</tr><tr>";
		html += "<td colspan='2'><div class='match-chat'></div></td>";
		html += "</tr><tr>";
		html += "<td colspan='2'><input class='match-chat-input' /><div class='send-match-chat button'>Send</td>";
		html += "</tr></table>";
		
		
		$(".match-room").append(html);
		
		$(".match-room").after($("<div class='start-match button' >Start Match</div>"));
		$(".start-match").after($("<div class='cancel-match button' >Cancel Match</div>"));
        //$(".host-a-match").click(lobby.hostMatch);
		
		
		//$("#lobby").on("click", ".open-match", Game.joinMatch);
		//$("#lobby").on("click", ".host-a-match", Game.hostMatch);
		//Match.joinAsHost();
		//Match.getPlayers();
		
		Match.joinMatch();
	},
	
	joinMatch: function(){
		if(!Match.peer){
			Match.peer = new Peer({key: 'j12fo2q0wvwvcxr'});
		}
		
		if(Match.peer && Match.peer.id){
			console.info("peer_id: " + Match.peer.id);
			Match.createPlayer();
		}else{
			console.info("Waiting for peer_id");
			setTimeout(Match.joinMatch, 100);
		}
	},
	
	createPlayer: function(){
			
		Api.request({
		    method: "POST",
		    url: "api/players/",
			data: {
			    	"peer_id": Match.peer.id,
			    	"tag": Profile.tag,
			    	"score": 0,
                    "result": "",
                    "team": null,
                    "match": Match.url
			},
		    onSuccess: function (data) {
				Match.getPlayers();
		    }
		});
	},
	
	getPlayers: function(){
			Api.request({
		    method: "GET",
		    url: Match.url,
		    onSuccess: function (data) {
		        Match.renderMatch(data);
		    }
		});
	},
	
	renderMatch: function(data){
		
		console.log("WOLOLO");
		console.log(data);
		
		var player;
		
		var html = "";
		
		for(var i = 0; i < data.players.length; i++){
			var player = data.players[i];
			html += "<div class='match-player'>" + player.tag + "</div>";
		}
		
		$(".match-players").html(html);
		
	},
	
	getMatches: function(){
		Api.request({
		    method: "GET",
		    url: Match.url,
		    onSuccess: function (data) {
		        Match.renderPlayers(data);
		    }
		});
	},
	
	renderPlayers: function(data){
		console.log("wololo");
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
	
	hostMatch: function(e){
		Api.request({
		    method: "POST",
		    url: "api/matches/",
			data: {
                "name": Profile.tag + "'s game" ,
                "game": Game.id,
				"state": "j"
            },
		    onSuccess: function (data) {
				Match.init(data);
		    }
		});
	}
	
}