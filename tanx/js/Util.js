var Util = {
	
	collisionDetect:function(v){

		var x = v.x;
		var y = v.y;
		var dx = v.dx;
		var dy = v.dy;

		var x0 = Math.round(x);
		var x1 = Math.round(x + dx);

		if(x1 < x0){
			var x2 = x0;
			x0 = x1;
			x1 =  x2;
		}

		var slice;
		var i;

		for(var i = 0; i < Tanks.units.length; i++){
			var tank = Tanks.units[i];
			if(!(v.age != undefined && v.owner != undefined && v.age < 10 && v.owner == i)){
				if(Util.dist(tank.x,tank.y,x+dx,y+dy) < 20){
					return {
						x: (x+dx + tank.x) / 2,
						y: (y+dy + tank.y) / 2
					}
				}
			}
			
		}


		// check if start is underground
		if(x0 > -1 && x0 < Map.w){
			for(i = 0; i < Map.slices[x0].length; i++){
				slice = Map.slices[x0][i];
				if(y > slice.top && y < slice.bottom){
					return {
						x: x,
						y: y
					};
				}
			}
		}
			

		// check if underground in any column moved through
		for(var i = x0; i < x1; i++){
			if(i > -1 && i < Map.w){
				for(var j = 0; j < Map.slices[i].length; j++){
					slice = Map.slices[i][j];
					if(y > slice.top && y < slice.bottom){
						return {
								x: x,
								y: y
							};
						/*if(y - dy < slice.top){
							return {
								x: i,
								y: slice.top
							};
						}else if(y - dy > slice.bottom){
							return {
								x: i,
								y: slice.bottom
							};
						}else{
							return {
								x: i,
								y: y
							};
						}*/
					}
				}
			}
			
			if(Math.abs(dx < 0.05)){
				y += dy/dx;
			}
			if(i+1 > Map.w-1){
				break;
			}
			if(y > Map.h){
				return {
						x: i,
						y: Map.h
					};
			}
		}

		for(var i = 0; i < Map.trees.length; i++){
			var tree = Map.trees[i];
			for(var j = 0; j < tree.hitBoxes.length; j++){
				var box = tree.hitBoxes[j];
				//console.log(Util.dist(b.x, b.y, box.tip.x, box.tip.y));
				if(Util.dist(x,y, box.tip.x, box.tip.y) < 10){
					impact = {x: x, y:y, target: tree};
					return impact;
				}
			}
		}

		return;

	},
	dist: function(x0,y0,x1,y1){
		var dx = x1-x0;
		var dy = y1-y0;
		return Math.sqrt(dx*dx + dy*dy);
	},
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

	applyTextShadow: function($el, color){
		str = "-3px -3px 0 " + color + ",";
		str += "3px -3px 0 " + color + ",";
		str += "-3px 3px 0 " + color + ",";
		str += "3px 3px 0 " + color + ",";

		$el.css("text-shadow", str);
    
	},

	normalize: function(x, y){
		var mag = Math.sqrt(x*x, y*y);
		return [x/mag, y/mag];
	}

}