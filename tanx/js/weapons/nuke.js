Weapons["nuke"] = {
	
	color: "#ffae00",
	damage: 50,
	name: "nuke",
	dr: 1,
	r0: 1,
	size: 40,
	knock: 5,
	pop: 10,

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
					this.state = "popping";
					var that = this;
					var shotName = this.name;
					this.x = impact.x;
					this.y = impact.y;
					Weapons.boom($.extend({}, this));

					setTimeout(function(){
						that.y -= 20;
						Weapons.boom($.extend({}, that));
					}, 200);

					setTimeout(function(){
						that.y -= 20;
						that.size = 50;
						Weapons.boom($.extend({}, that));
					}, 400);

					setTimeout(function(){
						that.y -= 20;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 600);

					setTimeout(function(){
						that.x -= 20;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 800);

					setTimeout(function(){
						that.x -= 20;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 800);

					setTimeout(function(){
						that.x += 60;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 800);

					setTimeout(function(){
						that.x += 20;
						that.size = 60;
						Weapons.boom($.extend({}, that));
						that.state = "done";
					}, 800);
					
					
					
					
					
					
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
		ctx.rotate(Math.atan2(this.dy, this.dx))
		ctx.strokeStyle = "#383838";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.lineTo(10,0);
		ctx.stroke();

		ctx.fillStyle = "#black";
		ctx.fillRect(-6,-2,14,4);

		ctx.restore();
	}

}