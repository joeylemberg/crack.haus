Weapons["burial"] = {
	
	damage: 50,
	name: "burial",
	dr: 4,
	r0: 10,
	size: 50,
	knock: 1,
	pop: 1,
	type: "shell",

	init: function(shotData){
		for(var key in shotData){
			this[key] = shotData[key];
		}
		this.state = "cruising";
		this.theta = 0;
		Weapons.shots.push(this);
	},

	move: function(){
		switch(this.state){
			case "cruising":


				var impact = Util.collisionDetect(this);

				if(impact){
					this.state = "done";
					var shotName = this.name;
					this.x = impact.x;
					this.y = impact.y;
					//Weapons.boom(this);
					var x0 = Math.round(impact.x);
					var j = Math.PI;
					for (var i = x0 - 50; i < x0 + 50; i++){
						j-= Math.PI/100;
						if(i < 0.51 || i > Map.w - 0.51){
							continue;
						}
						//var slice = Map.slices[x0 + i];

						var sliceBottom = Map.h;
						if(Map.slices[i].length){
							sliceBottom = Map.slices[i][0].top;
						}//Map.slices[i].length ? Map.slices[i][0].top - 5 || Map.h - 5;
						var slice = {
			                top: sliceBottom - 7,
			                heightLimit: 100 * Math.sin(j),
			                bottom: sliceBottom,
			                type: "dirt",
			                color: Map.randomRGB(119, 67, 10),
			                state: "acting",
			                act: function(){
			                	if(this.bottom - this.top < this.heightLimit){
			                		this.top--;
			                	}else{
			                		this.state = "fixed";
			                	}
			                }
            			};


						Map.slices[i].unshift(slice);
					}
				}else{
					this.x += this.dx;
					this.y += this.dy;
					this.dy += Game.g;
					this.theta += 0.1;
				}

				/*this.x += this.dx;
				this.y += this.dy;
				this.dy += Game.g;
				this.theta += 0.1;

				if(Weapons.detectImpact(this)){
					this.state = "done";
					var shotName = this.name;
					Weapons.boom(this.x,this.y,50,50,"blast")
				}*/

				break;

			case "blowing":
				this.theta -= 0.2;
				this.size --;
				if(this.size < 0){
					this.state = "done";
				}
				break;
		}
	},

	draw: function(){
		ctx.save();
		ctx.beginPath();
		
		ctx.translate(this.x, this.y);
		ctx.rotate(Math.atan2(this.dy, this.dx));

		ctx.fillStyle = "#4f4f4f";
		ctx.fillRect(-6,-3,10,6);
		ctx.fillRect(-6,-4,6,8);
		ctx.fillStyle = "#7c5603";
		ctx.fillRect(-3,-2,5,4);
		ctx.fillStyle = "#7c5603";
		ctx.fillRect(-5,-4,4,6);

		ctx.restore();
	}

}