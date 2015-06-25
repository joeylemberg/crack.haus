define(['./player'], function (Player) {
	
	console.log("engine loaded");
	console.log(_);
return {
	
	game: null, //complete game code
	
	init: function(options){
		
		this.game = options.game;
		this.connections = options.connections;
		
		for(var i = 0; i < options.players.length; i++){
			var p = options.players[i];
			var player = this.addPlayer(p);
			player.type = "human";
			player.connection = options.connections[player.tag];
			player.index = i;
			if(p.tag == options.profile.tag){
				this.localPlayer = player;
			}
		}
		
		for(var i = 0; i < options.cpus.length; i++){
			var p = Match.players[i];
			var player = this.addPlayer(p);
			player.type = "cpu";
		}
		
		this.establishConnections();
	},
	
	establishConnections: function(){
		// The host is responsible for distributing the peer_ids
		
		
		if(this.localPlayer.index == 0){
			//this is the host
			for(var tag in this.connections){

			}
		}else{




		}
		
		
		console.log(this.localPlayer);

		this.start();
	},
	
	start: function(game){

		this.log = [];
		this.startTime = Date.now();

		this.game.setUp();

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
			_.bind(me.draw, me)();
			_.bind(me.drawLoop, me)();
		});
	},
	
	move: function(state, commands, options){
		//overwritten for each game
		//executes a single frame of gameplay
	},
	
	draw: function(state, options){
		//overwritten for each game
		//executes a single frame of gameplay
		this.game()
	}
	
	
	
}});
	
	