var warTanks = {

	state: "intro",

	init: function(){
		$("body").append($("<div id='tanks-intro' style='height:100%;width:100%;z-index:999999999;position:fixed;top:0;left:0;background-color:white;'><canvas style='width:100%;height:100%;' width='800' height='500'></canvas></div>"));
		warTanks.playIntro();
		warTanks.handshake();
		
	},

	buildHtml: function(){

	},

	handshake: function(){
		setTimeout(function(){
			
			warTanks.setUpGame();

		}, 7500);
	},

	playIntro: function(){
				warTanks.t = 0;
				warTanks.introCtx = $("#tanks-intro>canvas")[0].getContext("2d");
		warTanks.introCtx.fillStyle = "black";
		warTanks.interval = setInterval(warTanks.introFrame, 20);
	},

	introFrame: function(){
		warTanksIntro();
	},

	setUpGame: function(){
		warTanks.state = "setUp";
		Map.drawBG();
		Map.init();
		if(playerId == 0){
			Map.generate();
			lobby.send({
				type: "map",
				slices: Map.slices
			});
			warTanks.state = "myTurn";
			Game.init();
			Game.animateLoop();
		}else{
			warTanks.state = "hisTurn";
		}

		lobby.send({
				type: "tag",
				id: playerId,
				tag: lobby.tag
			});

		Tanks.units[playerId].name = lobby.tag;

		Game.turn = 0;
		//Panels.init();
		//warTanks.startLoop();
	},

	onMessage: function(data){

		switch(data.type){

			case "tag":
				Tanks.units[data.id].name = data.tag;
				break;

			case "map":
				Game.init();
				Map.init();
				Map.slices = data.slices;
				Game.animateLoop();

				Map.dirty = true;

				setTimeout(function(){
					Map.draw(true);
				}, 1000);

				console.log("good slices");
				break;

			case "turn":
				warTanks.endTurn(data);
				break;

			case "tank":
				Tanks.units[data.tank.id] = data.tank;
				break;
		}

	},

	startLoop: function(){
		console.log("starting loop");
		warTanks.interval = setInterval(warTanks.loop, 20);
	},

	loop: function(){
		warTanks.moveThings();
		warTanks.drawThings();
	},

	moveThings: function(){
		Tanks.move();
		Panels.move();
		Weapons.move();
		warTanks.checkState();
	},

	checkState: function(){

				if(Game.round >= 11){
						//warTanks.gameOver();
						warTanks.state = "gameOver";
						return;
				}

		switch(warTanks.state){
			case "myTurnEnd":
			case "hisTurnEnd":
				if(!Weapons.shots.length && !Weapons.booms.length && !Map.dirty && !Trees.dirty){

					
					
					Panels.resetClock();


					Game.round += 0.5;

					
					if(warTanks.state == "myTurnEnd"){
						warTanks.state = "hisTurn";
					}else{
						warTanks.state = "myTurn";
						Tanks.units[playerId].gas = Math.min(Tanks.units[playerId].gas + 10, 100);
						Input.activate();
						Input.draw();
					}
					Game.turn = (Game.turn + 1) % 2;

				}
				break;
		}
	},

	drawThings: function(){
		ctx.clearRect(0,0,Map.w, Map.h);
		Map.draw();
		Tanks.draw();
		Panels.draw();
		Weapons.draw();
	},

	endTurn: function(data){
		//if(warTanks.state == "myTurn"){
//			lobby.send(data);
//		}else{
			Tanks.units[data.tank.id] = data.tank;
			Game.fire(data.shot);
//		}
		warTanks.state = "hisTurnEnd";

		

		//Panels.clearClock();
		//var weapon = Weapons[data.shot.weapon];
		//$.proxy(weapon.init, weapon)(data.shot);

	},

	gameOver: function(){
		var p1 = Tanks.units[0];
		var p2 = Tanks.units[1];

		var message;
		var tank;

		if(p1.score > p2.score){
			tank = Tanks.units[0];
		}else if(p1.score < p2.score){
			tank = Tanks.units[1];
		}else{
			alert("No one wins!");
		}

		ctx.beginPath();
				ctx.font = "bold 24px tahoma";
				ctx.lineJoin = "round";
				ctx.textAlign = "center";
				ctx.strokeStyle = tank.stroke;
				ctx.fillStyle = tank.fill;
				ctx.font = "bold 30px tahoma";
				ctx.lineWidth = 5;
				var seed = Date.now() * Date.now();
				ctx.strokeText(tank.name + " wins !!!", 100 + seed % 13,300 + seed % 11);
				ctx.fillText(tank.name + " wins !!!", 100 + seed % 13,300 + seed % 11);

	}
}