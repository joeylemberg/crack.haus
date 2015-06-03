var Match = {
	
	peers: [],
	
	init: function(options, role){
		
		Match.role = role;
		
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
		
		if(Match.role == "host"){
				
				$(".match-room").after($("<div class='start-match button' >Start Match</div>"));
				$(".start-match").after($("<div class='cancel-match button' >Cancel Match</div>"));
				
				$("#lobby").on("click", ".start-match", Match.startMatch);
		}
        //$(".host-a-match").click(lobby.hostMatch);
		
		$("#lobby").on("keydown", ".match-chat-input", Match.chatKeyDown);
		$("#lobby").on("click", ".send-match-chat", Match.sendChat);
		
		
		Match.peers = {};
		Match.him = null;
		Match.conn = null;
		//$("#lobby").on("click", ".open-match", Game.joinMatch);
		//$("#lobby").on("click", ".host-a-match", Game.hostMatch);
		//Match.joinAsHost();
		//Match.getPlayers();
		
		Match.joinMatch();
	},
	
	chatKeyDown: function(e){
		if(e.keyCode == 13){
				//enter
			Match.sendChat(e);	
		}	
	},
	
	sendChat: function(){
		var data = {
			msg: $(".match-chat-input").val(),
			profile: Profile
		};
		//TODO have the profiles remembers and send chats with just {msg: 'xxx', id: '123sdf'}
		Match.chat(data);
		Match.send({
			type: "chat",
			chat: data
		});
		
		$(".match-chat-input").val("");
	},
	
	chat: function(data){
		var html = "<div class='chat-line'>";
		html += "<b>" + data.profile.tag + "</b>: ";
		html += data.msg;
		$(".match-chat").append(html);
	},
	
	joinMatch: function(){
		if(!Match.peer){
			Match.peer = new Peer({key: 'j12fo2q0wvwvcxr'});
		}
		
		if(Match.peer && Match.peer.id){
			console.info("peer_id: " + Match.peer.id);
			Match.peer.on('connection', function(conn){
				console.log("WTF");
				Match.conn = conn;
				Match.listen();
			});
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
				Main.interval = setInterval(Match.getPlayers, 500);
		    }
		});
	},
	
	getPlayers: function(){
			Api.request({
		    method: "GET",
		    url: Match.url,
		    onSuccess: function (data) {
				Match.updatePlayers(data.players)
		        Match.renderMatch(data);
		    }
		});
	},
	
	updatePlayers: function(players){
		if(!Match.him && Match.role == "host" && players.length > 1){
		//	 Match.peer.connect(players[1].peer_id);
			Match.conn = Match.peer.connect(players[1].peer_id);
			 Match.him = players[1];
		Match.listen();
		}
	},
	
	addPeer: function(profile){
		
	},
	
	renderMatch: function(data){
		
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
	
	startMatch: function(){
		IceGame.init();
		Match.send({
			type: "startGame"
		});
		game = IceGame;
	},
	
	listen: function(){
		Match.conn.on("data", function(str){
			console.log(str);
			try{
				data = JSON.parse(str)
			}catch(e){
				console.log(e);
				return;
			}
	
			switch(data.type){
				case "chat":
					Match.chat(data.chat);
					break;
					
				case "startGame":
					IceGame.init();
					break;
					
				case "gameData":
					IceGame.onMessage(data);
					break;
			}
			
		});
	},
	
	send: function(data){
		console.log(data);
		Match.conn.send(JSON.stringify(data));
	}
	
}