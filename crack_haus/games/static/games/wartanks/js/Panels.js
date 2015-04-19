var Panels = {

	init: function(){
		this.resetClock();
	},

	resetClock: function(){
		Game.clockStart = Date.now();
		Game.clock = 30;
		$("#game-clock").show();
	},

	move: function(){
		Game.clock = Game.timeLimit - Math.round((Date.now() - Game.clockStart)/1000);
		if(Game.clock < 1 && Input.active){
			Tanks.fire();
		}
	},

	draw: function(){
		
		this.drawClock();
		this.drawScores();

		for(var i = 0; i < Tanks.units.length; i++){
			var tank = Tanks.units[i];
			$(".player-panel[data-player-id='" + tank.id + "']").find(".meter").css("width", Math.round(tank.gas) + "%");
		}

	},

	clearClock: function(){
		$("#game-clock").hide();
	},

	drawClock: function(){

		$("#game-clock").html(Game.clock + "<br/>" + warTanks.state);

		/*ctx.save();
		ctx.beginPath();
		ctx.font = "bold 28px sans-serif";
		ctx.textAlign = "center";
		ctx.lineJoin = "round";
		ctx.strokeStyle = Tanks.units[Game.turn].stroke;
		ctx.fillStyle = Tanks.units[Game.turn].fill;
		ctx.lineWidth = 6;
		ctx.strokeText(Game.clock, Map.w/2,50);
		ctx.fillText(Game.clock, Map.w/2,50);
		ctx.restore();*/
	},

	drawScores: function(){

		$("#p1_score").html(Tanks.units[0].score);
		$("#p2_score").html(Tanks.units[1].score);

		/*for(var i = 0; i < Tanks.units.length; i++){
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
		}*/
	}



}