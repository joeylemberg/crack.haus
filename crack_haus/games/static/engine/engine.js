define(['./player'], function (Player) {
	
return {
	
	game: null, //complete game code
	
	init: function(matchData){
		
		this.game = matchData.game;
		
		if(matchData.isHost){
			this.isHost = true;
			this.players = matchData.players;
			this.settings = matchData.settings;
			this.establishConnections();
			this.setUpGame();
		}else{
			this.isHost = false;
			this.awaitHostMsg(matchData.connection);
		}
		
		window.engine = this;
		window.game = this.game;
		
	},
	
	awaitHostMsg: function(conn){
		var me = this;
		conn.off("data");
		conn.on("data", function(str){
			console.log(str);
			var data = Util.tryParse(str);
			console.log(data);
			if(!data || typeof data != "object"){
				console.log("Invalid data recieved from peer: " + str);
				return;
			}
			switch(data.type){
				case "setUpData":
					me.players = data.players;
					me.players[0].connection = conn;
					me.settings = data.settings;
					me.trueState = _.bind(me.game.setUp, me.game)(data.gameSetUpData);
					conn.send(JSON.stringify({
						type: "setUpDataReciept",
						ready: true,
						sender: Profile.tag,
						time: Date.now()
					}));
					break;
					
				case "startGame":
					me.startGame();
					break;
			}
		});
	},
	
	isHost: function(){
		return this.localPlayer && this.localPlayer.index == 0;
	},
	
	establishConnections: function(){
		// The host is responsible for distributing the peer_ids
		
		this.localPlayer = _.find(this.players, function(player){
			return player.tag == Profile.tag;
		});
		
		_.each(this.players, function(player){
			if(player.connection){
				//player.connection.off("data");
				player.ready = false;
			}else{
				player.ready = true;
			}
		});
		
	},
	
	listen: function(){
		var me = this;
		_.each(this.players, function(player){
			if(player.connection){
				//player.connection.off("data");
				player.connection.off("data");
				player.connection.on("data", function(str){
					console.log(str);
					var data = Util.tryParse(str);
					console.log(data);
					if(!data || typeof data != "object"){
						console.log("Invalid data recieved from peer: " + str);
						return;
					}
					switch(data.type){
						case "setUpDataReciept":
							var sender = _.findWhere(me.players, {tag: data.sender});
							sender.ready = true;
							if(_.every(me.players, function(p){ return p.ready; })){
								me.send({type: "startGame"});
								me.startGame();
							}
							break;
					}
				});
			}
		});
	},
	
	getPlayersData: function(){
		var players = [];
		_.each(this.players, function(player){
			var p = $.extend({}, player);
			p.connection = undefined;
			players.push(p);
		});
		return players;
	},
	
	setUpGame: function(){
		this.game.newGameState(this.players, this.settings);
		this.listen();
		var setUpMsg = {
			type: "setUpData",
			settings: this.settings,
			players: this.getPlayersData(),
			gameSetUpData: this.game.getSetUpData()
		};
		this.send(setUpMsg);
		this.trueState = this.game.setUp(setUpMsg.gameSetUpData);
	},
	
	send: function(msg, recipients){
		console.log("sending");
		console.log(msg);
		msg.sendTime = Date.now();
		msg.sender = Profile.tag;
		_.each(this.players, function(player){
			if(player.connection && (!recipients || recipients.indexOf(player.tag) != -1)){
				player.connection.send(JSON.stringify(msg));
			}
		});
	},
	
	startGame: function(game){

		this.localState = this.trueState;

		this.log = [];
		this.startTime = Date.now();
		
		this.game.setUpHtml($("#lobby"));

		setInterval(_.bind(this.move, this), this.moveTime);
		this.drawLoop();
		//requestAnimationFrame();
		//setInterval(_.bind(this.draw, this), this.drawTime);
	},
	
	addPlayer: function(p){
		var player = Player.init(p);
		this.players.push(player);
		return player;
	},
	
	log: [],
	startTime: 0,
	trueState: {},
	localState: {},
	players: [],
	
	moveTime: 20,
	//drawTime: 20,
	//moveFPS: 60,
	//drawFPS: 60,
	maxLatency: 200,
	
	getTime: function(){
		return Date.now() - this.startTime;
	},
	
	drawLoop: function(){
		var me = this;
		requestAnimationFrame(function(){
			_.bind(me.draw, me)(me.localState);
			_.bind(me.drawLoop, me)();
		});
	},
	
	move: function(state, commands, options){
		//overwritten for each game
		//executes a single frame of gameplay
	},
	
	draw: function(state, options){
		this.game.draw(state);
		//overwritten for each game
		//executes a single frame of gameplay
	}
	
	
	
}});
	
	