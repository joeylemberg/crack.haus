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
		$(".game-canvas").addClass("hide-mouse");
	},

	deactivate: function(){
//		this.x = -100;
//		this.y = -100;
		ctx.clearRect(0,0,1000,1000);
		this.active = false;
		$(".game-canvas").removeClass("hide-mouse");
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

			if($("#chat-form").css("display") != "none"){
				$("#chat-form, #chat-box").hide();
				return;
			}

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

			var pow = Math.round(Util.dist(Input.x,Input.y,tank.x,tank.y) / 2);

			pow = Math.min(100,pow);

			console.log(pow);

			$("#tank-ang").val(ang);
			$("#tank-pow").val(pow);

			tank.power = pow;

		});
		
		$("#game-canvas").mousemove(function(e){
			//if(!Input.active || !$("#input-lock").prop("checked")){

				Input.mouseX = e.pageX * 1000 / $("#game-canvas").width();		
			Input.mouseY = e.pageY * 600 / $("#game-canvas").height();

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

			var pow = Math.round(Util.dist(Input.x,Input.y,tank.x,tank.y) / 2);

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
				}else{
					if($(":focus").attr("type") == "number"){
						$(":focus").blur();
					}
				}
			}

			if(!Input.active){
				return;
			}
		//	alert(e.keyCode);
			switch(e.keyCode){

			case 32:
			if($(":focus").length && $(":focus").attr("type") != "number"){
				return;
			}
				e.preventDefault();
				Tanks.fire();
			break;
		
			case 27:
				$("#chat-form, #chat-box").hide();
				$(":focus").blur();
				break;

			case 37:
			case 65:
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
				case 68:
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
				case 87:
					e.preventDefault();
					var tank = Tanks.units[Game.turn];
					$('#tank-ang').val(parseInt($('#tank-ang').val()) - 5);
					tank.turret = $('#tank-ang').val() / 180 * Math.PI;
				break;
				case 40:
				case 87:
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

		

			if(tank && this.active){

		if(Input.mouseX && Input.mouseY){
			ctx.save();
			ctx.translate(Input.mouseX, Input.mouseY);
			ctx.scale(1.5,1.5);
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.lineWidth = 2;
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

				ctx.save();
        			ctx.translate(tank.x,tank.y);
        	var x = 6*Math.sin(tank.theta) + 14*Math.cos(tank.turret);
			var y = -6*Math.cos(tank.theta) + 14*Math.sin(tank.turret);

				ctx.beginPath();
			ctx.strokeStyle = "rgba(255,255,255,0.1)";
			ctx.lineWidth = 3;
			ctx.arc(0,0,200,0,Math.PI*2, 1);
			ctx.stroke();

			ctx.beginPath();
			ctx.fillStyle = "rgba(255,255,255,0.3)";
			ctx.moveTo(x,y);
			ctx.lineTo(Math.cos(tank.turret + 0.25) * 2*tank.power,Math.sin(tank.turret + 0.25) * 2*tank.power);
			ctx.lineTo(Math.cos(tank.turret + 0.1) * 2*tank.power,Math.sin(tank.turret + 0.1) * 2*tank.power);
			ctx.lineTo(Math.cos(tank.turret) * 2*tank.power,Math.sin(tank.turret) * 2*tank.power);
			ctx.lineTo(Math.cos(tank.turret - 0.1) * 2*tank.power,Math.sin(tank.turret - 0.1) * 2*tank.power);
			ctx.lineTo(Math.cos(tank.turret - 0.25) * 2*tank.power,Math.sin(tank.turret - 0.25) * 2*tank.power);
			ctx.lineTo(x,y);
			ctx.closePath();
			ctx.fill();

			ctx.restore();
			}

			

	}
}