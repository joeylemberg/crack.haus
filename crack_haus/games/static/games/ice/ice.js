/// <reference path="../../../typings/jquery/jquery.d.ts"/>
var Ice = {
	
	init: function(){
		Ice.initCanvas();
		Ice.initInput();
		
		if(playerId == 0){
			Ice.me = Ice.p0;
			Ice.him = Ice.p1;
		}else{
			Ice.me = Ice.p1;
			Ice.him = Ice.p0;
		}
		
		Ice.startLoop();
		
	},
	
	initCanvas: function(){
		Ice.canvas = document.createElement("canvas");
		Ice.canvas.width = 1000;
		Ice.canvas.height = 500;
		$(Ice.canvas).css("background-color", "#d1f8ff");
		Ice.ctx = Ice.canvas.getContext("2d");
		$("#game-wrapper").append(Ice.canvas);
	},
	
	initInput: function(){
		Ice.mouseX = 0;
		Ice.mouseY = 0;
		$("#game-wrapper").mousemove(function(e){
			Ice.mouseX = e.pageX;// * 800 / $("#game-wrapper").width();		
			Ice.mouseY = e.pageY;// * 800 / $("#game-wrapper").height();	
		});
	},
	
	p0: {x: 400, y: 200, dx: 0, dy: 0, r: 25, color: "blue"},
	p1: {x: 400, y: 600, dx: 0, dy: 0, r: 25, color: "red"},
	puck: {x: 400, y: 400, dx: 0, dy: 0, r: 15, color: "black"},
	rink: {w: 900, h: 400, r: 50, margin: 50},
	
	dist: function(x0,y0,x1,y1){
		var dx = x1-x0;
		var dy = y1-y0;
		return Math.sqrt(dx*dx + dy*dy);
	},

	startLoop: function(){
		Ice.loop();
	},
	
	loop: function(){
		Ice.move();
		Ice.draw();
		requestAnimationFrame(Ice.loop);
	},
	
	move: function(){
		
		Ice.moveMe();
		Ice.movePuck();
		
	},

	moveMe: function(){

		var rink = Ice.rink;
		var puck = Ice.puck;
		var me = Ice.me;

		var x0 = Ice.me.x;
		var y0 = Ice.me.y;

		var x1 = Ice.mouseX;
		var y1 = Ice.mouseY;


		if(x1 - me.r < rink.margin){
			x1 = rink.margin + me.r;
		}
		if(x1 + me.r > rink.w + rink.margin){
			x1 = rink.w + rink.margin - me.r;
		}
		if(y1 - me.r < rink.margin){
			y1 = rink.margin + me.r;
		}
		if(y1 + me.r > rink.h + rink.margin){
			y1 = rink.h + rink.margin - me.r;
		}

		if(x1 < rink.margin + rink.r && y1 < rink.margin + rink.r){
			var d = Ice.dist(x1,y1,rink.margin + rink.r,rink.margin + rink.r);
			if(d > rink.r - me.r){
				var dx1 = x1 - x0;
				var dy1 = y1 - y0;
				var d1 = Ice.dist(x1,y1,x0,y0);
				var ratio = rink.margin + rink.r / d;

				x1 = rink.margin + rink.r

				x1 = x0;
				y1 = y0;
			}
		}

		if(Ice.dist(puck.x, puck.y, me.x, me.y) < me.r + puck.r){
			puck.dx = puck.x - me.x;
			puck.dy = puck.y - me.y;
		}


		Ice.me.x = x1;
		Ice.me.y = y1;
	},

	detectCorner: function(x,y,dx,dy){

		var cornX = Ice.rink.margin + Ice.rink.r;
		var cornY = Ice.rink.margin + Ice.rink.r;

		var a = 1 + (dy*dy)/(dx*dx);
		var b = -2*cornX + (2*x  - 2*cornY)*dy/dx;
		var c = cornX*cornX + cornY*cornY - Ice.rink.r + (x*x) - (2 * cornY * x)
		
	},

	movePuck: function(){

		var rink = Ice.rink;
		var puck = Ice.puck;
		puck.x += puck.dx;
		puck.y += puck.dy;

		var me = puck;
		var x1 = me.x + me.dx;
		var y1 = me.y + me.dy;

		if(x1 - me.r < rink.margin){
			x1 = rink.margin + me.r;
			me.dx *= -1;
		}
		if(x1 + me.r > rink.w + rink.margin){
			x1 = rink.w + rink.margin - me.r;
			me.dx *= -1;
		}
		if(y1 - me.r < rink.margin){
			y1 = rink.margin + me.r;
			me.dy *= -1;
		}
		if(y1 + me.r > rink.h + rink.margin){
			y1 = rink.h + rink.margin - me.r;
			me.dy *= -1;
		}

		me.x = x1;
		me.y = y1;

	},
	
	draw: function(){
		var ctx = Ice.ctx;
		
		ctx.clearRect(0,0,1000,500);

		/*ctx.beginPath();
		ctx.strokeStyle= "#5e4a70";
		ctx.fillStyle= "#5e4a70";
		ctx.beginPath();
		ctx.arc(100, 100, 55, Math.PI*1.5, Math.PI*2, 1);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(900, 100, 55, Math.PI*1.5, Math.PI*2, 1);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(900, 400, 55, Math.PI*1.5, Math.PI*2, 1);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(100, 400, 55, Math.PI*1.5, Math.PI*2, 1);
		ctx.closePath();
		ctx.fill();*/
		
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
		//ctx.fillRect(95,50,300,)
		
		//ctx.closePath();
		
		//ctx.stroke();
		
		
		
		ctx.beginPath();
		ctx.fillStyle = Ice.p0.color;
		ctx.arc(Ice.p0.x, Ice.p0.y, Ice.p0.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = Ice.p1.color;
		ctx.arc(Ice.p1.x, Ice.p1.y, Ice.p0.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = Ice.puck.color;
		ctx.arc(Ice.puck.x, Ice.puck.y, Ice.puck.r, 0, Math.PI*2, 1);
		ctx.fill();
		
		
		
		
	}
	
	
	
	
	
	
	
};