Weapons["shotgun"] = {
	
	damage: 15,
	name: "machine gun",
	dr: 5,
	r0: 5,
	size: 15,
	knock: 3,
	pop: 2,
	type: "shotgun",

	init: function(shotData){
		for(var key in shotData){
			this[key] = shotData[key];
		}
		var theta = shotData.theta;
		this.state = "cruising";
		this.shotsFired = 0;
		this.theta = 0;
		var that = this;
		var j = 0;

		for(var i = 0; i < 20; i++){
			setTimeout(function(){
				j++;
				var shot = $.extend({}, that);
				var tank = Tanks.units[shot.owner];
				shot.x = tank.x + 6*Math.sin(tank.theta) + 14*Math.cos(tank.turret);
				shot.y = tank.y - 6*Math.cos(tank.theta) + 14*Math.sin(tank.turret);
				shot.power = shotData + ((j * 3) % 7) - 3;
				theta = tank.turret + (((j*j*j)%21) - 10)/50;
				shot.dx += shotData.power/30 * Math.cos(theta);
				shot.dy += shotData.power/30 * Math.sin(theta);
				Weapons.shots.push(shot);
			}, 5 * i);
		}

		var flash = $.extend({}, this);
				flash.color = "#262626";
				flash.r0 = 1;
				flash.dr = 1;
				flash.size = 20;
				flash.type = "flash";

				Weapons.boom(flash);
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
					this.target = impact.target;
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
		ctx.fillStyle = "#4c4c4c";
		ctx.strokeStyle = "#4f4f4f";
		ctx.lineWidth = 1;

		ctx.moveTo(-2,-2);
		ctx.lineTo(0,2);
		ctx.lineTo(2,-2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		/*ctx.scale(0.5, 0.75);
		ctx.strokeStyle = "#383838";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.lineTo(10,0);
		ctx.stroke();

		ctx.fillStyle = "#4f4f4f";
		ctx.fillRect(-6,-2,14,4);
		ctx.fillRect(-6,-3,10,6);
		ctx.fillStyle = "#603f0c";
		ctx.fillRect(-3,-1,11,2);
		ctx.fillStyle = "#77736a";
		ctx.fillRect(-5,-2,8,4);*/

		ctx.restore();
	}

}