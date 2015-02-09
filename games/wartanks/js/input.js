var Input = {
	
	x: 0,
	y: 0,


	mousedown: "mousedown",
	mouseup: "mouseup",

	sizeGame: function(){
		var h = $(window).height();
		var w = $(window).width();
		
		$("canvas").attr("height", $(window).height() * window.devicePixelRatio);
		$("canvas").attr("width", $(window).width() * window.devicePixelRatio);
		$("canvas").each(function(){
			var ctx = this.getContext("2d");
			ctx.scale($(window).width()/1000 * window.devicePixelRatio, $(window).height()/600 * window.devicePixelRatio);
		});
		
		Map.drawMap(Game.ctx['map']);
		Game.drawBG(Game.ctx['bg']);
	},
	
	initInputListeners: function(){
		$('#tank-pos').change(function(){
			var tank = Tanks.units[Game.player];
			tank.x = parseInt($(this).val());
			tank.grounded = false;
		});
	
		$('#tank-ang').change(function(){
			var tank = Tanks.units[Game.player];
			tank.turret = $(this).val() / 180 * Math.PI;
		
		});
	
		$('#tank-pow').change(function(){
			var tank = Tanks.units[Game.player];
			tank.power = $(this).val();
		
		});
	
		$('#trigger').click(function(){
			Tanks.fire();
		});
	},
	
	initKeyListeners: function(){
		window.addEventListener("keydown", function(e) {
		//	alert(e.keyCode);
			switch(e.keyCode){
		
			case 32:
				e.preventDefault();
				Tanks.fire();
			break;
		
			case 37:
				e.preventDefault();
				var tank = Tanks.units[Game.player];
				tank.x--;
				tank.grounded = false;
				$("#tank-pos").val(tank.x);
			break;
				case 39:
					e.preventDefault();
					var tank = Tanks.units[Game.player];
					tank.x++;
					tank.grounded = false;
					$("#tank-pos").val(tank.x);
				break;
				case 38:
					e.preventDefault();
					var tank = Tanks.units[Game.player];
					$('#tank-ang').val(parseInt($('#tank-ang').val()) - 5);
					tank.turret = $('#tank-ang').val() / 180 * Math.PI;
				break;
				case 40:
					e.preventDefault();
					var tank = Tanks.units[Game.player];
					$('#tank-ang').val(parseInt($('#tank-ang').val()) + 5);
					tank.turret = $('#tank-ang').val() / 180 * Math.PI;
				break;
			}
			
		
			Tanks.sendData();
			
		}, false);
		
		
	},
	
	initMouseListeners: function(){
		
		$(document).click(function(){
			Tanks.fire();
		});
		
		$(document).mousemove(function(e){
			Input.x = e.pageX * 1000 / $(window).width();		
			Input.y = e.pageY * 600 / $(window).height();

			var tank = Tanks.units[Game.player];

			tank.turret = Math.atan2(Input.y - tank.y, Input.x - tank.x);
			Tanks.sendData();
		});
		
			
	}
}