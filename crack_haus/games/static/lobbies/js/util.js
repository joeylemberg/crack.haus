var Util = {
	
	loaderHtml: function(){
		return '<img src="/static/lobbies/img/loader.gif">';
	},
	
	dist: function(a,b){
		var dx = a.x - b.x;
		var dy = a.y - b.y;
		return Math.sqrt(dx*dx + dy*dy);
	},
	
	speed: function(a){
		return Math.sqrt(a.dx*a.dx + a.dy*a.dy);
	},
	
	force: function(a,b){
		var aTheta = Math.atan2(a.dy, a.dx);
		var aDir = Math.atan2(a.y - b.y, a.x - b.x);//a.x,,b.x,b.y);
		var ang = (aTheta - aDir) + Math.PI;
		if(ang > Math.PI * 2){
			ang -= Math.PI * 2;
		}
		var mag = Math.cos(ang) / 5;
		
		var d = Util.dist(a,b);
		
		var v0 = {
			x: (b.x - a.x) / d,
			y: (b.y - a.y) / d
		};
		
		return {
			x: mag * v0.x * Util.speed(a) * a.mass / 5,
			y: mag * v0.y * Util.speed(a) * a.mass / 5
		};
	},
	
	collide: function(a,b){
		
		/*if(a.dx * b.dx > 0 && a.dy * b.dy > 0){
			Util.spread(a,b);
			return;
		}*/
		
		
		
		
		//b.x -= b.dx;
		//b.y -= b.dy;
		
		
		var fa = Util.force(a,b);
		var fb = Util.force(b,a);
		
		b.dx = (-fb.x + fa.x);
		b.dy = (-fb.y + fa.y);
		
		Util.spread(a,b);
		
		return;
		
		b.dx = (fa.x - fb.x);
		b.dy = (fa.y - fb.y);
		
		a.dx -= (fa.x - fb.x);
		a.dy -= (fa.y - fb.y);
		
		/*a.x += a.dx;
		a.y += a.dy;
		b.x += b.dx;
		b.y += b.dy;*/
		
		Util.spread(a,b);
		
		
	},
	
	spread: function(a,b){
		
		var dr = Util.speed(a) + Util.speed(b);
		var d = Util.dist(a,b);
		
			var v = {
				x: (b.x - a.x) / d,
				y: (b.y - a.y) / d
			};
			
		while(Util.dist(a,b) < a.r + b.r + 5){
			
			
			b.x += v.x / b.mass;
			b.y += v.y / b.mass;
			a.x -= v.x / a.mass;
			a.y -= v.y / a.mass;
			/*b.dx += v.x;
			b.dy += v.y;
			a.dx -= v.x;
			a.dy -= v.y;*/
			
		}
	},
	
	collide9: function(a,b){
/*		var s0 = Util.speed(a);
		//var aTheta = Math.cos(a.dx/a.dy);//, a.x + a.dx, a.y + a.dy);
		var aTheta = Math.atan2(a.dy, a.dx);
		var aDir = Math.atan2(a.y - b.y, a.x - b.x);//a.x,,b.x,b.y);
		var ang = (aTheta - aDir);
		if(ang > Math.PI * 2){
			ang -= Math.PI * 2;
		}
		var force0 = {
			x: s0 * a.mass * Math.sin(ang),
			y: -s0 * a.mass * Math.cos(ang)
		};
		
		var fx = -50 * Math.cos(ang);
		var fy = -50 * Math.sin(ang);
		b.x += fx;
		b.y += fy;
		//alert(ang);
		
		//Game.timeout = true;*/
		
		
	//	b.dx += force0.x / b.mass;
	//	b.dy += force0.y / b.mass;
		/*b.dx = force0.x / b.mass /20;
		b.dy = force0.y / b.mass /20;
		
		b.x += b.dx * 50;
		b.y += b.dy * 50;*/
		//a.dx *= -1;
		//a.dy *= -1;
		//a.x += a.dx;
		//a.y += a.dy;
	},
	
	collide3: function(a,b){
		
	//	console.log(a);
		//return;
		
		var s0 = Util.speed(a);
		
		var aTheta = Math.cos(a.dx/a.dy);//, a.x + a.dx, a.y + a.dy);
		//var aTheta = Math.atan2(a.x, a.y, a.x + a.dx, a.y + a.dy);
		var aDir = Math.atan2(a.x,a.y,b.x,b.y);

		var ang = (aTheta - aDir);
		if(ang > Math.PI * 2){
			ang -= Math.PI * 2;
		}

		var force0 = {
			x: s0 * a.mass * Math.sin(ang),
			y: s0 * a.mass * Math.cos(ang)
		};
		
	//	b.dx += force0.x / b.mass;
	//	b.dy += force0.y / b.mass;
		b.dx = force0.x / b.mass;
		b.dy = force0.y / b.mass;
		a.dx *= -1;
		a.dy *= -1;
		a.x += a.dx;
		a.y += a.dy;
		//a.dx = force0.x / a.mass;
		//a.dy -= force0.y / a.mass;
	},
	
	moveCircle: function(a, b, c){
		
	},
	
	circleCollision: function(a,b){
		
		
		var r2 = a.r*a.r + b.r*b.r;
		var ab = (a.dy * a.dy) / (a.dx * a.dx) + 1;
		var c = (a.y - b.y) - (a.x - b.x)* (a.dy/a.dx);
		var c2 = c * c;
		
		
		
		
		var xx = Math.sqrt(r2*ab - c2);
		
		var x1 = ((a.dy * a.dy) + xx) / ab + b.x;
		var x2 = ((a.dy * a.dy) - xx) / ab + b.x;
		
		if(a.x < x1 && a.x + a.dx > x1){
			return true;
		}
		
		if(a.x > x2 && a.x + a.dx < x2){
			return true;
		}
		
		console.log(x1 + "    " + x2);
		
		return false;
		
		
	},
	
	dist2: function(x0,y0,x1,y1){
		var dx = x1-x0;
		var dy = y1-y0;
		return Math.sqrt(dx*dx + dy*dy);
	}
	
	
};