/*
	Code by Joey Lemberg
	February 6, 2015
	Copyright Yang Canvas LLC
*/

var ctx;

var Game = {
	state: "aiming",
	players: [],
	turn: 0,
	map: null,
	timeLimit: 30,
	clock: 30,
	clockStart: 0,
	interval: 0,
	g: 0.2,
	init: function(){
		ctx = $("#game-ctx")[0].getContext("2d");
		Map.generate();
		Map.drawBG();
		Input.init();
		Panels.init();
		this.animateLoop();
	},
	getTank: function(){
		return Tanks.units[this.turn];
	},
	animateLoop: function(){
		this.loop();
		requestAnimationFrame(_.bind(this.animateLoop, this));
	},
	loop: function(){
		this.moveThings();
		this.drawThings();
	},
	moveThings: function(){
		Tanks.move();
		Weapons.move();
		if(Weapons.booms.length == 0){
			Map.move();
		}
		Panels.move();
		if(this.state == "firing"){
			if(!Weapons.shots.length && !Weapons.booms.length){
				Game.turn = (Game.turn + 1)%2;
				this.state = "aiming";
				Input.activate();
				Panels.resetClock();
			}
		}
	},
	drawThings: function(){
		ctx.clearRect(0,0,1000,600);
		Map.draw();
		Tanks.draw();
		Weapons.draw();
		Panels.draw();
		Input.draw();
	},
	fire: function(shotData){
		this.state = "firing";
		Input.deactivate();
		Panels.clearClock();
		Weapons[shotData.weapon].init(shotData);
	}

}