var warTanks = {

	state: "intro",

	init: function(){
		/*$("body").append($("<div id='tanks'><canvas width='800' height='500'></canvas></div>"));
		canvas = $("#tanks>canvas")[0];
		ctx = canvas.getContext("2d");
		warTanks.playIntro();*/
		warTanks.handshake();
		
	},

	buildHtml: function(){

	},

	handshake: function(){
		setTimeout(function(){
			warTanks.setUpGame();
		}, 1500);
	},

	playIntro: function(){
		warTanks.t = 0;
		ctx.fillStyle = "black";
		warTanks.interval = setInterval(warTanks.introFrame, 20);
	},

	introFrame: function(){
		warTanksIntro();
	},

	setUpGame: function(){
		warTanks.state = "setUp";
		Map.drawBG();
		Map.init();
		console.log("playerId: " + playerId);
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
		Game.turn = 0;
		//Panels.init();
		//warTanks.startLoop();
	},

	onMessage: function(data){

		console.log(data);

		switch(data.type){
			case "map":
				Game.init();
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
		switch(warTanks.state){
			case "myTurnEnd":
			case "hisTurnEnd":
				if(!Weapons.shots.length && !Weapons.booms.length){
					Panels.resetClock();
					if(warTanks.state == "myTurnEnd"){
						warTanks.state = "hisTurn";
					}else{
						warTanks.state = "myTurn";
						Input.activate();
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
		if(warTanks.state == "myTurn"){
			lobby.send(data);
		}else{
			Tanks[data.tank.id] = data.tank;
			Game.fire(data.shot);
		}
		warTanks.state += "End";

		

		//Panels.clearClock();
		//var weapon = Weapons[data.shot.weapon];
		//$.proxy(weapon.init, weapon)(data.shot);

	}
}