
var Sprite = {

	move: function(){
		if(Sprite.pos[0] < 0){
			Sprite.pos[0] = 0;
		}
		if(Sprite.pos[0] > Game.level.width){
			Sprite.pos[0] = Game.level.width;
		}
		if(Sprite.pos[1] < 0){
			Sprite.pos[1] = 0;
		}
		if(Sprite.pos[1] > Game.level.height){
			Sprite.pos[1] = Game.level.height;
		}
	}

};

var Game = {

	init: function(){
		Game.ctx = $("#game-canvas")[0].getContext("2d");
		Input.initGame();
	},

	playLevel: function(level){
		Game.level = $.extend({}, level);
		Sprite.pos = [Game.level.start[0], Game.level.start[1]];

		Game.loop();
	},

	loop: function(){
		Game.move();
		Game.draw();
		requestAnimationFrame(Game.loop);
	},

	move: function(){
		Sprite.move();
	},

	draw: function(){



		Game.ctx.clearRect(0,0,500,500);



		Game.ctx.save();
		Game.ctx.scale(20,20);
		Game.ctx.translate(-Sprite.pos[0] + 12.5, -Sprite.pos[1] + 12.5);

		Game.ctx.beginPath();
		Game.ctx.strokeStyle = "black";
		Game.ctx.lineWidth = 0.075;
		Game.ctx.strokeRect(-0.5,-0.5,Game.level.width, Game.level.height);

		Game.ctx.beginPath();
		Game.ctx.fillStyle = "#c4c4c4";
		for(var i = 0; i < Game.level.width; i++){
			for(var j = 0; j < Game.level.height; j++){
				Game.ctx.fillRect(i - 0.4, j - 0.4, 0.8, 0.8);
			}	
		}

		Game.ctx.fillStyle = "green";

		Game.ctx.fillRect(Sprite.pos[0]-0.3, Sprite.pos[1]-0.3, 0.6, 0.6);

		Game.ctx.restore();
	}



}