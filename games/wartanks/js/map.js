var Map = {
	leaf: {r:50 + Math.ceil(131 * Math.random()) , g: 50 + Math.ceil(131 * Math.random()), b: 3},
	autumn: Math.random(),
	slices: [],
	shots: [],
	booms: [],
	makeMap: function(){
		Map.slices = [];
		
		var level = 10 + Math.random()*580;
		var dl = -(level-300)/80 * Math.random();
		
		for(var i = 0; i < 1000; i++){
			Map.slices.push(level);
			level += Math.random() - 0.5 + dl;
			dl += Math.random()*0.4 - 0.2;
			if(level > 550){
				dl -= 0.1;
			}
			if(level < 150){
				dl += 0.1;
			}
			if((i%100 > 45 && i < 55)){// && (i > 200 && i < 800)){
				dl*=(1 + Math.random() * 0.01);
			}
			dl *= 0.99;
		}
		console.log("Map generated");
	},
	drawMap: function(ctx){
		
		ctx.beginPath();
		ctx.clearRect(0,0,1000,600);
		ctx.fillStyle = '#09560e';
		
		var s;
		for(var i = 0; i < Map.slices.length; i++){
		
				s = Map.slices[i]
				ctx.fillRect(i-1, s, 3, 600-s);
		}
	},
	moveBoom: function(b){
		if(b.r < b.size){
			b.r += 1;
		}
	},
	drawBoom: function(b){
		var ctx = Game.ctx['sprite'];
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "rgba(200,25,25,0.7)";
		ctx.translate(b.x,b.y);
		ctx.arc(0,0,b.r,0,6.3,1);
		ctx.fill();
		ctx.restore();
	}
	
};