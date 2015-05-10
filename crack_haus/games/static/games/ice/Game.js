// Blue Ice
// author Joey Lemberg
// May 9, 2015
// for crack.haus, all rights reserved
// joeylemberg@gmail.com

var p0 = {x: 400, y: 200, dx: 0, dy: 0, r: 40, mass: 40, fill: "blue", stroke: "black", score: 0};
var p1 = {x: 400, y: 600, dx: 0, dy: 0, r: 40, mass: 40, fill: "red", stroke: "black", score: 0};
var puck = {x: 500, y: 250, dx: 2, dy: 0, r: 20, mass: 15, color: "black", trail: []};
var rink = {w: 900, h: 400, r: 50, margin: 50};
var me = p0;
var him = p1;
var things = [p0,p1,puck];

var Game = {
	
	state: "new",
	
	timeLimit: 60,
	
	init: function(){
		
		if(playerId == 1){
			me = p1;
			him = p0;
		}
		
		Game.resetPuck();
		
		
		Game.initHtml();
		Game.start = Date.now();
		Input.init();
		Game.resize();
		$(window).resize(Game.resize);
		Game.loop();	
	},
	
	resize: function(){
		Game.w = $("#game-wrapper").width() * window.devicePixelRatio;
		Game.h = $("#game-wrapper").height() * window.devicePixelRatio;
		Game.canvas.width = Game.w;
		Game.canvas.height = Game.h;
		Game.ctx.restore();
		Game.ctx.save();
		Game.ctx.scale(Game.w/1000, Game.h/500);
	},
	
	resetPuck: function(){
		puck.free = false;
		puck.hit = true;
			puck.x = 500;
			if(Game.scorer == p0){
				puck.x += 250
			}else{
				puck.x -= 250;
			}
			Game.scorer = null;
			puck.y = 250;
			puck.dx = -1 + Math.random() * 2;
			puck.dy = -1 + Math.random() * 2;
		puck.trail = [];
		for(var i = 0; i < 10; i++){
			puck.trail.push([puck.x, puck.y]);
		}
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
		$("body").html("<div id='game-wrapper' style='width:100%;height:100%;'></div>");
		Game.canvas = document.createElement("canvas");
		Game.canvas.width = 1000;
		Game.canvas.height = 500;
		$(Game.canvas).css({
			"width": "100%",
			"height": "100%" });
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
		
		puck.trail.pop();
		puck.trail.unshift([puck.x, puck.y]);
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
		if(!puck.free && puck.x - puck.r < 50 && puck.y + puck.r > 200 + puck.r && puck.y - puck.r < 300 - puck.r){
			puck.free = true;
			Game.scorer = p1;
			p1.score++;
			setTimeout(function(){
				Game.resetPuck();
			}, 5000);
		}
		
		if(!puck.free && puck.x + puck.r > 950 && puck.y + puck.r > 200 + puck.r && puck.y - puck.r < 300 - puck.r){
			puck.free = true;
			Game.scorer = p0;
			p0.score++;
			setTimeout(function(){
				Game.resetPuck();
			}, 5000);
		}
		
		/*if(puck.x < -100 || puck.x > 1100 || puck.y < -100 || puck.y > 600 ){
			if(playerId == 1){
				
			}
			
		}*/
		
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
		
		Game.fitInRink(puck);
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
	
	drawScoreBoard: function(){
		
		var ctx = Game.ctx;
		
		ctx.save();
			ctx.beginPath();
			ctx.font = "bold 28px sans-serif";
			ctx.lineJoin = "round";
			//ctx.strokeStyle = Tanks.units[i].stroke;
			//ctx.fillStyle = Tanks.units[i].fill;
			ctx.strokeStyle = "black";
			ctx.fillStyle = "white";
			ctx.lineWidth = 6;
			
				ctx.textAlign = "center";
				var time = Math.round((Game.timeLimit * 1000 - (Date.now() - Game.start))/1000);
				if(time < 0){
					if(p0.score > p1.score){
						Game.scorer = p0;
						Game.state = "finished";
						puck.free = true;
						time = "GAME OVER";
					//	return;
					}else if(p1.score > p0.score){
						Game.scorer = p1;
						Game.state = "finished";
						puck.free = true;
						time = "GAME OVER";
				//		return;
					}else{
						time = "OVERTIME";
					}
				}
				ctx.strokeText(time, 500,40);
				ctx.fillText(time, 500,40);
				
				
			
				ctx.textAlign = "left";
				ctx.strokeStyle = p0.stroke;
				ctx.fillStyle = p0.fill;
				ctx.strokeText(p0.score, 25,40);
				ctx.fillText(p0.score, 25,40);
				
				ctx.textAlign = "right";
				ctx.strokeStyle = p1.stroke;
				ctx.fillStyle = p1.fill;
				ctx.strokeText(p1.score, 975,40);
				ctx.fillText(p1.score, 975,40);
				
				if(puck.free){
					ctx.translate(500, 250);
					ctx.scale(5,5);
					ctx.textAlign = "right";
					ctx.strokeStyle = p0.stroke;
					ctx.fillStyle = p0.fill;
					ctx.strokeText(p0.score, -20,0);
					ctx.fillText(p0.score, -20,0);
					
					ctx.textAlign = "left";
					ctx.strokeStyle = p1.stroke;
					ctx.fillStyle = p1.fill;
					ctx.strokeText(p1.score, 20,0);
					ctx.fillText(p1.score, 20,0);
				}
				

			ctx.restore();
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
		ctx.lineWidth = 3;
		ctx.fillStyle = p0.fill;
		ctx.strokeStyle = p0.stroke;
		ctx.arc(p0.x, p0.y, p0.r, 0, Math.PI*2, 1);
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p0.x, p0.y, p0.r * 0.4, 0, Math.PI*2, 1);
		ctx.fillStyle = "rgba(0,0,0,0.1)";
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillStyle = p1.fill;
		ctx.strokeStyle = p1.stroke;
		ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI*2, 1);
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p1.x, p1.y, p1.r * 0.4, 0, Math.PI*2, 1);
		ctx.fillStyle = "rgba(0,0,0,0.2)";
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillStyle = puck.color;
		ctx.arc(puck.x, puck.y, puck.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		/*for(var i = 0; i < puck.trail.length; i++){
			ctx.beginPath();
			ctx.globalAlpha = (10-i) / 10;
			ctx.fillStyle = puck.color;
			ctx.arc(puck.trail[i][0], puck.trail[i][1], puck.r, 0, Math.PI*2, 1);
			ctx.fill();
		}*/
		
		if(puck.free){
			//ctx.globalAlpha = 1 / Math.floor(Date.now() % 11);
			ctx.save();
			ctx.fillStyle = Game.scorer.fill;
			ctx.globalAlpha = (Math.round(Date.now() / 5) % 100) / 100;
			
			ctx.fillRect(0,0,1000,500);
			ctx.restore();
		}
		
		ctx.globalAlpha = 1;
		
		Game.drawScoreBoard();
	}
	
	
}