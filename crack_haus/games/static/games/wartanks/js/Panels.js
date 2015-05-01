var Panels = {

	init: function(){
		this.resetClock();
		$("input[type='number']").mouseleave(function(){
			$(this).blur();
		});
	},

	active: null,

	colorPlayers: function(){
		//applyTextShadow
		for(var i = 0; i < Tanks.units.length; i++){
			var tank = Tanks.units[i];
			var playerBox = $(".player-panel[data-player-id='" + tank.id + "']");
			Util.applyTextShadow(playerBox, tank.fill);
			playerBox.children("div").css({"color": tank.stroke, "font-weight" : "bold"});
		}
	},

	resetClock: function(){
		Game.clockStart = Date.now();
		Game.clock = 15;
		$("#game-clock").show();
		Panels.renderWeapons();
	},

	move: function(){
		Game.clock = Game.timeLimit - Math.round((Date.now() - Game.clockStart)/1000);
		if(Game.clock < 1 && Input.active){
			Input.deactivate();
			Tanks.fire();
		}
	},

	draw: function(){
		
		this.drawClock();
		this.drawScores();
		this.colorPlayers();
 
		for(var i = 0; i < Tanks.units.length; i++){
			var tank = Tanks.units[i];
			$(".player-panel[data-player-id='" + tank.id + "']").find(".meter").css("width", Math.round(tank.gas) + "%");
			$(".player-panel[data-player-id='" + tank.id + "']").find(".player-name").html(tank.name);
		}

	},

	clearClock: function(){
		$("#game-clock").hide();
	},

	drawClock: function(){
		$("#game-clock").html(Game.clock);
		$("#game-state").html(warTanks.state);
		$("#game-round").html("ROUND # <b>" +Game.round + "</b>");
		//$("#game-clock").show();

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
	},

	 renderWeapons: function(){
	 	var tank = Tanks.units[playerId];
		var weapons = tank.weapons;

		$("#weapon-list").empty();
		$("#weapon-list").removeClass("open");

		for(var i = 0; i < weapons.length; i++){
			var weapon = Weapons[weapons[i]];
			var box = $("<div data-index='" + i + "' class='listed-weapon'></div>");
			if(i != tank.weaponIndex){
				box.hide();
			}
			box.append("<span class='listed-weapon-name'>" + weapon.name + "</span>");
			$("#weapon-list").append(box);
		}

		$(".listed-weapon").click(Panels.weaponSelectClick);


	},

	weaponSelectClick: function(e){
		if($("#weapon-list").hasClass("open")){
			var w = $(e.target).closest(".listed-weapon");
			var i = parseInt(w.data("index"));
			var tank = Tanks.units[playerId];
			tank.weaponIndex = i;
			$("#weapon-list").removeClass("open");
			Panels.renderWeapons();
			return;
		}

		$(".listed-weapon").show();
		$("#weapon-list").addClass("open");

	}



}