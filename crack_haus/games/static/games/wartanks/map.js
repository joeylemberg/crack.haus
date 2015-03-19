var Map = {
	w: 800,
	h: 500,
	slices: [],
	trees: [],
	dirtySlices: [],
	init: function(){
		this.ctx = $("#map-canvas")[0].getContext("2d");
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
    },
    draw: function(){
		for(var i = 0; i < Map.slices.length; i++){
			for(var j = 0; j < Map.slices[i].length; j++){
				var row = i;
				var line = Map.slices[i][j];
				ctx.fillStyle = line.color;
				ctx.fillRect(row-1, line.top, 2, line.bottom - line.top);
			}
		}
	},
	drawBG: function(){
		var canvas = document.createElement('canvas');
		canvas.width = 800;
		canvas.height = 500;
		var ctx = canvas.getContext("2d");
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
			$("canvas").css("background", "url(" + canvas.toDataURL() + ")")
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