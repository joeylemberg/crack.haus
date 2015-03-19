var Panels = {

	init: function(){
		this.resetClock();
		$("#tanks").append("<div id='fire'>FIRE</div>");

		$("#tanks>#fire").click(Panels.fire);
	},

	resetClock: function(){
		Game.clockStart = Date.now();
		Game.clock = 30;
	},

	clearClock: function(){
		Game.clock = 0;
	},

	move: function(){
		Game.clock = Math.max(0, Game.timeLimit - Math.round((Date.now() - Game.clockStart)/1000));
	},

	draw: function(){
		
		this.drawClock();
		this.drawScores();
		this.drawGas();
		this.drawControls();

	},

	drawClock: function(){
		if(!Game.clock){
			return;
		}
		ctx.save();
		ctx.beginPath();
		ctx.font = "bold 28px sans-serif";
		ctx.textAlign = "center";
		ctx.lineJoin = "round";
		ctx.strokeStyle = Tanks.units[Game.turn].stroke;
		ctx.fillStyle = Tanks.units[Game.turn].fill;
		ctx.lineWidth = 6;
		ctx.strokeText(Game.clock, Map.w/2,50);
		ctx.fillText(Game.clock, Map.w/2,50);
		ctx.restore();
	},

	drawScores: function(){

		for(var i = 0; i < Tanks.units.length; i++){
			ctx.save();
			ctx.beginPath();
			ctx.font = "bold 28px sans-serif";
			ctx.lineJoin = "round";
			ctx.strokeStyle = Tanks.units[i].stroke;
			ctx.fillStyle = Tanks.units[i].fill;
			ctx.lineWidth = 6;
			if(i == 0){
				ctx.textAlign = "left";
				ctx.strokeText(Tanks.units[i].score, 25,50);
				ctx.fillText(Tanks.units[i].score, 25,50);
			}else if(i == 1){
				ctx.textAlign = "right";
				ctx.strokeText(Tanks.units[i].score, Map.w - 25,50);
				ctx.fillText(Tanks.units[i].score, Map.w - 25,50);
			}else
			ctx.restore();
		}
	},

	drawGas: function(){

	},

	drawControls: function(){
		
	},



	fire: function(){
		if(warTanks.state == "myTurn"){
			Tanks.fire();
		}
	}



}