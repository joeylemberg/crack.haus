var Tanks = {
	
	init: function(){
		var loop = function(){
			Tanks.applyPhysics();
			requestAnimationFrame(loop);
		}
		loop();
		
		Input.sizeGame();
		$(window).resize(Input.sizeGame);
		
		Input.initInputListeners();
		Input.initKeyListeners();
		Input.initMouseListeners();
		
		
	},

	weapons: ["shot", "shot"],
	
	sendData: function(){
		/*Comm.send("TankMoved", {
			player: Game.player,
			unit: Tanks.units[Game.player]		
		});*/
	},
	
	units: [{weapon: "shot", player: 0, x:150,y:100,dx:0,dy:0,theta:0,turret:-45,fill:'#995d95',stroke:'#000000', grounded:false, power:200},
	{weapon: "shot",player: 1, x:650,y:100,dx:-0.2,dy:-1,theta:0.5,turret:250,fill:'#eeeeee',stroke:'#000000', grounded:false, power: 200}],
	
	fire: function(force){
			if(ImReady && (Game.turn == Game.player || force)){
				Map.shots = [];
				var tank = Tanks.units[Game.turn];
				var shot = Weapons[tank.weapon];
				shot.init(tank);
				Map.shots.push(shot);

				/*var shot = {
					player: Game.turn,
					type:'dry',
					x:tank.x + 6*Math.sin(tank.theta) + 14*Math.cos(tank.turret),
					y:tank.y - 6*Math.cos(tank.theta) + 14*Math.sin(tank.turret),
					dx: tank.power/30 * Math.cos(tank.turret),
					dy: tank.power/30 * Math.sin(tank.turret)
				};*/
				
				/*Comm.send("ShotFired", {
					"ball": shot
				});*/
				
				Game.turn = (Game.turn+1)%2;
				$("#trigger").css("opacity","0.2");
				if(!force){
					ImDone(Tanks.units[Game.player]);
				}
			}
			
	
		
		},
	
	draw: function(player){
		
		var ctx = Game.ctx['sprite'];
		
		var x = Tanks.units[player].x;
		var y = Tanks.units[player].y;
		var theta = Tanks.units[player].theta;
		var turret = Tanks.units[player].turret;
		var fill = Tanks.units[player].fill;
		var stroke = Tanks.units[player].stroke;
		
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
	applyPhysics: function(){
		var tank;
		for(var i = 0; i < Tanks.units.length; i++){
			tank = Tanks.units[i];
			var slice = Map.slices[Math.round(tank.x)][0].top;
			
			if(!tank.grounded){
				tank.dy += Game.g;
				tank.y += tank.dy;
			}
			
			
			if(tank.y > slice){
				tank.grounded = true;
				
					tank.dy = 0;
					tank.dx = 0;
					
					var x = Math.round(tank.x);
					tank.y = Map.slices[x][0].top;
	
					var l = Map.slices[Math.max(0,x-5)][0].top;
					var r = Map.slices[Math.min(999,x+5)][0].top;

						tank.theta = Math.atan((r-l)/10);//Math.atan((r-l)/10);

			}
			
			//console.log(slice);
	
			
		}
		Game.ctx['sprite'].clearRect(0,0,1000,600);
		Game.ctx['sprite'].fillRect(Input.x-5,Input.y-5,10,10);
		for(var i = 0; i < Tanks.units.length; i++){
			tank = Tanks.units[i];
			Tanks.draw(i);
		}

		$.each(Map.shots, function(){
			this.move();
			this.draw();
		});

		$.each(Map.booms, function(){
			Map.moveBoom(this);
			Map.drawBoom(this);
		});
		
		Game.moveBalls();
		
		
	}
	
}