var Input = {

	x: -100,
	y: -100,

	active: false,

	init: function(){
		this.initHtmlEvents();
		this.initMouseListeners();
		this.initKeyListeners();
	},

	activate: function(){
		this.active = true;
	},

	deactivate: function(){
//		this.x = -100;
//		this.y = -100;
ctx.clearRect(0,0,1000,1000);
		this.active = false;
	},

	initHtmlEvents: function(){

		$("#input-lock").change(function(){
			if($("#input-lock").prop("checked")){

			}
		});

		$('#tank-pos').change(function(){
			if(!Input.active){
				return;
			}
			var tank = Tanks.units[0];
			tank.x = parseInt($(this).val());
			tank.grounded = false;
		});
		
		$('#tank-ang').change(function(){
			if(!Input.active){
				return;
			}
			var tank = Tanks.units[0];
			tank.turret = $(this).val() / 180 * Math.PI;
			
		});
		
		$('#tank-pow').change(function(){
			if(!Input.active){
				return;
			}
			var tank = Tanks.units[0];
			tank.power = $(this).val();
		});
		
		$('#trigger').click(function(){
			if(!Input.active){
				return;
			}
			Tanks.fire();
		});
	},

	initMouseListeners: function(){
		
		$("#game-canvas").mousedown(function(e){
			Input.mousedown = true;
		});

		$("#game-canvas").mouseup(function(e){
			Input.mousedown = false;
		});

		$("#game-canvas").click(function(e){

								$("#chat-form, #chat-box").hide();

			//if(!Input.active || !$("#input-lock").prop("checked")){
			if(!Input.active){
				return;
			}
			Input.x = e.pageX * 1000 / $("#game-canvas").width();		
			Input.y = e.pageY * 600 / $("#game-canvas").height();

			var tank = Tanks.units[Game.turn];

			tank.turret = Math.atan2(Input.y - tank.y, Input.x - tank.x);
			var ang = Math.round(tank.turret * 180/Math.PI) % 360;
			while(ang < 0){
				ang += 360;
			}

			var pow = Math.round(Util.dist(Input.x,Input.y,tank.x,tank.y) / 5);

			pow = Math.min(100,pow);

			$("#tank-ang").val(ang);
			$("#tank-pow").val(pow);

			tank.power = pow;

		});
		
		$("#game-canvas").mousemove(function(e){
			//if(!Input.active || !$("#input-lock").prop("checked")){
			if(!Input.active || !Input.mousedown){
				return;
			}

			Input.x = e.pageX * 1000 / $("#game-canvas").width();		
			Input.y = e.pageY * 600 / $("#game-canvas").height();

			var tank = Tanks.units[Game.turn];

			tank.turret = Math.atan2(Input.y - tank.y, Input.x - tank.x);
			var ang = Math.round(tank.turret * 180/Math.PI) % 360;
			while(ang < 0){
				ang += 360;
			}

			var pow = Math.round(Util.dist(Input.x,Input.y,tank.x,tank.y) / 5);

			pow = Math.min(100,pow);

			$("#tank-ang").val(ang);
			$("#tank-pow").val(pow);

			tank.power = pow;
			
		});



		$("#move-right").on("click", function(e){
			e.preventDefault();

					var tank = Tanks.units[Game.turn];
					if(!Tanks.useGas(tank)){
						return;
					}
					//tank.x++;
					tank.dx = tank.speed;//Math.max(0.5, tank.dx + 0.2)
					tank.grounded = false;
		});

		$("#move-left").on("click", function(e){
			e.preventDefault();
					if(!Tanks.useGas(tank)){
						return;
					}
					var tank = Tanks.units[Game.turn];
					//tank.x++;
					tank.dx = -tank.speed;//Math.max(0.5, tank.dx + 0.2)
					tank.grounded = false;
		});
		
			
	},

	initKeyListeners: function(){
		window.addEventListener("keydown", function(e) {

			if(e.keyCode == 13){
				if(!$(":focus").length){
					$("#chat-form").show();
					setTimeout(function(){
						$("#chat-input").focus();
					}, 100);
					$("#chat-box").show();
				}
			}

			if(!Input.active){
				return;
			}
		//	alert(e.keyCode);
			switch(e.keyCode){

			case 32:
			if($(":focus").length){
				return;
			}
				e.preventDefault();
				Tanks.fire();
			break;
		
			case 37:
				e.preventDefault();
				var tank = Tanks.units[Game.turn];
				if(!Tanks.useGas(tank)){
						return;
					}
				//tank.x--;
				tank.dx = -tank.speed;//Math.min(-0.5, tank.dx - 0.2);
				tank.grounded = false;
				$("#tank-pos").val(tank.x);
			break;
				case 39:
					e.preventDefault();
					var tank = Tanks.units[Game.turn];
					if(!Tanks.useGas(tank)){
						return;
					}
					//tank.x++;
					tank.dx = tank.speed;//Math.max(0.5, tank.dx + 0.2)
					tank.grounded = false;
					$("#tank-pos").val(tank.x);
				break;
				case 38:
					e.preventDefault();
					var tank = Tanks.units[Game.turn];
					$('#tank-ang').val(parseInt($('#tank-ang').val()) - 5);
					tank.turret = $('#tank-ang').val() / 180 * Math.PI;
				break;
				case 40:
					e.preventDefault();
					var tank = Tanks.units[Game.turn];
					$('#tank-ang').val(parseInt($('#tank-ang').val()) + 5);
					tank.turret = $('#tank-ang').val() / 180 * Math.PI;
				break;
			}
			
		}, false);
		
		
	},

	draw: function(){
		var tank = Tanks.units[Game.turn];

		ctx.save();
			ctx.translate(Input.x,Input.y);
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.lineWidth = 1;
			ctx.moveTo(-6,-6);
			ctx.lineTo(-2,-2);
			ctx.moveTo(6,6);
			ctx.lineTo(2,2);
			ctx.moveTo(-6,6);
			ctx.lineTo(-2,2);
			ctx.moveTo(6,-6);
			ctx.lineTo(2,-2);
			ctx.stroke();
			ctx.restore();
	}
}