Game = {
	g: 0.05,
	ctx : {},
	Text: null,
	randomColor: function(r,g,b){
		if(!r)r=150;
		if(!b)b=150;
		if(!g)g=150;
		
		var cString = 'rgb(';
		cString += Math.round(r + (Math.random()*(225-r))) + ',';
		cString += Math.round(g + (Math.random()*(225-g))) + ',';
		cString += Math.round(b + (Math.random()*(225-b))) + ')';
		return cString;
	},
	drawBG: function(ctx){
		
		ctx.save();
			var grd = ctx.createRadialGradient(200, 600, 100, 200, 300, 900);
			grd.addColorStop(0, Game.randomColor());
			grd.addColorStop(0.2, Game.randomColor());
			grd.addColorStop(0.4, Game.randomColor());
			grd.addColorStop(0.6, Game.randomColor());
			grd.addColorStop(1, Game.randomColor());
			ctx.fillStyle = grd;
			ctx.scale(2,1);
			ctx.fillRect(0,0,2000,1000);
			ctx.restore();
	},
	MainLoop: function(){
		
	},
	Balls : [],
	moveBalls: function(){
		var b;
		for(var i = 0; i < Game.Balls.length; i++){
			b = Game.Balls[i];
			if(b){
				Game.ctx['sprite'].beginPath();
				Game.ctx['sprite'].fillStyle = 'black';	
				Game.ctx['sprite'].fillRect(b.x-1,b.y-1,3,3);
			
				b.x += b.dx;
				b.y += b.dy;
				b.dy += Game.g;
				if(b.x < 1 || b.x > 999 || b.y > 600 || b.y > Map.slices[Math.round(b.x)]){
					Game.Balls[i] = 0;
					Game.ctx['sprite'].beginPath();
					Game.ctx['sprite'].fillStyle = 'brown';	
					Game.ctx['sprite'].fillRect(b.x-4,b.y-6,8,10);
					
					var impact = {x: b.x, y: b.y};
					
					
					
					
				}
				
				
				//console.log(b.y  + "  " + Map.slices[Math.round(b.x)]);
			//	if(b.x < 1 || b.x > 999 || b.y > 600 || b.y > Map.slices[Math.round(b.x)]){
				//	b = null;
			//	}
			}
		}
	}
	
	
	
	
}