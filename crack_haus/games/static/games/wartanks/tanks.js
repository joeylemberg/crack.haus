var Tanks = {
	
	fire: function(){
		var weaponName = $("#weapon-select").val();
		var tank = Game.getTank();
		if(tank.power > 200){
			tank.power = 200;
		}
      	var shotData = {
        weapon: weaponName,
        owner : Game.turn,
        x:tank.x + 6*Math.sin(tank.theta) + 14*Math.cos(tank.turret),
			y:tank.y - 6*Math.cos(tank.theta) + 14*Math.sin(tank.turret),
			theta: tank.turret,
			power: tank.power,
			dx: tank.power/6 * Math.cos(tank.turret),
			dy: tank.power/6 * Math.sin(tank.turret),
			age: 0
      };
      warTanks.endTurn({
      	type: "turn",
      	tank: Game.getTank(),
      	shot: shotData
      });
	},
	
	useGas: function(tank){
		if(tank.gas > 0){
			tank.gas -= 0.5;
			return true;
		}
		return false;
	},

	units: [{id: 0, gas: 100, score: 0, speed: 1, weapons: ["standard shell", "wheel", "nuke", "acid", "rollback"],x:100,y:100,dx:0,dy:0,theta:0,turret:275,fill:'#995d95',stroke:'#000000', grounded:false, power:25},
	{id: 1, gas: 100, score: 0, speed: 1, weapons: ["standard shell", "wheel", "nuke", "acid", "rollback"],x:400,y:100,dx:-0.2,dy:-1,theta:0.5,turret:275,fill:'#eeeeee',stroke:'#000000', grounded:false, power: 25}],
	
	
	drawTank: function(ctx, x, y, theta, turret, fill, stroke){
		
		ctx.beginPath();
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.save();
	
		ctx.translate(x,y);
		
		ctx.lineWidth = 2.5;
		ctx.strokeStyle = stroke;
		ctx.rotate(theta);
		ctx.translate(0,-6);
		ctx.rotate(turret-theta);
		ctx.moveTo(0,0);
		ctx.lineTo(14,0);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = fill;
		ctx.moveTo(0,0);
		ctx.lineTo(13,0);
		ctx.stroke();
		
		ctx.restore();
		ctx.save();
		ctx.translate(x,y);
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.rotate(theta);
		
		ctx.rect(-4,-8,8,6);
		ctx.fill();
		ctx.stroke();
		
		
		
		ctx.beginPath();
		
		ctx.moveTo(-5,0);
		ctx.lineTo(5,0);
		ctx.lineTo(9,-3);
		ctx.lineTo(6,-4);
		ctx.lineTo(-6,-4);
		ctx.lineTo(-9,-3);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = 1.5;


		function drawWheel(x,y){
			ctx.beginPath();
			ctx.arc(x,y,1,0,6.28);
			ctx.stroke();
			ctx.fill();
		}
		
	
		drawWheel(-6,0);
		drawWheel(-2,0);
		drawWheel(2,0);
		drawWheel(6,0);
		
		
		
		
		
		
		ctx.restore();
		
		
	},
	move: function(){

		

		/*for(var i = 0; i < Tanks.units.length; i++){
			Tanks.units[i].grounded = false;
		}*/

		var tank;
		for(var i = 0; i < Tanks.units.length; i++){
			tank = Tanks.units[i];
			var x0 = tank.x;
			var y0 = tank.y;
			var speedLimit = Math.sqrt(tank.dx*tank.dx + tank.dy*tank.dy);
			if(tank.grounded){
				//tank.dx *= 0.99;
			}

			for(var k = 0; k < Map.trees.length; k++){
			var tree = Map.trees[k];
			for(var j = 0; j < tree.hitBoxes.length; j++){
				var box = tree.hitBoxes[j];
				//console.log(Util.dist(b.x, b.y, box.tip.x, box.tip.y));
				if(Util.dist(x0,y0, box.tip.x, box.tip.y) < 10){
					tank.grounded = true;
					tank.dx = 0;
					tank.dy = 0;
					tank.theta = 0;
					var l = box.base.y;
					var r = box.tip.y;
					//if(box.base.x < box.tip.x){
						tank.theta = Math.atan((r-l)/(box.tip.x - box.base.x));
					//}
					


					continue;
				}
			}
		}

			if(tank.x < 0.5){
				tank.x = 1;
			}
			if(tank.x > Map.w - 1.5){
				tank.x = Map.w - 1;
			}

			//
			
			//if(!tank.grounded){
			if(tank.grounded){
				tank.y += tank.dy;
				tank.x += tank.dx;
				//console.log("GROUNDED");
			}else{
				//console.log("XXXXXXXX");
				tank.dy += Game.g;
				tank.y += tank.dy;
				tank.x += tank.dx;
			}
				
				if(tank.x < 0.51 || tank.x > Map.w - 1.49){
					tank.dx *= -1;
					tank.x += tank.dx;
				}
			//}

			if(tank.y > Map.bestTop(Math.round(tank.x), tank.y)){

				

					
					var x = Math.round(tank.x);
					bestTop = Map.bestTop(tank.x, tank.y);

					
					//if(Math.abs(bestTop - tank.y) > 1 + Math.abs(tank.dy*2)){
					//	continue;
					//}
					tank.dy = 0;
					tank.dx = 0;
					tank.grounded = true;
				
					

					//if(Math.abs(bestTop - tank.y) < Math.abs(tank.dy) + 5){
						tank.y = bestTop;
						var l = Map.bestTop(Math.max(0,x-5), tank.y);
						var r = Map.bestTop(Math.min(999,x+5), tank.y);

						tank.theta = Math.atan((r-l)/10);
				//	}else{
				//		tank.x -= tank.dx;
				//		tank.y -= tank.dy;
				//	}

					
			}
		
			if(tank.y > Map.h-1){
				tank.y = Map.h;
				tank.theta = 0;
			}

			var resetMove = false;
			if(Util.dist(x0,y0,tank.x,tank.y) > speedLimit * 1.5 + 1){
				resetMove = true;
			}

			var primeSlices = Map.slices[Math.round(tank.x)];

			for(var q = 0; q < primeSlices.length; q++){
				var s = primeSlices[q];
				if(tank.y > Map.h - 5 && s.bottom > Map.h - 5 && s.top < tank.y - 10){
					resetMove = true;
				}
				if(tank.y < s.bottom + 1 && tank.y > s.top){
					resetMove = true;
				}
			}

			if(resetMove){
				tank.dx = 0;
				tank.dy = 0;
				tank.x = x0;
				tank.y = y0;
			}


		}
		
		
		
	},
	draw: function(){
		//ctx.clearRect(0,0,1000,600);
		for(var i = 0; i < Tanks.units.length; i++){
			tank = Tanks.units[i];
			Tanks.drawTank(ctx, tank.x, tank.y, tank.theta, tank.turret, tank.fill, tank.stroke);
		}


	}
	
}