Weapons["1-2-punch"] = {
	
	damage: 30,
	name: "1-2-punch",
	color: "blue",
	dr: 4,
	r0: 10,
	size: 80,
	knock: 3,
	pop: 3,
	type: "shell",

	init: function(shotData){
		for(var key in shotData){
			this[key] = shotData[key];
		}
		this.state = "cruising";

		var shot1 = $.extend({}, this);
		var shot2 = $.extend({}, this);

		shot1.dx =  this.power/30 * Math.cos(this.theta + 0.15);
		shot2.dx =  this.power/30 * Math.cos(this.theta - 0.1);

		shot1.dy =  this.power/30 * Math.sin(this.theta + 0.15);
		shot2.dy =  this.power/30 * Math.sin(this.theta - 0.15);
	//		dy: tank.power/30 * Math.sin(tank.turret),

		Weapons.shots.push(shot1);
		Weapons.shots.push(shot2);


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
		
		ctx.translate(this.x, this.y);
		ctx.rotate(Math.atan2(this.dy, this.dx));

		ctx.translate(15,-10);
		ctx.scale(0.8,0.8);
		ctx.rotate(Math.PI/2);
		ctx.beginPath();
		
		ctx.lineWidth = 1;
		ctx.strokeStyle ="#000000";
		ctx.fillStyle="#85a3fc";

		//index finger
		ctx.moveTo(9,17);
		ctx.lineTo(8.5,10);
		ctx.quadraticCurveTo(10.5,9,11.5,10);
		ctx.lineTo(12.5,16);
		ctx.lineTo(13,16);
		//middle finger
		ctx.lineTo(14,9);
		ctx.quadraticCurveTo(15.5,8,17,9);
		ctx.lineTo(17,16);
		//ring finger
		ctx.lineTo(19,10);
		ctx.quadraticCurveTo(20.5,10,22,10.5);
		ctx.lineTo(20,16.5);
		ctx.lineTo(21,17);
		//pinky
		ctx.lineTo(21,14);
		ctx.quadraticCurveTo(22,12,25,13.5);
		ctx.lineTo(22.5,20);
	
		ctx.quadraticCurveTo(19.5,24,20,27);
		ctx.quadraticCurveTo(15,28.5,9,27);
		//thumb
		ctx.quadraticCurveTo(7,23,4,18);
		ctx.quadraticCurveTo(2.5,15,8,13);
		ctx.lineTo(9,18);
		ctx.closePath();
		
		ctx.fill();
		ctx.stroke();
		ctx.restore();


	}

}