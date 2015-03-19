var Panels = {

	init: function(){
		this.resetClock();
		$("#tanks").append("<div id='fire'>FIRE</div>");
		$("#tanks").append("<select id='weapon-select'><option>shell</option><option>1-2-punch</option><option>mine shaft</option></select>");
		$("#tanks").append("<input id='power' type='number' min='1' max='100' value='70'/>");
		$("#tanks").append("<input id='angle' type='number' min='0' max='359' value='270'/>");

		$("#tanks>#fire").click(Panels.fire);

		$("#tanks>input").change(function(){
			var tank = Tanks.units[playerId];
			tank.turret = $("#tanks>#angle").val() / 180 * Math.PI;;
			tank.power = $("#tanks>#power").val();
		});
		
	},

	resetClock: function(){
		Game.clockStart = Date.now();
		Game.clock = 30;
	},

	clearClock: function(){
		Game.clock = 0;
	},

	move: function(){
		if(warTanks.state != "myTurn" && warTanks.state != "hisTurn"){
			return;
		}

		Game.clock = Math.max(0, Game.timeLimit - Math.round((Date.now() - Game.clockStart)/1000));
		if(!Game.clock && warTanks.state == "myTurn"){
			Panels.fire();
		}
		if(warTanks.state == "myTurn"){
			$("#tanks>#fire").addClass("active");
		}else{
			$("#tanks>#fire").removeClass("active");
		}
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

		if(warTanks.state != "myTurn" && warTanks.state != "hisTurn"){
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