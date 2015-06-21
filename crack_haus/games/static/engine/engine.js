define(['./player'], function (Player) {
	
return {
	
	game: null, //complete game code
	
	init: function(options){
		
		this.game = options.game;
		
		for(var i = 0; i < options.players.length; i++){
			var p = options.players[i];
			var player = this.addPlayer(p);
			player.index = i;
			if(p.tag == options.profile.tag){
				this.localPlayer = player;
			}
		}
		
		for(var i = 0; i < options.cpus.length; i++){
			var p = Match.players[i];
			var player = this.addPlayer(p);
			if(p.tag == options.profile.tag){
				this.localPlayer = player;
			}
		}
		
		this.establishConnections();
	},
	
	establishConnections: function(){
		// The host is responsible for distributing the peer_ids
		
		
		if(this.localPlayer.index == 0){
			//this is the host
			
		}
		
		
		console.log(this.localPlayer);	
	},
	
	start: function(game){
		
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
	
	moveFPS: 60,
	drawFPS: 60,
	maxLatency: 200,
	
	getTime: function(){
		return Date.now() - this.startTime;
	},
	

	
	move: function(state, commands, options){
		//overwritten for each game
		//executes a single frame of gameplay
	},
	
	draw: function(state, options){
		//overwritten for each game
		//executes a single frame of gameplay
	}
	
	
	
}});
	
	