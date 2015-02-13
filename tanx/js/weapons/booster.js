Weapons["booster jets"] = {
	
	damage: 50,
	name: "booster",
	dr: 4,
	r0: 10,
	size: 50,
	knock: 1,
	pop: 1,
	type: "booster jets",

	init: function(shotData){
		for(var key in shotData){
			this[key] = shotData[key];
		}
		this.state = "launching";
		this.fuel = shotData.power / 10;
		this.theta = 0;
		
		Weapons.shots.push(this);
	},

	move: function(){

			var tank = Tanks.units[this.owner];

		switch(this.state){


			case "launching":
					tank.dx = this.dx;
					tank.dy = this.dy;
					tank.grounded = false;
					var norm = Util.normalize(this.dx, this.dy);
					this.dx = norm[0];
					this.dy = norm[1];
					this.state = "boosting";

				break;


			case "boosting":

				if(this.fuel > 0){
					if(tank.grounded){
						tank.y--;
						tank.dy = Math.min(tank.dy - 1, -1);
					}
					tank.grounded = false;
					tank.dy += this.dy/30;
					tank.dx += this.dx/30;
					this.fuel--;
					this.x++;
				}else{
					this.state = "done";
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
		
	var tank = Tanks.units[this.owner];
					if(tank.grounded){
						tank.y-=2;
					}

		ctx.translate(tank.x, tank.y);
		ctx.rotate(Math.atan2(-this.dy, -this.dx));


		for(var i = 0; i < 10; i++){
			ctx.beginPath();
		//ctx.fillStyle = "rgba(200,25,25,0.7)";
		ctx.globalAlpha = (10-i) / 10;
		ctx.fillStyle = "red";
		ctx.arc(0,0,i + 2,0,6.3,1);
		ctx.fill();
		ctx.translate(i + 7,0);
		}
		/*
		ctx.globalAlpha = Math.round(100 * (1 - (b.r / b.size)))/100;
		ctx.beginPath();
		//ctx.fillStyle = "rgba(200,25,25,0.7)";
		ctx.fillStyle = b.color;
		ctx.translate(b.x,b.y);
		ctx.arc(0,0,b.r,0,6.3,1);
		ctx.fill();
		ctx.restore();


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
		ctx.fillRect(-5,-2,8,4);*/

		ctx.restore();
	}

}