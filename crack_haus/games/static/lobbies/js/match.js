var Match = {
	
	peers: [],
	cpus: [],
	playerLimit: 4,
	connections: {},
	
	settings: {
		matchLength: 90,
		cpuDifficulty: "Normal",
		cpus: []
	},
	
	setPlayerLimit: function(){
		//TODO add playerLimit to game data
		switch(Game.name.toLowerCase()){	
			case "blue ice":
			case "war tanks":
					Match.playerLimit = 2;
			break;
			
			case "sushi":
					Match.playerLimit = 4;
			break;
		}
	},
	
	init: function(options){
		
		Main.clearPage();
		
		Match.peer = undefined;
		
		Match.role = options.role;
		
		Match.name = options.name;
		Match.url = options.url;
		
		Match.cpus = [];
		Match.connections = {};
		
		$("#lobby-title").html(Match.name);
		
		$("#lobby").html("<div class='match-room' style='display:none;'></div><div class='match-controls' style='display:none;'></div>");
		
		$(".match-room").append($("<div class='match-room-title'>" + Game.name + " Match</div>"));
		
		var html = "<table><tr>";
		html += "<td width='50%'><b>Players</b>";
		if(Match.role == "host"){
			 html += "<div class='add-cpu thin-button' >Add CPU</div>";
		}
		html += "<td width='50%'><b>Settings</b></td>";
		html += "</tr><tr>";
		html += "<td><div class='match-players'></div></td>";
		html += "<td><div class='match-settings'></div></td>";
		html += "</tr><tr>";
		html += "<td><b>Chat</b></td>";
		html += "</tr><tr>";
		html += "<td colspan='2'><div class='match-chat'></div></td>";
		html += "</tr><tr>";
		html += "<td colspan='2'><input class='match-chat-input' /><div class='send-match-chat button'>Send</td>";
		html += "</tr></table>";
		
		$(".match-room").append(html);
		
		if(Match.role == "host"){
				$(".match-controls").append($("<div class='start-match button' >Start Match</div>"));
				$(".match-controls").append($("<div class='cancel-match button' >Cancel Match</div>"));
				$("#lobby").on("click", ".start-match", Match.startMatch);
				$("#lobby").on("click", ".add-cpu", Match.addCpu);
				$("#lobby").on("change", ".setting-input", Match.sendSettings);
				$("#lobby").append("<span class='match-loader'>Initializing match " + Util.loaderHtml() + "</span>");
		}else{
			$(".match-controls").append($("<div class='cancel-match button' >Exit Match</div>"));
			$("#lobby").append("<span class='match-loader'>Joining match " + Util.loaderHtml() + "</span>");
		}
		
		
		$(".match-room").html();
        //$(".host-a-match").click(lobby.hostMatch);
		
		$("#lobby").on("keydown", ".match-chat-input", Match.chatKeyDown);
		$("#lobby").on("click", ".send-match-chat", Match.sendChat);
		$("#lobby").on("click", ".cancel-match", Match.cancelMatch);
		$("#lobby").on("click", ".boot-player", Match.bootPlayer);
		
		
		Match.peers = {};
		Match.him = null;
		Match.conn = null;
		//$("#lobby").on("click", ".open-match", Game.joinMatch);
		//$("#lobby").on("click", ".host-a-match", Game.hostMatch);
		//Match.joinAsHost();
		//Match.getPlayers();
		
		
		Match.populateSettings();
		
		Match.joinMatch();
	},
	
	showNoHost: function(){
		clearInterval(Main.interval);
		var html = "<div class='big-message'>";
		html += "<h3>This match has been canceld by its host.</h3>";
		html += "<h3>Please host a new match or try joining a match through the game lobby.</h3>";
		html += "<div class='back-to-game-lobby button' >Back</div>";
		html += "</div>";
		$("#lobby").on("click", ".back-to-game-lobby", function(){history.go(-1);});
		$("#lobby").html(html);
	},
	
	showOutOfDate: function(){
		clearInterval(Main.interval);
		var html = "<div class='big-message'>";
		html += "<h3>You need to make request to joint this match from the game lobby.</h3>";
		html += "<h3>Please host a new match or try joining a match through the game lobby.</h3>";
		html += "<div class='back-to-game-lobby button' >Back</div>";
		html += "</div>";
		$("#lobby").on("click", ".back-to-game-lobby", function(){history.go(-1);});
		$("#lobby").html(html);
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
	
	getSettingsData: function(){
		var data = {};
		$(".match-settings").find("input, select").each(function(){
			data[$(this).data("settingName")] = $(this).val();
		});
		data.cpus = Match.cpus;
		return data;
	},
	
	sendSettings: function(){
		Match.settings = Match.getSettingsData();
		Match.send({
			type: "matchSettings",
			settings: Match.settings
		});
	},
	
	chat: function(data){
		var playerColor = "black";
		for(var i = 0; i < Match.players.length; i++){
			if(Match.players[i].tag == data.profile.tag){
				playerColor = Util.getColor(i);
				break;
			}
		}
		var html = "<div class='chat-line'>";
		html += "<b style='color:" + playerColor + ";'>" + data.profile.tag + "</b>: ";
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
		Match.players = players;
		//if(!Match.him && Match.role == "host" && players.length > 1){
		if(Match.role == "host"){
			for(var i = 0; i < players.length; i++){
				var p = players[i];
				if(p.tag != Profile.tag && !Match.connections[p.tag]){
					//TODO the peer communication interface shouldn't be based on playerLimit
				/*	if(Match.playerLimit == 2){
						Match.conn = Match.peer.connect(players[1].peer_id);
						Match.him = players[1];
						Match.listen();
					}else{*/
						Match.connections[p.tag] = Match.peer.connect(players[i].peer_id);
						Match.listen(Match.connections[p.tag]);
				//	}
					
				}
			}
			
			
		//	 Match.peer.connect(players[1].peer_id);
			
		}
	},
	
	addCpu: function(){
		Match.cpus.push("CPU");
	},
	
	bootPlayer: function(e){
		Match.cpus.pop();
		$(e.target).closest(".match-player").remove();
	},
	
	populateSettings: function(){
		
		var html = "<table><tr>";
		
			html += "<td><b>Match Length</b></td>";
			if(Match.role == "host"){
				html += "<td><input data-setting-name='matchLength' type='number' class='setting-input match-length' value='" + Match.settings.matchLength + "' /> seconds</td>";
			}else{
				html += "<td><span data-setting-name='matchLength' type='number' class='setting-input match-length'>" + Match.settings.matchLength + " seconds</span></td>";
			}
			html += "<tr/><tr>";
			html += "<td><b>CPU Difficulty</b></td>";
			if(Match.role == "host"){
				html += "<td><select data-setting-name='cpuDifficulty' class='setting-input cpu-difficulty'><option>Normal</option><option>Retarded</option><option>Expert</option></select></td>";
			}else{
				html += "<td><span data-setting-name='cpuDifficulty' class='setting-input cpu-difficulty'>" + Match.settings.cpuDifficulty + "</span></td>";
			}
			
		html += "<tr/><table>";
		
		$(".match-settings").html(html);
	},
	
	renderMatch: function(data){
		
		var player;
		
		var html = "";
		
		if(Match.role != "host" && data.players.length && data.players[0].tag == Profile.tag){
			Match.showNoHost();
			return;
		}
		
		for(var i = 0; i < data.players.length; i++){
			var player = data.players[i];
			html += "<div class='match-player'>" + Util.getColorBox(i) + " " + player.tag;
			if(player.tag == Profile.tag){
				html += "<i style='margin-left:10px;font-size:0.75em;opacity:0.7;'>(you)</i>";
			}
			html += "</div>";
		}
		
		for(var i = 0; i < Match.cpus.length; i++){
			html += "<div class='match-player'>" + Util.getColorBox(data.players.length + i) + " CPU " + (i + 1) + "<b class='clickable boot-player' data-index='" + i + "' " + (Match.role != "host" ? " style='display:none;'" : "") + ">x</b></div>";
		}
		
		if(data.players.length + Match.cpus.length > Match.playerLimit){
			html += "<h3 style='text-align:center;color:#891313;'>Only " + Match.playerLimit + " players can play in this match.</h3>";
			html += "<h4 style='text-align:center;'>Additional players will only be able to spectate the game.</h4>";
		}
		
		$(".match-loader").remove();
		
		$(".match-players").html(html);
		
		$(".match-room, .match-controls").show();
		
		//TODO reimplement settings without all the hacks
		if(Match.role == "host"){
			Match.sendSettings();
		}
		
	},
	
	startMatch: function(){
		
		history.replaceState(null, null, "/");
		$(".match-controls").remove();
		$(".match-room").html("Setting up the match " + Util.loaderHtml());
		
		if(!Match.players){
			setTimeout(Match.startMatch, 100);
			return;
		}
		
		if(Match.role == "host"){
			Match.send({
				type: "startGame"
			});
		}
		
		switch(Game.name.toLowerCase()){
			case "sushi":
				require(['./games/sushi/sushi', './engine/engine'], function (sushi, engine) {
					engine.init({
						players: Match.players,
						cpus: Match.cpus,
						profile: Profile,
						game: sushi,
						settings: Match.settings
					});
					game = sushi;
					game.engine = engine;
				});
			break;
			
			default:
				IceGame.init();
				game = IceGame;
			break;
		}
	},
	
	listen: function(connection){
		
		connection = connection || Match.conn;
		
		connection.on("data", function(str){
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
					if(Match.role == "host" && Match.playerLimit > 2){
						Match.send(data);
					}
					break;
					
				case "startGame":
					Match.startMatch();
					//IceGame.init();
					break;
					
				case "gameData":
					IceGame.onMessage(data);
					break;
					
				case "matchSettings":
					Match.settings = data.settings;
					Match.cpus = data.settings.cpus;
					Match.populateSettings();
					break;
			}
			
		});
	},
	
	send: function(data){
		if(data.type != "chat" || Match.playerLimit == 2){
			if(Match.conn){
				Match.conn.send(JSON.stringify(data));
			}
		}else{
			if(Match.role == "host"){
				for(var tag in Match.connections){
					if(data.chat.profile.tag != tag){
						Match.connections[tag].send(JSON.stringify(data));
					}
				}
			}else{
				Match.conn.send(JSON.stringify(data));
			}
		}
	},
	
	cancelMatch: function(){
		history.go(-1);
	}
	
};