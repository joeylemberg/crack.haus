define(
	
	function(){
		
		return {
		
			arena: {},
			sprites: [],
			players: {},
			
			newGameState: function(players, options){
				//called by the host to establish the initial state,
				//which is then distributed to other players
				this.randomSeed = Util.generateRandomSeed();
				this.players = {};
				_.each(players, _.bind(this.setUpPlayer, this));
			},
			
			getPlayerData: function(){
				var players = {};
				for(var tag in players){
					var p = players[tag];
					players[tag] = {
						color: p.color,
						theta: p.theta,
						x: p.x,
						y: p.y
					};
				}
				return players;
			},
			
			setUp: function(setUpData){
				console.log(setUpData);
				this.players = setUpData.players;
				Util.setRandomSeed(setUpData.randomSeed);	
			},
			
			getSetUpData: function(){
				return {
					type: "setUpData",
					players: this.players,
					randomSeed: this.randomSeed
				};
			},
			
			setUpPlayer: function(player){
				this.players[player.tag] = {
					color: player.color,
					theta: Util.random() * (Math.PI * 2),
					x: 300 + 400 * Util.random(),
					y: 300 + 400 * Util.random()
				};
			},
			
			move: function(state, playerInput){
				//execute a frame of gameplay
			},
			
			draw: function(state){
				//draw the game state
			}
		}
		});