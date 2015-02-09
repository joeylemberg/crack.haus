var Weapons = {
	shots: [],
	booms: [],
	points: [],
	/*fire: function(shotData){
		console.log("FIRING:");
		console.log(shotData);
		var shot = Weapons[shotData.weapon];
		shot.init(shotData);
		spritesView.addShot(shot);
		gameView.moveWorld();
	},*/
	detectImpact: function(b){
		var impact = null;
		var slices = Map.slices[Math.round(b.x)];
		//need to check all columns passed through;
		for(var i = 0; i < slices.length; i++){
			var slice = slices[i];
			//if(b.x < 1 || b.x > 999 || b.y > 600 || b.y > slices[Math.round(b.x)][0].top){
			if(slice.top < b.y && slice.bottom > b.y){
				impact = {x: b.x, y: b.y};
			}
			return impact;
		}
		
	},

	move: function(){
		for(var i = 0; i < this.shots.length; i++){

			var shot = this.shots[i];
			shot.age++;
			if(shot.state == "done" || shot.x < 0.5 || shot.x > Map.w - 0.5){
				this.shots.splice(i,1);
			}else{
				shot.move();
			}
			

		}
		for(var i = 0; i < this.booms.length; i++){
			var boom = this.booms[i];
			this.moveBoom(boom);
			if(boom.r > boom.size){
				this.booms.splice(i,1);
			}
		}
		for(var i = 0; i < this.points.length; i++){
			var p = this.points[i];
			this.movePoints(p);
			if(p.y < -10){
				this.points.splice(i,1);
			}

		}
	},
	draw: function(){
		for(var i = 0; i < this.shots.length; i++){
			var shot = this.shots[i];
			shot.draw();
		}
		for(var i = 0; i < this.booms.length; i++){
			var boom = this.booms[i];
			this.drawBoom(boom);
		}
		for(var i = 0; i < this.points.length; i++){
			var p = this.points[i];
			this.drawPoints(p);
		}
	},
	boom: function(shotData){
		//default boom values



		var boom = {
			x: 100,
			y: 100,
			r: 0,
			dr: 1,
			r0: 5,
			damage: 50,
			knock: 2,
			pop: 2,
			size: 50,
			type: "standard",
			state: "expanding",
			color: "rgba(200,25,25,0.7)",
			hits: [],
			owner: -1,
			age: 0,
		};
		for(var i = 0; i < Tanks.units.length; i++){
			boom.hits.push(0);
			Tanks.units[i].grounded = false;
		}

		//set boom values based on shotData
		for(var k in shotData){
			boom[k] = shotData[k];
		}

		this.booms.push(boom);
	},
	drawBoom: function(b){
		ctx.save();
		ctx.globalAlpha = Math.round(100 * (1 - (b.r / b.size)))/100;
		ctx.beginPath();
		//ctx.fillStyle = "rgba(200,25,25,0.7)";
		ctx.fillStyle = b.color;
		ctx.translate(b.x,b.y);
		ctx.arc(0,0,b.r,0,6.3,1);
		ctx.fill();
		ctx.restore();
	},
	moveBoom: function(boom){

		boom.age ++;

		boom.r += boom.dr || 1;
		var r2 = Math.pow(boom.r, 2);
		var lens = [];
		var slices = Map.slices;
		for(var i = 0; i < boom.r*2 ; i++){
			var boomLength = Math.sqrt(r2 - Math.pow(boom.r-i,2));
			var j = Math.round(boom.x - boom.r + i);
			if(j < 0 || j > Map.slices.length){
				continue;
			}

			_.each(Tanks.units, function(tank){

						if(Math.abs(j - tank.x) < 20){
							tank.grounded = false;
						}

						if(!boom.hits[tank.id]){
								var dx = tank.x - boom.x;
								var dy = tank.y - boom.y;
								var r2 = Math.sqrt(dx*dx + dy*dy);
								if(r2 < boom.r + 10){
									var damage = Math.ceil(boom.damage * Math.min(1, Math.max(0.1, (boom.size * 1.1 - boom.r)/boom.size)));
									if(boom.age <= 1){
										damage = boom.damage;
									}
									if(tank.id == boom.owner){
										damage *= -1;
									}
									boom.hits[tank.id] = damage;
									Weapons.hit({
										owner: boom.owner,
										x: tank.x,
										y: tank.y,
										value: damage,
										target: tank.id,
										dx : dx/r2 * boom.knock,
										dy : dy/r2 * boom.knock - boom.pop
									});
								}
							}
					});

			if(slices[j] == undefined){
				continue;
			}
			for(var k = 0; k < slices[j].length; k++){
				var slice = slices[j][k];
				if(slice.top > boom.y + boomLength || slice.bottom < boom.y - boomLength){
					//boom is completely above or below slice
				}else if(slice.top > boom.y - boomLength && slice.bottom > boom.y + boomLength){
					//boom give the slice a haircut
					slice.top = boom.y + boomLength;
				}else if(slice.top < boom.y - boomLength && slice.bottom > boom.y - boomLength && slice.bottom < boom.y + boomLength){
					//boom chops the bottom off of slice
					slice.bottom = boom.y - boomLength;
					if(boom.type != "digger"){
						slice.state = "sliding";
					}
				}else if(slice.top < boom.y - boomLength && slice.bottom > boom.y + boomLength){
					//boom splits the slice in two, blowing out some piece
					Map.slices[j].splice(k,0,{
						top: slice.top,
		                bottom: boom.y - boomLength,
		                type: slice.type,
		                color: slice.color,
		                state: boom.type == "digger" ? "fixed" : "sliding"
					});
					slice.top = boom.y + boomLength;
					k++;
				}else if(slice.top > boom.y - boomLength && slice.bottom < boom.y + boomLength){
					//slice is obliterated
					Map.slices[j].splice(k,1);
					k--;
				}
			}
		}
	},
	dig: function(boom){

	},
	hit: function(pointsData){
		pointsData.t = 0;
		pointsData.wave = 0;
		Weapons.points.push(pointsData);
		Tanks.units[pointsData.owner].score += pointsData.value;
		var tank = Tanks.units[pointsData.target];
		tank.dy = pointsData.dy;
		tank.dx = pointsData.dx;
		tank.grounded = false;
	},
	movePoints: function(p){
		p.y -= 0.5;
		p.t += 1;
		p.wave = 10 * Math.cos(p.t/10);
	},
	drawPoints: function(p){
		//TODO do with css? whatever
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = Math.max(0,(100 - Math.round(p.t/4))/100);
		ctx.font = "bold 16px sans-serif";
		ctx.textAlign = "center";
		ctx.lineJoin = "round";
		ctx.strokeStyle = Tanks.units[p.owner].stroke;
		ctx.fillStyle = Tanks.units[p.owner].fill;
		ctx.lineWidth = 3;
		ctx.strokeText(p.value, p.x+p.wave,p.y);
		ctx.fillText(p.value, p.x+p.wave,p.y);
		ctx.restore();
	}
};