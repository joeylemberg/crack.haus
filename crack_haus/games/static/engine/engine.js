define(['./player'], function (Player) {
	
return {
	
	init: function(options){
		
		
		
		for(var i = 0; i < options.players.length; i++){
			var p = Match.players[i];
			var player = this.addPlayer(p);
			if(p.tag == options.profile.tag){
				this.localPlayer = player;
			}
		}
	},
	
	start: function(){
		
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
	
	