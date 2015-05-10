// Blue Ice
// author Joey Lemberg
// May 9, 2015
// for crack.haus, all rights reserved
// joeylemberg@gmail.com

var p0 = {x: 400, y: 200, dx: 0, dy: 0, r: 40, mass: 40, color: "blue"};
var p1 = {x: 400, y: 600, dx: 0, dy: 0, r: 40, mass: 40, color: "red"};
var puck = {x: 500, y: 250, dx: 2, dy: 0, r: 20, mass: 15, color: "black"};
var rink = {w: 900, h: 400, r: 50, margin: 50};
var me = p0;
var him = p1;
var things = [p0,p1,puck];

var Game = {
	
	state: "new",
	
	init: function(){
		
		if(playerId == 1){
			me = p1;
			him = p0;
			Game.resetPuck();
		}
		
		
		Game.initHtml();
		Input.init();
		Game.loop();	
	},
	
	resetPuck: function(){
		puck.free = false;
		puck.hit = true;
			puck.x = 500;
			puck.y = 250;
			puck.dx = -1 + Math.random() * 2;
			puck.dy = -1 + Math.random() * 2;
	},
	
	onMessage: function(data){
		
		var data = JSON.parse(data);
		for(var k in data.player){
			him[k] = data.player[k]
		}
		if(data.puck){
			for(var k in data.puck){
				puck[k] = data.puck[k];
			}
		}
		
	},
	
	initHtml: function(){
		$("body").html("<div id='game-wrapper'></div>");
		Game.canvas = document.createElement("canvas");
		Game.canvas.width = 1000;
		Game.canvas.height = 500;
		$(Game.canvas).css("background-color", "#d1f8ff");
		Game.ctx = Game.canvas.getContext("2d");
		$("#game-wrapper").append(Game.canvas);
	},
	
	loop: function(){
		Game.move();
		Game.draw();
		requestAnimationFrame(Game.loop);
		
		
		
		if(puck.hit){
			puck.hit = false;
			lobby.send("gameData", JSON.stringify({
				puck: puck,
				player: me
			}));
		}else{
			lobby.send("gameData", JSON.stringify({
				player: me
			}));
		}
		puck.hit = false;
		
	},
	
	speedLimit: 60,
	
	move: function(){
		//puck.t--;
		//Game.moveMe();
		//Game.movePuck();
		
		
		var dx = Input.x - me.x;
		var dy = Input.y - me.y;
		
		dx *= 0.7;
		dy *= 0.7;
		
		var d = Util.dist(Input, me);
		
		if(d > Game.speedLimit){
			dx *= Game.speedLimit / d;
			dy *= Game.speedLimit / d;
			d = Game.speedLimit;
		}
		
		me.dx = dx;
		me.dy = dy;
		
		if(me.x - me.r < 50){
			me.x = 51 + me.r;
			me.dx = 0;
		}
		if(me.x + me.r> 950){
			me.x = 949 - me.r;
			me.dx = 0;
		}
		if(me.y - me.r < 50){
			me.y = 51 + me.r;
			me.dy = 0;
		}
		if(me.y + me.r> 450){
			me.y = 449 - me.r;
			me.dy = 0;
		}
		
		var frames = 20;
		
		//Util.collide0(me, puck);
		
		for(var i = 0; i < frames; i++){
			if(Util.dist(me, puck) < me.r + puck.r){
				Util.collide(me, puck);
				puck.hit = true;
			}
			me.x += me.dx/frames;
			me.y += me.dy/frames;
			puck.x += puck.dx/frames;
			puck.y += puck.dy/frames;
			
			
		}
		
		
		
		
		
		//me.x += me.dx;
		//me.y += me.dy;
		
		Game.fitInRink(me);
		
		if(playerId == 0 && me.x + me.r > 500){
			me.x = 500 - me.r;
		}
		
		if(playerId == 1 && me.x - me.r < 500){
			me.x = 500 + me.r;
		}
		
		
		puck.dx *= 0.99;
		puck.dy *= 0.99;
		
		//if(puck.x < rink.margin){
			
		//}
		
		if((puck.x - puck.r < 50 || puck.x + puck.r > 950) && puck.y + puck.r > 200 + puck.r && puck.y - puck.r < 300 - puck.r){
			puck.free = true;
		}
		
		if(puck.x < -100 || puck.x > 1100 || puck.y < -100 || puck.y > 600 ){
			if(playerId == 1){
				Game.resetPuck();
			}
			
		}
		
		if(puck.free){
			return;
		}
		
		
		
		if(puck.x - puck.r < 50){
			puck.x = 51 + puck.r;
			if(puck.dx < 0){
				puck.dx *= -0.9;
			}
		}
		if(puck.x + puck.r> 950){
			puck.x = 949 - puck.r;
			if(puck.dx > 0){
				puck.dx *= -0.9;
			}
		}
		
		if(puck.y - puck.r < 50){
			puck.y = 51  + puck.r;
			if(puck.dy < 0){
				puck.dy *= -0.9;
			}
		}
		if(puck.y + puck.r> 450){
			puck.y = 449 - puck.r;
			if(puck.dy > 0){
				puck.dy *= -0.9;
			}
		}
		
		
		
		//Game.fitInRink(puck);
		
		//Game.movePuck();
		
		/*p0.speed = Util.speed(p0);
		p1.speed = Util.speed(p1);
		puck.speed = Util.speed(puck);
		
		var frames = Math.max(puck.speed, Math.max(p0.speed, p1.speed));
		
		for(var i = 0; i < things.length; i++){
			var a = things[i];
			for(var j = 0; i < things.length; i++){
				if(i == j){
					continue;
				}
				var b = things[j];
				if(Util.dist(a, b) < a.r + b.r){
					a.x += a.r + b.r + 10;
					return;
				}
			}
			a.x += a.dx/frames;
			a.y += a.dy/frames;
		}*/
		
	},
	
	moveMe: function(){
		var dx = Input.x - me.x;
		var dy = Input.y - me.y;
		
		var d = Util.dist(Input, me);
		
		if(d > Game.speedLimit){
			dx *= Game.speedLimit / d;
			dy *= Game.speedLimit / d;
			d = Game.speedLimit;
		}
		
		me.dx = dx;
		me.dy = dy;
		
		me.x += me.dx;
		me.y += me.dy;
		
		Game.fitInRink(me);
		
		
		
		/*var frames = Math.ceil(Util.speed(me));
		if(!frames){
			return;
		}
		
		var fdx = dx / frames;
		var fdy = dy / frames;
		var pdx = puck.dx / frames;
		var pdy = puck.dy / frames;
		
		for(var i = 0; i < frames; i++){
			if(puck.t < 0 && Util.dist(me, puck) < me.r + puck.r){
				Util.collide(me, puck);
				puck.t = 5;
				puck.x += puck.dx;
				puck.y += puck.dy;
				return;
			}
			me.x += fdx;
			me.y += fdy;
			puck.x += pdx;
			puck.y += pdy;
		}*/
	},
	
	movePuck: function(){
		
		puck.x += puck.dx;
		puck.y += puck.dy;
		
		var x1 = puck.x + puck.dx;
		var y1 = puck.y + puck.dy;

		if(x1 - puck.r < rink.margin){
			x1 = rink.margin + puck.r;
			puck.dx *= -1;
		}
		if(x1 + puck.r > rink.w + rink.margin){
			x1 = rink.w + rink.margin - puck.r;
			puck.dx *= -1;
		}
		if(y1 - me.r < rink.margin){
			y1 = rink.margin + puck.r;
			puck.dy *= -1;
		}
		if(y1 + me.r > rink.h + rink.margin){
			y1 = rink.h + rink.margin - puck.r;
			puck.dy *= -1;
		}

		/*var d = Ice.dist(x1, y1, Ice.p0.x, Ice.p0.y);
		if(d < puck.r + Ice.p0.r){
			return;
		}*/
		puck.x = x1;
		puck.y = y1;
	},
	
	fitInRink: function(a){
		if(a.x - a.r < rink.margin){
			a.x = rink.margin + a.r;
			a.dx *= -1;
		}
		if(a.x + a.r > rink.w + rink.margin){
			a.x = rink.w + rink.margin - a.r;
			a.dx *= -1;
		}
		if(a.y - a.r < rink.margin){
			a.y = rink.margin + a.r;
			a.dy *= -1;
		}
		if(a.y + a.r > rink.h + rink.margin){
			a.y = rink.h + rink.margin - a.r;
			a.dy *= -1;
		}
	},
	
	draw: function(){
		
		var ctx = Game.ctx;
		ctx.clearRect(0,0,1000,500);
		
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.strokeStyle= "#5e4a70";
		ctx.moveTo(100,50);
		ctx.lineTo(900,50);
		ctx.arc(900, 100, 50, Math.PI*1.5, Math.PI*2, 0);
		ctx.lineTo(950, 200);
		ctx.moveTo(950, 300);
		ctx.arc(900, 400, 50, 0, Math.PI*0.5, 0);
		ctx.lineTo(100,450);
		ctx.arc(100, 400, 50, Math.PI*0.5, Math.PI, 0);
		ctx.lineTo(50,300);
		ctx.moveTo(50,200);
		ctx.arc(100, 100, 50, Math.PI, Math.PI*1.5, 0);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "#59b7f2";
		ctx.fillStyle = "#59b7f2";
		ctx.lineWidth = 10;
		ctx.arc(500, 250, 65, 0, Math.PI*2, 1);
		
		ctx.moveTo(250,50);
		ctx.lineTo(250,450);
		
		ctx.moveTo(750,50);
		ctx.lineTo(750,450);
		
		ctx.moveTo(500,50);
		ctx.lineTo(500,450);
		ctx.stroke();
		
		
		ctx.beginPath();
		ctx.fillStyle = p0.color;
		ctx.arc(p0.x, p0.y, p0.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = p1.color;
		ctx.arc(p1.x, p1.y, p0.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = puck.color;
		ctx.arc(puck.x, puck.y, puck.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		if(puck.free){
			ctx.fillStyle= "rgba(200,0,0,0.5)";
			ctx.fillRect(0,0,1000,500);
		}
		
		
	}
	
	
}