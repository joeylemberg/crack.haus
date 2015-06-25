define(function(){
	
	return {
		
		init: function(){
			this.state = this.getState();
			this.lastState = this.state;
			this.initKeyListeners();
			this.initMouseListeners();
		},
		
		getInitialState: function(){
			return {
				keys: {
					up: false,
					down: false,
					left: false,
					right: false	
				},
				mouse: {
					x: 250,
					y: 250,
					pressed: false
				}
			};
		},
		
		keys: {
			up: false,
			down: false,
			left: false,
			right: false	
		},
		
		mouse: {
			x: 250,
			y: 250,
			pressed: false
		},
		
		lastState: null,
		
		state: null,
		
		getState: function(){
			var state = {
				keys : $.extend({}, this.keys),
				mouse: $.extend({}, this.mouse)
			};
			return state;
			/*var state = {};
			for(var k in this.keys){
				state["key" + k] = this.keys[k];
			}
			for(var k in this.mouse){
				state["mouse" + k] = this.mouse[k];
			}
			return state;*/
		},
		
		updateState: function(){
			//updates lastState and returns the changes to state
			var changes = {};
			this.lastState = this.state;
			this.state = this.getState();
			for(var k in this.state){
				if(this.state[k] != this.lastState[k]){
					changes[k] = this.state[k];
				}
			}
			if($.isEmptyObject(changes)){
				return null;
			}
			return changes;
		},
		
		applyStateChange: function(){
			
		},
		
		initKeyListeners: function(){
			var keys = this.keys;
			window.addEventListener("keydown", function(e) {
				switch(e.keyCode){
					case 37:
					case 65:
						keys.left = true;
					break;
					case 39:
					case 68:
						keys.right = true;
					break;
					case 38:
					case 87:
						keys.up = true;
					break;
					case 40:
					case 87:
						keys.down = true;
					break;
				}
			});
			window.addEventListener("keyup", function(e) {
				switch(e.keyCode){
					case 37:
					case 65:
						keys.left = false;
					break;
					case 39:
					case 68:
						keys.right = false;
					break;
					case 38:
					case 87:
						keys.up = false;
					break;
					case 40:
					case 87:
						keys.down = false;
					break;
				}
			});
		},
		
		initMouseListeners: function(){
			var me = this;
			$("#game-canvas").mousemove(function(e){
				me.mouse.x = e.pageX;
				me.mouse.y = e.pageY;
			});
			$("#game-canvas").mousedown(function(e){
				me.mouse.pressed = true;
			});
			$("#game-canvas").mouseup(function(e){
				me.mouse.pressed = false;
			});
		}
		
	}
	
});