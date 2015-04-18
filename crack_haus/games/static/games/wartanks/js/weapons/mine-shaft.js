Weapons["mine shaft"] = {
	
	damage: 1,
	name: "mine shaft",
	dr: 4,
	r0: 10,
	size: 10,
	knock: 1,
	pop: 1,
	type: "digger",

	init: function(shotData){
		for(var key in shotData){
			this[key] = shotData[key];
		}
		this.state = "cruising";
		this.theta = 0;
		this.fuel = 200;
		Weapons.shots.push(this);
	},

	move: function(){
		switch(this.state){
			case "cruising":

				var impact = Util.collisionDetect(this);
				if(impact){
					this.state = "digging";
					this.dx *= 0.1;
					this.dy *= 0.1;
					this.fuel = 200;
					this.target = impact.target;
					Weapons.boom(this);
					this.lastBoom = {x: this.x, y: this.y};
					/*var shotName = this.name;
					this.x = impact.x;
					this.y = impact.y;
					Weapons.boom(this);*/
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

			case "digging":
				this.theta -= 0.2;
				this.x += this.dx;
				this.y += this.dy;
				this.x += this.dx
				this.dy += 0.01;
				this.fuel--;
				if(this.fuel < 100){
					this.dx *= 0.97;
					this.dy *= 0.97;
				}if(this.fuel < 1){
					this.state = "blowing";
				}

				if(this.fuel % 10 == 0 || Util.dist(this.x, this.y, this.lastBoom.x, this.lastBoom.y) > 5){
					this.lastBoom.x = this.x;
					this.lastBoom.y = this.y;
					Weapons.boom(this);
				}

				if(this.y > Map.h){
					this.dy *= -1;
					this.y += this.dy;
				}
				//Weapons.dig(this);

				break;

			case "blowing":
				/*this.theta -= 0.2;
				this.size --;
				if(this.size < 0){*/
					this.state = "done";
				//}
				break;
		}
	},

	draw: function(){
		ctx.save();

	if(this.fuel < 100){
		ctx.globalAlpha = Math.round(this.fuel) / 100;
	}

	ctx.lineJoin = "round";
	ctx.translate(this.x, this.y );
	ctx.rotate(Math.atan2(this.dy, this.dx) - Math.PI/2);

	ctx.beginPath();
	ctx.fillStyle = "#a3a3a3";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2.5;
	ctx.strokeRect(-1,-10,2,12 + 4 * Math.cos(this.theta*1.5));
	ctx.fillRect(-1,-10,2,12 + 4 * Math.cos(this.theta*1.5));

	ctx.scale(Math.sin(this.theta),1);


	
	ctx.translate(-7.5,-15);
	ctx.scale(0.5,0.5);
	ctx.lineWidth = 2.5;
	ctx.moveTo(27,3);
	ctx.lineTo(3,3);
	ctx.lineTo(13,13);
	ctx.lineTo(13,23);
	ctx.lineTo(17,27);
	ctx.lineTo(17,13);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();
	}

}