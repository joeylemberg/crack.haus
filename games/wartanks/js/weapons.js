var Weapons = {
	detectImpact: function(b){
		var impact = null;
		if(b.x < 1 || b.x > 999 || b.y > 600 || b.y > Map.slices[Math.round(b.x)]){
					Game.ctx['sprite'].beginPath();
					Game.ctx['sprite'].fillStyle = 'brown';	
					Game.ctx['sprite'].fillRect(b.x-4,b.y-6,8,10);
					
					impact = {x: b.x, y: b.y};
					
					
					
					
				}
				return impact;
	},
	boom: function(x, y, size, type){
		var boom = {
			x: x,
			y: y,
			r: 0,
			size: size,
			type: type,
			state: "expanding"
		}
		Map.booms.push(boom);
	}
};