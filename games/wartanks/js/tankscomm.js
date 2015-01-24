var ImDone = function(){};

var game = {
    //state: "0",
    setupGame: function() {
        console.log('setupGame');
        //this.state = "" + Math.random();
        //console.log(this.state);
		Map.makeMap();
		Map.drawMap(Game.ctx['map']);
		Game.player = 0;
		Tanks.init();
        return Map.slices;
    },
    joinGame: function(map_data) {
        console.log('joinGame');
        Map.slices = map_data;
		Map.drawMap(Game.ctx['map']);
		Game.player = 1;
		Tanks.init();
        //this.state = map_data;
        //console.log(this.state);
        return;
    },
    applyTurn: function(turn_data, done) {
        //this.state += turn_data;
        //console.log('turn starting: ', this.state);
        //var my_turn_data = "asd"; //prompt("enter your turn: ");
        //this.state += my_turn_data;
        //console.log('turn done: ', this.state);
        ImDone = function(my_turn_data){
        	done(my_turn_data);
        }
    },
}

var Commx = {
	
	socket: null,
	
	send: function(name, data){
		this.socket.send(JSON.stringify({
			"name": name,
			"data": data
		}));
	},
	
	sendData: function(data){
		this.socket.send(JSON.stringify(data));
	},
	
	setupGame: function(){
		Game.player = 0;
		this.socket = socket;
	},
	
	joinGame: function(){
		Game.player = 1;
		this.socket = socket;
		$("#trigger").css("opacity","0.2");
		
		socket.on("message", function(msgData){
			var message = JSON.parse(msgData);
			switch(message.name){
				case "MapData":
					Comm.setMapData(message.data);
					break;
			}
			
		});
		
	},
	
	
	getMapData: function(){
		this.send("MapData", Map.slices);
		Map.drawMap(Game.ctx['map']);
		Tanks.draw(0);
		Tanks.draw(1);
		Tanks.init();
		Comm.setMessageListeners();
	},
	
	setMessageListeners: function(){
		console.log("message listeners set");
		this.socket.on("message", function(msgData){
			var message = JSON.parse(msgData);
			var data = message.data;
			switch(message.name){
				case "ShotFired":
					Game.Balls.push(data.ball);
					$("#trigger").css("opacity","1");
					Game.turn = (Game.turn+1)%2;
					break;
				case "TankMoved":
					Tanks.units[data.player] = data.unit;
					break;
				
				
			}
			
		});
		
	},
	
	setMapData: function(mapSlices){
		Map.slices = mapSlices;
		Map.drawMap(Game.ctx['map']);
		Tanks.draw(0);
		Tanks.draw(1);
		Tanks.init();
		Comm.setMessageListeners();
		console.log("Map data recieved and set");
	},
	
	p1ApplyTurn: function(){
		
		
		
	},
	
	p2ApplyTurn: function(){
		
	},
	
	
	
	//called on p1
	p1ApplyTurn: function(){
		
	}
	
}