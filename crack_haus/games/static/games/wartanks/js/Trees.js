var Trees = {

	dirty: false,
	ctx: null,

	makeTree: function(x,y,size, branchColor, leafColor){
		var tree = {
			branches: [],
			leaves: [],
			branchColor: branchColor,
			leafColor: leafColor,
			theta: Math.PI/2,
			hitBoxes: [],
			dy: 0
		};
		tree.root = tree;
		tree.branches.push(Trees.newBranch(tree,null,x,y,size,tree.theta));
		Trees.dirty = true;
		return tree;
	},

	toAllBranches: function(tree, operation){
		var func = function(branch){
			if(branch.branches)
			for(var k = 0; k < branch.branches.length; k++){
				if(operation(branch.branches[k])){
					func(branch.branches[k]);
				}
			}
		}
		func(tree);
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
			branch.hasLeaves = true;
			branch.root.hitBoxes.push(branch);
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

		var ctx = this.ctx;
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
		var ctx = this.ctx;
		ctx.beginPath();
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
	
			ctx.strokeStyle = branch.root.branchColor;
			ctx.lineWidth = Math.ceil(branch.size * 0.5);
	

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