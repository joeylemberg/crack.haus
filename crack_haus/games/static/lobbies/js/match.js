var Match = {
	
	peers: [],
	cpus: [],
	
	settings: {
		matchLength: 90,
		cpuDifficulty: "Normal",
		cpus: []
	},
	
	init: function(options){
		
		Main.clearPage();
		
		Match.peer = undefined;
		
		Match.role = options.role;
		
		Match.name = options.name;
		Match.url = options.url;
		
		Match.cpus = [];
		
		$("#lobby-title").html(Match.name);
		
		$("#lobby").html("<div class='match-room'></div><div class='match-controls'></div>");
		
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
		}else{
			$(".match-controls").append($("<div class='cancel-match button' >Exit Match</div>"));
		}
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
	
	showOutOfDate: function(){
		clearInterval(Main.interval);
		var html = "<div class='big-message'>";
		html += "<h3>Matches cannot be joined through browser navigation.</h3>";
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
		Match.send({
			type: "matchSettings",
			settings: Match.getSettingsData()
		});
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
		if(!Match.him && Match.role == "host" && players.length > 1){
		//	 Match.peer.connect(players[1].peer_id);
			Match.conn = Match.peer.connect(players[1].peer_id);
			Match.him = players[1];
			Match.listen();
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
		
		for(var i = 0; i < data.players.length; i++){
			var player = data.players[i];
			html += "<div class='match-player'>" + player.tag + "</div>";
		}
		
		for(var i = 0; i < Match.cpus.length; i++){
			html += "<div class='match-player'>CPU " + (i + 1) + "<b class='clickable boot-player' data-index='" + i + "' " + (Match.role != "host" ? " style='display:none;'" : "") + ">x</b></div>";
		}
		
		$(".match-players").html(html);
		
		//TODO reimplement settings without all the hacks
		if(Match.role == "host"){
			Match.sendSettings();
		}
		
	},
	
	getMatches: function(){
		Api.request({
		    method: "GET",
		    url: Match.url,
		    onSuccess: function (data) {
				if(History.pageType == "match"){
		        	Match.renderPlayers(data);
				}
		    }
		});
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
						profile: Profile
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
		if(Match.conn){
			Match.conn.send(JSON.stringify(data));
		}
		
	},
	
	cancelMatch: function(){
		history.go(-1);
	}
	
};