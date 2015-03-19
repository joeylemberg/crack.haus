var canvas;
var ctx;



var warTanks = {

	init: function(){
		canvas = document.createElement('canvas');
		canvas.width = 800;
		canvas.height = 500;
		$("body").append(canvas);
		$(canvas).css("border", "1px solid black");

		ctx = canvas.getContext("2d");

		warTanks.playIntro();
	},
	

	playIntro: function(){
		warTanks.t = 0;
		ctx.fillStyle = "black";
		warTanks.interval = setInterval(warTanks.introFrame, 20);

	},

	introFrame: function(){
		warTanksIntro();
	}
}