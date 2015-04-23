var Map = {
	w: 1000,
	h: 600,
	slices: [],
	trees: [],
	dirtySlices: [],
	init: function(){
		Map.ctx = $("#map-canvas")[0].getContext("2d");
		Trees.ctx = $("#trees-canvas")[0].getContext("2d");
		this.dirty = true;
	},
	randomRGB: function(r,g,b){
		r = Math.round(r - 3 + Math.random() * 6);
        g = Math.round(g - 3 + Math.random() * 6);
        b = Math.round(b - 3+ Math.random() * 6);
            return "rgb(" + r + "," + g + "," + b + ")";
    },
	generate: function(){
        var slices = [];
        
        var level = 10 + Math.random()*580;
        var dl = -(level-300)/80 * Math.random()

        var randomGreen = function(){
            var r = Math.round(5 + Math.random() * 5);
            var g = Math.round(60 + Math.random() * 10);
            var b = Math.round(5 + Math.random() * 5);
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        var randomBrown = function(){
            var r = Math.round(10 + Math.random() * 10);
            var g = Math.round(10 + Math.random() * 10);
            var b = Math.round(5 + Math.random() * 5);
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        var r = 20 -10 + Math.random()*20;
        var g = 60 - 20 + Math.random()*40;
        var b = 10 -5 + Math.random()*20;;

        var toRGB = function(r,g,b){
            return "rgb(" + Math.max(0,Math.round(r)) + "," + Math.max(0,Math.round(g)) + "," + Math.max(0,Math.round(b)) + ")";
        }

        Map.topColor = randomGreen();
        Map.bottomColor = randomBrown();

        
        for(var i = 0; i < Map.w; i++){

        	r += -0.7 + 1.4*Math.random();
        	g += -0.7 + 1.4*Math.random();
        	b += -0.7 + 1.4*Math.random();

            var col = {
                top: level,
                bottom: Map.h,
                type: "dirt",
                color: toRGB(r,g,b),
                state: "fixed"
            };

            slices.push([col]);
            level += Math.random() - 0.5 + dl;
            dl += Math.random()*0.4 - 0.2;
            if(level > Map.h - 50){
                dl -= 0.1;
            }
            if(level < Map.h/3){
                dl += 0.1;
            }
            if((i%100 > 45 && i < 55)){// && (i > 200 && i < 800)){
                dl*=(1 + Math.random() * 0.01);
            }
            dl *= 0.99;
        }

        this.slices = slices;

        Map.trees = [];
        /*var treeSpot = 200 + Math.round(Math.random() * (Map.w - 400));
        var branchColor = Map.randomRGB(25,10,10);
		var leafColor = 'rgba(' + Math.round(50 + (100 * Math.random())) + ', ' + Math.round(50 + (100 * Math.random())) + ', 0,50)';
        var theTree = Trees.makeTree(treeSpot,Map.slices[treeSpot][0].top,8 + 5 * Math.random(), branchColor, leafColor);
        Map.trees.push(theTree);
        while(Math.random() < 0.4){
        	var treeSpot = 200 + Math.round(Math.random() * (Map.w - 400));
        	var theTree = Trees.makeTree(treeSpot,Map.slices[treeSpot][0].top,8 + 5 * Math.random(), branchColor, leafColor);
        	Map.trees.push(theTree);
        }*/
    	Map.draw(true);
    },
    draw: function(force){

    	if(this.dirty || force){

    		var ctx = Map.ctx;
				ctx.clearRect(0,0,1000,600);
				for(var i = 0; i < Map.slices.length; i++){
					for(var j = 0; j < Map.slices[i].length; j++){
						var row = i;
						var line = Map.slices[i][j];
						
							/*var grd=ctx.createLinearGradient(0,line.top,0,line.bottom*1.2);
							grd.addColorStop(0,Map.bottomColor);
							grd.addColorStop(0.01,Map.topColor);
							grd.addColorStop(0.2,line.color);

							grd.addColorStop(0.7,line.color);
							grd.addColorStop(1,Map.bottomColor);*/
							ctx.fillStyle = line.color;
						
						



						ctx.fillRect(row-1, line.top, 2, line.bottom - line.top);
					}
				}

				/*ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "rgba(2,3,0,0.6)";
				ctx.lineCap = "round";

				for(var i = 0; i < 5; i++){
					ctx.beginPath();
					var lastTop = 0;
					for(var j = 0; j < Map.slices.length; j++){
						if(Map.slices[j][i]){
							if(Math.abs(lastTop - Map.slices[j][i].top) > 2){
								ctx.moveTo(j,Map.slices[j][i].top);
							}else{
								ctx.lineTo(j,Map.slices[j][i].top);
							}
							lastTop = Map.slices[j][i].top;
						}
					}
					ctx.stroke();

					ctx.beginPath();
					var lastBottom = Map.h;
					for(var j = 0; j < Map.slices.length; j++){
						if(Map.slices[j][i]){
							if(Math.abs(lastBottom - Map.slices[j][i].bottom) > 2){
								ctx.moveTo(j,Map.slices[j][i].bottom);
							}else{
								ctx.lineTo(j,Map.slices[j][i].bottom);
							}
							lastBottom = Map.slices[j][i].bottom;
						}
					}
					ctx.stroke();
				}*/



			}

		if(Trees.dirty || force){
			Trees.dirty = false;
			Trees.ctx.clearRect(0,0,1000,600);
			for(var i = 0; i < Map.trees.length; i++){
				var tree = Map.trees[i];
				Trees.drawTree(tree);
			}
		}

    },

	move: function(){
		Map.dirty = false;
		for(var i = 0; i < Map.w; i++){
			for(var j = 0; j < Map.slices[i].length; j++){
				var slice = Map.slices[i][j];
				if(slice.state == "sliding"){

					Map.dirty = true;
					_.each(Tanks.units, function(tank){
						/*var x0 = Math.round(tank.x);
						if(Math.abs(Map.bestTop(x0, tank.y) - slice.top) < 5){
							tank.grounded = false;
							tank.dy = Math.min(tank.dy,-0.1);
						}*/
						if(Math.abs(i - tank.x) < 15){
							tank.grounded = false;
							tank.dy = tank.dy || -0.25;
						}
					});

					/*var k = j-1;
					while(k > 0){
						var sliceHat = Map.slices[i][k];
						if(sliceHat.bottom > slice.top-5 && sliceHat.state == "fixed"){
							sliceHat.state = "sliding";
						}else{
							k = -1;
						}
					}*/

					slice.top++;
					slice.bottom++;

					/*if(!slice.dy){
						slice.dy = Game.g/2;
					}
					slice.dy += Game.g / 2;

					slice.top += slice.dy;
					slice.bottom += slice.dy;*/
					


					if(j+1 < Map.slices[i].length){
						if(slice.bottom >= Map.slices[i][j+1].top){
							Map.slices[i][j+1].top = slice.top;
							Map.slices[i].splice(j,1);
							j--;
						}
					}else if(slice.bottom >= Map.h){
						slice.bottom = Map.h;
						slice.state = "fixed";
					}
				}
				if(slice.state == "acting"){
					slice.act();
				}
				
			}
		}

		if(Map.dirty || Trees.dirty){
			for(var i = 0; i < Map.trees.length; i++){
				var tree = Map.trees[i];
				var treeSlices = Map.slices[Math.round(tree.branches[0].base.x)];
				var treeY = treeSlices.length ? treeSlices[0].top : Map.h;

				if(tree.branches[0].base.y < treeY){
					tree.dy = Math.max(0.5, tree.dy + Game.g / 2);
					var dy = tree.dy;
					Trees.toAllBranches(tree, function(branch){
						/*var baseY = Map.slices[Math.round(branch.base.x)].length ? Map.slices[Math.round(branch.base.x)][0].top: Map.h;
						if(branch.tip.y > baseY){
							return false;
						}*/
						branch.base.y+=dy;
						branch.tip.y+=dy;
						for(var j = 0; j < branch.path.length; j++){
							branch.path[j].y+=dy;
						}
						for(var j = 0; j < branch.leaves.length; j++){
							branch.leaves[j].y+=dy;
						}
						return true;
					});
					Trees.dirty = true;
				}else{
					tree.dy = 0;
				}
				

			}
		}
	},
	drawBG: function(){
		var ctx = $("#bg-canvas")[0].getContext("2d");
		ctx.save();
			var grd = ctx.createRadialGradient(200, 600, 100, 200, 300, 900);
			grd.addColorStop(0, Util.randomColor());
			grd.addColorStop(0.2, Util.randomColor());
			grd.addColorStop(0.4, Util.randomColor());
			grd.addColorStop(0.6, Util.randomColor());
			grd.addColorStop(1, Util.randomColor());
			ctx.fillStyle = grd;
			ctx.scale(2,1);
			ctx.fillRect(0,0,2000,1000);
			//make greyer
			ctx.fillStyle = "rgba(0,0,0,0.2)";
			ctx.fillRect(0,0,2000,1000);
			ctx.restore();
	},
	bestTop: function(x,y){
		if(x < 0.5 || x > Map.w - 1){
			return;
		}
		var slices = Map.slices[Math.round(x)];
		var bestTop;
		var d = Map.h;
		for(var i = 0; i < slices.length; i++){
			var slice = slices[i];
			if(Math.abs(slice.top - y) < d){
				bestTop = slice.top;
				d = Math.abs(bestTop - y);
			}
		}

		if(!bestTop || Math.abs(y-Map.h) + 3 < d){
			bestTop = Map.h;
		}

		return bestTop;
	}
}