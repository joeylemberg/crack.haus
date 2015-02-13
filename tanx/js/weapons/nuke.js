Weapons["nuke"] = {
	
	color: "#ffae00",
	damage: 50,
	name: "nuke",
	dr: 0.5,
	r0: 10,
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
					this.y = impact.y + 25;
					Weapons.boom($.extend({}, this));

					that.knock = 1;
					that.pop = 6;

					setTimeout(function(){
						that.y -= 20;
						that.x -= 5;
						that.size = 30;
						Weapons.boom($.extend({}, that));
					}, 100);

					setTimeout(function(){
						that.y -= 20;
						that.x += 10;
						that.size = 33;
						Weapons.boom($.extend({}, that));
					}, 200);

					setTimeout(function(){
						that.y -= 20;
						that.x -= 10;
						that.size = 35;
						Weapons.boom($.extend({}, that));
					}, 300);

					setTimeout(function(){
						that.y -= 20;
						that.x += 10;
						that.size = 40;
						Weapons.boom($.extend({}, that));
					}, 400);

					setTimeout(function(){
						that.y -= 20;
						that.x -= 10;
						that.size = 45;
						Weapons.boom($.extend({}, that));
					}, 500);

					setTimeout(function(){
						that.y -= 20;
						that.x += 10;
						that.size = 50;
						Weapons.boom($.extend({}, that));
					}, 600);

					setTimeout(function(){
						that.y -= 20;
						that.x -= 10;
						that.size = 55;
						Weapons.boom($.extend({}, that));
					}, 700);

					setTimeout(function(){
						that.y -= 20;
						that.x += 10;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 800);

					setTimeout(function(){
						that.y -= 20;
						that.x -= 5;
						that.size = 65;
						Weapons.boom($.extend({}, that));
					}, 900);

					setTimeout(function(){
						that.knock = 3;
						that.pop = 3;
						that.damage = 75;
						that.color = "#e25712";
						that.x -= 20;
						that.y -= 3;
						that.size = 60;
						Weapons.boom($.extend({}, that));
					}, 1000);

					setTimeout(function(){
						that.x -= 20;
						that.size = 63;
						that.y += 6;
						Weapons.boom($.extend({}, that));
					}, 1000);

					setTimeout(function(){
						that.x -= 20;
						that.size = 58;
						that.y -= 2;
						Weapons.boom($.extend({}, that));
					}, 1000);

					setTimeout(function(){
						that.x += 80;
						that.size = 62;
						that.y -= 2;
						Weapons.boom($.extend({}, that));
					}, 1000);

					setTimeout(function(){
						that.x += 20;
						that.size = 57;
						that.y += 5;
						Weapons.boom($.extend({}, that));
						that.state = "done";
					}, 1000);

					setTimeout(function(){
						that.x += 20;
						that.size = 66;
						that.y -= 3;
						Weapons.boom($.extend({}, that));
						that.state = "done";
					}, 1000);
					
					
					
					
					
					
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

		if(this.state != "cruising"){
			return;
		}
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