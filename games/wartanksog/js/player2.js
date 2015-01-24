/*var pint = setInterval(function(){
	if(socket){
		socket.on("message", function(d){
			if(d == "start1"){
				Player1.initialize();
				socket.send("start2");
			}else{
				Player2.initialize();
			}
			clearInterval(pint);
		});
		socket.send("start1");
	}
	
	
},50);*/


var sharedMap = null;





var Player1 = {
	
	initialize: function(){
		
		tankNum = 0;
		
		socket.on("message", function(d){
			
			console.log("Got yo message P2" + Math.random());
					
			var data = JSON.parse(d);
			
			
		});
		
		if(data.name == "GetMap"){
			var response = {
				name: "MapData",
				mapData: Map.slices
			};
			socket.send(JSON.stringify(response));
		}
		
	}
	
}

var Player2 = {
	
	initialize: function(){
		
		tankNum = 1;
		
		socket.on("message", function(d){
			console.log("Got yo message" + Math.random());
	//		console.log(d);
			var data = JSON.parse(d);
			
			switch(data.name){
			
				case: "MapData"{
					sharedMap = data.mapData;
					break;
				}
			}
			
		});
		
		socket.send(
			JSON.stringify({
				name: "GetMap"
			})
		);
		
	}
	
}