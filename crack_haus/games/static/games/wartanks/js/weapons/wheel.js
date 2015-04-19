Weapons["wheel"] = {
	
	damage: 50,
	name: "wheel",
	dr: 4,
	r0: 10,
	size: 50,
	knock: 1,
	pop: 1,

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
					this.state = "rolling";
					this.dx *= 0.5;
					this.dx = Math.max(1,this.dx);
					var shotName = this.name;
					this.x = impact.x;
					this.y = impact.y;
				}else{
					this.x += this.dx;
					this.y += this.dy;
					this.dy += Game.g;
					this.theta += 0.1;
				}

				break;

			case "rolling":
				this.dx *= 1.005;
				this.x += this.dx;
				var bestTop = Map.bestTop(this.x, this.y);
				this.y = bestTop - 10;
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
		
		ctx.beginPath();
		ctx.fillStyle = "#c4c4c4";
		ctx.arc(0,0,10, 0, Math.PI * 2, 1);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.restore();
	}

}