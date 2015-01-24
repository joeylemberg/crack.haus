	var ThanksTree = {
		init: function(ctx){
			var txt;
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.fillStyle = 'black';
			ctx.strokeStyle = 'rgb(200,200,200)';
			ctx.font = "bold 15pt Tahoma";
			txt = 'Math.Random Canvas Trees';
			ctx.fillText(txt, 10, 30);
			ThanksTree.addBranch(470,320,-1.7,8);
			setInterval(ThanksTree.step, 20);
			ctx.beginPath();
			ctx.strokeStyle = 'rgb(39, ' + Math.round(100 + (100 * Math.random())) + ', 0)';
			ctx.fillStyle = 'rgba(' + Math.round(50 + (200 * Math.random())) + ', ' + Math.round(50 + (200 * Math.random())) + ', 0,50)';
		},
		step: function(ctx){
			var branch;
			for(var i = 0; i < ThanksTree.branches.length; i++){
				branch = ThanksTree.branches[i];
				if(!ThanksTree.leavesOn){
				branch.theta -= 0.05;
				branch.theta += 0.1 * Math.random();
			}
				ctx.beginPath();
				ctx.lineWidth = branch.width;
				ctx.moveTo(branch.x,branch.y);
				branch.x += Math.cos(branch.theta);
				branch.y += Math.sin(branch.theta);
				branch.length ++;
		//		branch.theta = (branch.theta*199 - 1.7) / 200;
				ctx.lineTo(branch.x,branch.y);
				ctx.stroke();
				if(branch.length > branch.width * 5 + 1 + branch.magic){
					if(branch.width > 0.75){
						if(ThanksTree.leavesOn && branch.width < 1.2){
						/*	if(Map.autumn > 0.9 && Math.random() < Map.autumn){
								ctx.fillStyle = 'rgba(89, 227, 255,0.1)';
								ctx.fillRect(branch.x -4, branch.y -4, 1, 3);
							}else{*/
							ctx.fillStyle = 'rgba(' + Map.leaf.r + ',' + Map.leaf.g + ',' + Map.leaf.b + ',0.6)';
							ctx.fillRect(branch.x -4, branch.y -4, 8,8);
							//}
							
							
						}
						
					//branch.theta += (Map.slices[Math.min(Math.round(branch.x)+1,999)] - Map.slices[Math.max(Math.round(branch.x)-1,0)])/10;
						
					//	for(var reps = 0; reps < 10; reps++){
							//if(branch.x > 10 && branch.x < 990 && branch.y + branch.width-0.6 * 100 > Map.slices[Math.ceil(branch.x)]){
							//	branch.theta += 3.14;
							//	branch.y = Map.slices[Math.ceil(branch.x)];
								
								
								
						//	}
					//	}
						
					
					ThanksTree.addBranch(branch.x,branch.y,branch.theta + Math.random() * 2 - 1, branch.width * 0.8);
					branch.width *= 0.8;
					branch.length = 0;
					branch.magic = Math.random() * 2; 
					if(!ThanksTree.leavesOn && branch.width < 1.5){
						ThanksTree.leavesOn = 1;
					}
					}else{
						ThanksTree.leavesOn = 0;
						return false;
						ThanksTree.branches = [];
						ThanksTree.addBranch(50 + Math.random() * 800,320,-1.8 + Math.random()/2,4 + 8*Math.random());
						ctx.beginPath();
						ctx.strokeStyle = 'rgb(39, ' + Math.round(20 + (60 * Math.random())) + ', 0)';
						ctx.fillStyle = 'rgba(' + Math.round(50 + (200 * Math.random())) + ', ' + Math.round(50 + (200 * Math.random())) + ', 0,0.5)';
						ThanksTree.leavesOn = 0;
						break;
					}
				}
			}
			return true;
		},
		addBranch: function(x,y,t,w){
			ThanksTree.branches.push({
				length: 0,
				x: x,
				y: y,
				theta: t,
				width: w,
				magic: Math.random() * 2
			});
		},
		leavesOn: 0,
		branches: []
	};