/*
	Code by Joey Lemberg
	February 6, 2015
	Copyright Yang Canvas LLC
*/

var ctx;

var Game = {
	state: "firing",
	players: [],
	turn: -1,
	map: null,
	timeLimit: 30,
	clock: 30,
	clockStart: 0,
	interval: 0,
	g: 0.2,
	init: function(){
		ctx = $("#game-canvas")[0].getContext("2d");
		Tanks.units[0].x = 100 + Math.random()*100;
		Tanks.units[1].x = Map.w - (100 + Math.random()*100);
		Map.init();
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
		//requestAnimationFrame(_.bind(this.animateLoop, this));
		setTimeout(_.bind(this.animateLoop, this), 30);
	},
	loop: function(){
		this.moveThings();
		this.drawThings();
	},
	moveThings: function(){
		Tanks.move();
		Weapons.move();
	//	if(Weapons.booms.length == 0){
			Map.move();
	//	}
		Panels.move();
		if(this.state == "firing"){
			if(!Weapons.shots.length && !Weapons.booms.length && !Map.dirty && !Trees.dirty){
				for(var i = 0; i < Tanks.units.length; i++){
					if(!Tanks.units[i].grounded){
						return;
					}
				}
				for(var i = 0; i < Map.trees.length; i++){
					var tree = Map.trees[i];
					var treeSlices = Map.slices[Math.round(tree.branches[0].base.x)];
					var treeY = treeSlices.length ? treeSlices[0].top : Map.h;
					if(tree.branches[0].base.y < treeY){
						Trees.dirty = true;
						return;
					}
				}
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