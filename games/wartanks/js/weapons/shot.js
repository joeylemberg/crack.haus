Weapons.shot = {
	
	damage: 0,

	init: function(tank){
		this.state = "cruising";

		this.player = tank.player;
		this.x = tank.x + 6*Math.sin(tank.theta) + 14*Math.cos(tank.turret);
		this.y = tank.y - 6*Math.cos(tank.theta) + 14*Math.sin(tank.turret);
		this.dx = tank.power/30 * Math.cos(tank.turret);
		this.dy = tank.power/30 * Math.sin(tank.turret);
		this.size = 5;
		this.theta = 0;
	},

	move: function(){
		switch(this.state){
			case "cruising":
				this.x += this.dx;
				this.y += this.dy;
				this.dy += Game.g;
				this.theta += 0.1;

				if(Weapons.detectImpact(this)){
					this.state = "blown";
					Weapons.boom(this.x,this.y,50,"blast")
				}

				break;

			case "blowing":
				this.theta -= 0.2;
				this.size --;
				if(this.size < 0){
					this.state = "blown";
				}
				break;
		}
	},

	draw: function(){
		if(this.state != "blown"){
			var ctx = Game.ctx['sprite'];
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "green";
		ctx.translate(this.x, this.y);
		ctx.rotate(this.theta);
		ctx.fillRect(-10,-10,20,20);
		ctx.restore();
		}
	}

}