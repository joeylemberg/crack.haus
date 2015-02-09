var Trees = {

	makeTree: function(x,y,size, branchColor, leafColor){
		var tree = {
			branches: [],
			leaves: [],
			branchColor: branchColor,
			leafColor: leafColor,
			theta: Math.PI/2
		};
		tree.branches.push(Trees.newBranch(tree,null,x,y,size,tree.theta));
		return tree;
	},

	newBranch: function(root,parent,x,y,s,theta){
		var depth = parent ? parent.depth + 1 : 0;
		//theta = (root.theta * (10 - depth) + root.theta * depth) / 10;

		

		theta = (root.theta + theta * 2) / 3;

		if(Math.abs(theta - root.theta) > Math.PI / 2){
//			theta = (root.theta + theta) / 2;
		}
		var branch = {
			depth: depth,
			root: root,
			parent: parent,
			base: {
				x: x,
				y: y
			},
			path: [],
			/*path0: {
				x: x - (s * 2 * Math.cos(theta)) + Math.random() * 2 * s,
				y: y - (s * 2 * Math.sin(theta)) + Math.random() * 2 * s
			},
			path1: {
				x: x - (s * 4 * Math.cos(theta)) + Math.random() * 4 * s - s* 2,
				y: y - (s * 4 * Math.sin(theta)) + Math.random() * 4 * s- s* 2
			},
			tip: {
				x: x - (s * 6 + s * Math.random()) * Math.cos(theta),
				y: y - (s * 6 + s * Math.random()) * Math.sin(theta)
			},*/
			tip: {x:x,y:y},
			size: s,
			theta: theta,
			branches: [],
			leaves: []
		};

		var stepLimit = Math.pow(branch.size, 1.2) / 2;
		var mag = 4;
		if(branch.depth < 3){
			mag = 6;
		}
		if(branch.depth < 1){
			mag = 8;
		}
		var x0 = Math.round(x);
		for(var i = 0; i < stepLimit; i++){
			theta = (theta - 0.25) + Math.random() / 2;
			x -= Math.cos(theta) * mag * (0.5 + Math.random());
			y -= Math.sin(theta) * mag * (0.5 + Math.random());
			/*if(branch.depth > 1 && x0 > -1 && x0 < Map.w && y + 20 > Map.slices[x0][0].top){
				y = Map.slices[x0][0].top - 20;
				theta = (root.theta + theta * 2) / 3;
			}*/
			if(branch.depth > 1 && x0 > -1 && x0 < Map.w && y + 50 > Map.slices[x0][0].top){
				y -= 5;
				//y = Map.slices[x0][0].top - 50;
				//y -= 5;//Map.slices[x0][0].top - 20;
				//theta += (-1 + Math.random() * 2);
				//theta = (root.theta + theta * 2) / 3;
			}
			branch.path.push({x: x, y: y});
		}

		branch.tip = {x: x, y: y};

		if(branch.size < 6){
			for(var i = 0; i < branch.size + 4; i++){
				branch.leaves.push({
				x: branch.tip.x - 5 + Math.random() * 10,
				y: branch.tip.y - 5 + Math.random() * 10
			});
			}
			
		}

		if(branch.depth == 0){
			var splitDex = Math.floor(branch.path.length * Math.random());
			branch.branches.push(Trees.newBranch(root, branch, branch.path[splitDex].x, branch.path[splitDex].y, branch.size * 0.9, theta - 0.5 + Math.random()));
			branch.branches.push(Trees.newBranch(root, branch, branch.path[branch.path.length-2].x, branch.path[branch.path.length-2].y, branch.size * 0.8, theta + Math.random() * 2));
			branch.branches.push(Trees.newBranch(root, branch, branch.tip.x, branch.tip.y, branch.size * 0.8, theta + Math.random() * 2 - 2));
		}else if(branch.path.length > 4){
			branch.branches.push(Trees.newBranch(root, branch, branch.path[branch.path.length-2].x, branch.path[branch.path.length-2].y, branch.size * 0.8, theta + Math.random() * 2));
			branch.branches.push(Trees.newBranch(root, branch, branch.tip.x, branch.tip.y, branch.size * 0.8, theta + Math.random() * 2 - 2));
		}else if(s > 4 || depth < 6){
			branch.branches.push(Trees.newBranch(root, branch, branch.tip.x, branch.tip.y, branch.size * 0.8, theta + Math.random() * 3));
			branch.branches.push(Trees.newBranch(root, branch, branch.tip.x, branch.tip.y, branch.size * 0.8, theta + Math.random() * 3 - 3));
		}


		return branch;

	},



	drawTree: function(tree){
		ctx.save();
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.strokeStyle = tree.branchColor;
		for(var i = 0; i < tree.branches.length; i++){
			var branch = tree.branches[i];
			Trees.drawBranch(branch);
		}
		ctx.restore();
	},
	drawBranch: function(branch){
		ctx.beginPath();
		ctx.lineWidth = Math.ceil(branch.size * 0.5);
		ctx.moveTo(branch.base.x, branch.base.y);
		for(var i = 0; i < branch.path.length; i++){
			ctx.lineTo(branch.path[i].x, branch.path[i].y);
		}


		ctx.lineTo(branch.tip.x, branch.tip.y);

		if(branch.depth == 0){
			ctx.lineWidth = Math.ceil(branch.size * 0.65);
		}
		/*if(branch.depth == 0){
			var x0 = Math.round(branch.base.x);
			var y0 = (x0 - 5 < 0 || x0 - 5 > Map.w - 1) ? branch.base.y : Map.slices[x0 - 5][0].top;
			var y1 = (x0 + 5 < 0 || x0 + 5 > Map.w - 1) ? branch.base.y : Map.slices[x0 + 5][0].top;
			ctx.moveTo(branch.base.x - branch.size * 0.25, y0);
			ctx.lineTo(branch.tip.x, branch.tip.y);
			ctx.moveTo(branch.base.x + branch.size * 0.25, y1);
			ctx.lineTo(branch.tip.x, branch.tip.y);
		}*/

		//ctx.quadraticCurveTo(branch.path.x, branch.path.y, branch.tip.x, branch.tip.y);
		//ctx.bezierCurveTo(branch.path0.x, branch.path0.y, branch.path1.x, branch.path1.y, branch.tip.x, branch.tip.y);
		ctx.stroke();
		for(var i = 0; i < branch.branches.length; i++){
			Trees.drawBranch(branch.branches[i]);
		}

		ctx.beginPath();
		ctx.globalAlpha = 0.8;
		ctx.fillStyle = branch.root.leafColor;
		for(var i = 0; i < branch.leaves.length; i++){
			ctx.fillRect(branch.leaves[i].x - 2, branch.leaves[i].y - 2, 4, 4);
		}

		ctx.beginPath();
		ctx.globalAlpha = 1;
	}

};


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