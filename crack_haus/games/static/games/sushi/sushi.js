define(function(){
	
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
		
		setUpHtml: function($el){
			var html = "<canvas id='sprite-canvas' width='500' height='500'></canvas>";
			$el.html(html);
			$("#sprite-canvas").css({
				"margin-left": "auto",
				"margin-right": "auto",
				"display": "block"
			});
			var ctx = $("#sprite-canvas")[0].getContext("2d");
			this.spriteCtx = ctx;
			ctx.save();
			var gradient = ctx.createLinearGradient(0, 500, 500, 0);
			gradient.addColorStop(0, '#7c7c7c');
			gradient.addColorStop(0.1, '#595959');
			gradient.addColorStop(0.2, '#9b9b9b');
			gradient.addColorStop(0.3, '#c4c4c4');
			gradient.addColorStop(0.4, '#707070');
			gradient.addColorStop(0.5, '#999999');
			gradient.addColorStop(0.6, '#303030');
			gradient.addColorStop(0.7, '#707070');
			gradient.addColorStop(0.8, '#898989');
			gradient.addColorStop(0.9, '#9b9b9b');
			gradient.addColorStop(1, '#303030');
			ctx.fillStyle = gradient;
			ctx.globalAlpha = 0.2;
			ctx.fillRect(0,0,500,500);
			ctx.restore();
		},
		
		getPlayerData: function(){
			var players = {};
			for(var tag in players){
				var p = players[tag];
				players[tag] = {
					color: p.color,
					theta: p.theta,
					x: p.x,
					y: p.y,
					streak: null
				};
			}
			return players;
		},
		
		setUp: function(setUpData){
			console.log(setUpData);
			this.players = setUpData.players;
			Util.setRandomSeed(setUpData.randomSeed);
			var state = {
				players: this.players,
				tableTheta: 0,
				sushi: [] 
			};
			console.log(state);
			return state;
		},
		
		getSetUpData: function(){
			return {
				players: this.players,
				randomSeed: this.randomSeed
			};
		},
		
		setUpPlayer: function(player){
			this.players[player.tag] = {
				color: player.color,
				theta: Util.random() * (Math.PI * 2),
				x: 200 + 100 * Util.random(),
				y: 200 + 100 * Util.random()
			};
		},
		
		move: function(state, playerInput){
			//execute a frame of gameplay
		},
		
		draw: function(state){
			this.spriteCtx.clearRect(0,0,500,500);
			_.each(state.players, _.bind(this.drawPlayer, this));
			//draw the game state
		},
		
		drawPlayer: function(p){
			var ctx = this.spriteCtx;
			ctx.save();
			ctx.translate(p.x,p.y);
			ctx.rotate(p.theta);
			ctx.fillStyle = p.color;
			ctx.fillRect(-12,-12,24,24);
			
			
			ctx.restore();
		}
	}
});