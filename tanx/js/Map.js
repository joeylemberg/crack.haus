var Map = {
	w: 1000,
	h: 600,
	slices: [],
	trees: [],
	dirtySlices: [],
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
            var g = Math.round(80 + Math.random() * 10);
            var b = Math.round(5 + Math.random() * 5);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        
        for(var i = 0; i < Map.w; i++){

            var col = {
                top: level,
                bottom: Map.h,
                type: "dirt",
                color: randomGreen(),
                state: "fixed"
            };

            slices.push([col]);
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

        this.slices = slices;

        Map.trees = [];
        var treeSpot = Math.round(Math.random() * (Map.w - 200));
        var branchColor = Map.randomRGB(50,10,10);
		var leafColor = 'rgba(' + Math.round(50 + (200 * Math.random())) + ', ' + Math.round(50 + (200 * Math.random())) + ', 0,50)';
      //  Map.trees.push(Trees.makeTree(treeSpot,Map.slices[treeSpot][0].top,8 + 5 * Math.random(), branchColor, leafColor));
    },
    draw: function(){

    	//this.ctx = $("#map-canvas").getContext("2d");
    	//var ctx = this.ctx;
      	ctx.beginPath();
		//ctx.clearRect(0,0,1000,600);


		_.each(this.trees, function(tree){
			Trees.drawTree(tree);
		});
		
		_.each(this.slices, function(slice, row){
			_.each(slice, function(line){
				ctx.fillStyle = line.color;
				ctx.fillRect(row-1, line.top, 3, line.bottom - line.top);
			});
		});
    },

	move: function(){
		for(var i = 0; i < Map.w; i++){
			for(var j = 0; j < Map.slices[i].length; j++){
				var slice = Map.slices[i][j];
				if(slice.state == "sliding"){
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
	},
	drawBG: function(){
		var ctx = $("#bg-ctx")[0].getContext("2d");
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