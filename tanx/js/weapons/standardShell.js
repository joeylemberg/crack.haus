Weapons["standard shell"] = {
	
	damage: 50,
	name: "standard shell",
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
					Weapons.boom(this);
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
		ctx.strokeStyle = "#383838";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.lineTo(10,0);
		ctx.stroke();

		ctx.fillStyle = "#4f4f4f";
		ctx.fillRect(-6,-2,14,4);
		ctx.fillRect(-6,-3,10,6);
		ctx.fillStyle = "#af6d16";
		ctx.fillRect(-3,-1,11,2);
		ctx.fillStyle = "#a0a0a0";
		ctx.fillRect(-5,-2,8,4);

		ctx.restore();
	}

}