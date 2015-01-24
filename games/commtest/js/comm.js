var Comm = {
	
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
		Map.makeMap();
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
		console.log("Map data sent");
	},
	
	setMessageListeners: function(){
		console.log("message listeners set");
		this.socket.on("message", function(msgData){
			var message = JSON.parse(msgData);
			var data = message.data;
			console.log(message);
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