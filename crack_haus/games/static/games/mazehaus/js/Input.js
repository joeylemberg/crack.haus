var Input = {

	initGame: function(){
		window.addEventListener("keydown", function(e) {


			switch(e.keyCode){
				case 38:
					Sprite.pos[1]--;
					break;
					case 40:
					Sprite.pos[1]++;
					break;
					case 37:
					Sprite.pos[0]--;
					break;
					case 39:
					Sprite.pos[0]++;
					break;
			}

			//alert(e.keyCode);

		});
	}
}