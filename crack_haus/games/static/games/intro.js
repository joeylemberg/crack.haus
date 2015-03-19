var warTanksIntro = function(){

		warTanks.t+=10;
		ctx.save();
		ctx.clearRect(0,0,1000,600);

		if(warTanks.t == 500){
			clearInterval(warTanks.interval);
			warTanks.setUpGame();
			ctx.clearRect(0,0,1000,1000);
			return;
		}

		if(warTanks.t > 200){

			ctx.fillStyle = "rgb(" + (warTanks.t - 250) + ",0,0)";
			ctx.fillRect(0,0,800,500);


			if(warTanks.t < 250){
				ctx.restore();
				return;
			}

			var letters = Math.min(10, Math.round((warTanks.t - 300) / 8));
			var txt = "WAR  TANKS".substr(0,letters);
				ctx.beginPath();
				ctx.font = "bold 24px tahoma";
				ctx.lineJoin = "round";
				ctx.textAlign = "center";
				ctx.strokeStyle = "black"
				ctx.fillStyle = "#c8c8c8";
				ctx.lineWidth = 5;
				ctx.strokeText("crack.haus studios presents", 400,100);
				ctx.fillText("crack.haus studios presents", 400,100);

				if(warTanks.t > 400){
					ctx.lineWidth = 5;
					ctx.beginPath();
					ctx.font = "bold 18px tahoma";
					ctx.strokeText("copyright 2015, all rights reserved", 400,400);
					ctx.fillText("copyright 2015, all rights reserved", 400,400);
				}

				var gradient = ctx.createLinearGradient(0, 500, 800, 0);
				gradient.addColorStop(0, '#6d6b6b');
				gradient.addColorStop(0.04, '#c1b6b6');
				gradient.addColorStop(0.08, '#8c6e6e');
				gradient.addColorStop(0.1, '#d1d1d1');
				gradient.addColorStop(0.15, '#ccc5c5');
				gradient.addColorStop(0.2, '#b7aeae');
				gradient.addColorStop(0.22, '#c4c4c4');
				gradient.addColorStop(0.28, '#c1b6b6');
				gradient.addColorStop(0.32, '#b7aeae');
				gradient.addColorStop(0.43, '#c4a2a2');
				gradient.addColorStop(0.48, '#725353');
				gradient.addColorStop(0.53, '#a08d8d');
				gradient.addColorStop(0.65, '#c7c7c7');
				gradient.addColorStop(1, '#ccc5c5');

				ctx.beginPath();
				ctx.font = "bold 38px tahoma";
				ctx.lineJoin = "round";
				ctx.textAlign = "left";
				ctx.strokeStyle = "#1e1e1e";
				ctx.fillStyle = gradient;
				ctx.lineWidth = 6;
				ctx.translate(50,200);
				ctx.rotate(0.1);
				ctx.scale(3, 1.5);
				ctx.strokeText(txt, 0,0);
				ctx.fillText(txt, 0,0);
				ctx.restore();
			return;
		}

		ctx.translate(400,200);
		ctx.rotate(Math.random());
		ctx.translate(20 * Math.random() - 10,20 * Math.random() - 10);

		if (warTanks.t > 25){
			ctx.rotate(Math.random() * 0.2 - 0.1);
			ctx.translate(20 * Math.random() - 10,20 * Math.random() - 10);
			ctx.scale(1 + Math.random() * 0.2 - 0.1, 1 + Math.random() * 0.2 - 0.1);
			ctx.font="bold 24px Georgia";
			ctx.fillText("crack",-100,-60);
		}

		if (warTanks.t > 75){
			ctx.rotate(Math.random() * 0.2 - 0.1);
			ctx.translate(20 * Math.random() - 10,20 * Math.random() - 10);
			ctx.scale(1 + Math.random() * 0.2 - 0.1, 1 + Math.random() * 0.2 - 0.1);
			ctx.font="bold 28px Georgia";
			ctx.fillText("haus",0,0);
		}

		if (warTanks.t > 125){
			ctx.rotate(Math.random() * 0.2 - 0.1);
			ctx.translate(20 * Math.random() - 10,20 * Math.random() - 10);
			ctx.scale(1 + Math.random() * 0.2 - 0.1, 1 + Math.random() * 0.2 - 0.1);
			ctx.font="bold 37px Georgia";
			ctx.fillText("studios",100,60);
		}

		ctx.restore();
}