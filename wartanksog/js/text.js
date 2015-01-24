Game.Text = {
	init: function(ctx){
		
		var ctx = $('#menu_grad')[0].getContext('2d');
			var gradient = ctx.createLinearGradient(0, 800, 800, 0);
			gradient.addColorStop(0, '#d6d6d6');
			gradient.addColorStop(0.1, '#8c8c8c');
			gradient.addColorStop(0.2, '#C4C4C4');
			gradient.addColorStop(0.3, '#d6d6d6');
			gradient.addColorStop(0.4, '#8c8c8c');
			gradient.addColorStop(0.5, '#C4C4C4');
			gradient.addColorStop(0.6, '#d6d6d6');
			gradient.addColorStop(0.7, '#8c8c8c');
			gradient.addColorStop(0.8, '#C4C4C4');
			gradient.addColorStop(0.9, '#d6d6d6');
			gradient.addColorStop(1, '#C4C4C4');
			ctx.fillStyle = gradient;
			ctx.fillRect(0,0,800,800);
			
			ctx.fillStyle = 'rgba(0,0,0,0.2)';
			ctx.fillRect(0,0,1000,1000);
			
			console.log('ASd');
			$(document).ready(function(){
				grad = $('#menu_grad')[0];
				
					var ctx = $('#title_menu')[0].getContext('2d');
						ctx.beginPath();
						ctx.moveTo(0,0);
						ctx.lineTo(0,38);
						ctx.lineTo(197,38);
						ctx.lineTo(207,28);
						ctx.lineTo(207,0);
						ctx.closePath();
						ctx.lineStyle='#444444';
						ctx.lineWidth = 3;
						ctx.stroke();
						ctx.clip();
					ctx.drawImage(grad,0,0);
					
				//	ctx = $('#text_grad')[0].getContext('2d');
						ctx.beginPath();
						ctx.lineWidth = 3;
						ctx.scale(1.3,0.9);
						var gradient = ctx.createLinearGradient(0, 800, 800, 0);
						gradient.addColorStop(0, '#000000');
						gradient.addColorStop(0.1, '#161616');
						gradient.addColorStop(0.2, '#7f7f7f');
					/*	gradient.addColorStop(0.3, '#999999');
						gradient.addColorStop(0.4, '#161616');
						gradient.addColorStop(0.5, '#545454');
						gradient.addColorStop(0.6, '#161616');
						gradient.addColorStop(0.7, '#2b2b2b');
						gradient.addColorStop(0.8, '#999999');*/
						gradient.addColorStop(0.9, '#2b2b2b');
					gradient.addColorStop(1, '#000000');
				
					
						ctx.strokeStyle = gradient;
						ctx.font = "30px courier";
						ctx.strokeText('War',5,24);
						ctx.strokeText('Tanks',66,24);
						
						ctx.beginPath();
						ctx.font = "bold 10px courier";
						ctx.fillStyle = '#3d3d3d'
						ctx.save();
						ctx.scale(1.1,1);
						ctx.fillText('W A R   I S   H E L L',7,38);
						ctx.restore();
						
						ctx.beginPath();
						ctx.font = "30px courier";
							gradient = ctx.createLinearGradient(0, 800, 800, 0);
							gradient.addColorStop(0, '#c4c4c4');
							gradient.addColorStop(0.1, '#aaaaaa');
							gradient.addColorStop(0.2, '#999999');
							gradient.addColorStop(0.3, '#888888');
							gradient.addColorStop(0.4, '#999999');
							gradient.addColorStop(0.5, '#aaaaaa');
							gradient.addColorStop(0.6, '#c4c4c4');
							gradient.addColorStop(0.7, '#999999');
							gradient.addColorStop(0.8, '#C4C4C4');
							gradient.addColorStop(0.9, '#aaaaaa');
							gradient.addColorStop(1, '#C4C4C4');
													ctx.fillStyle = gradient;
							ctx.fillText('War',5,24);
							ctx.fillText('Tanks',66,24);
					
				});
		
	}
	
	
	
}