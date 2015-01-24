console.log("IN HERE 1");
var canvas;
var ctx;

var sendData = function(data){
	socket.send(JSON.stringify(data));
}

var upDown = 0;
var downDown = 0;
var leftDown = 0;
var rightDown = 0;

var setKeyListeners = function(){
	
	window.addEventListener("keydown", function(e) {
		e.preventDefault();
		switch(e.keyCode){		
		case 38:
			upDown = 1;
		break;
	case 40:
		downDown =1;
	break;
case 37:
	leftDown = 1;
break;
case 39:
	rightDown = 1;
break;
		}
	}, false);
	
	window.addEventListener("keyup", function(e) {
		e.preventDefault();
		switch(e.keyCode){		
		case 38:
			upDown = 0;
		break;
	case 40:
		downDown = 0;
	break;
case 37:
	leftDown = 0;
break;
case 39:
	rightDown = 0;
break;
		}
	}, false);
}

var getLooping = function(){
	setKeyListeners();
	setInterval(loop, 20);
}

console.log("IN HERE 2");
$(document).ready(function(){
	var canvas = document.createElement('canvas');
	canvas.width = 1000;
	canvas.height = 500;
	$("body").append(canvas);
	$(canvas).ready(function(){
		ctx = canvas.getContext("2d");
	});
});


var loop = function(){
	moveThings();
	drawThings();
		sendData({name:"position", x:car.x, y:car.y});
	
}

var keyWeight = -0.2;

var collide = function() {
	if(car.x < 110){
        //left bar
		car.dx *= -0.5;
        car.x = 110;
	}
	if(car.x > 890){
		car.dx *= -0.5;
        car.x = 890;
	}
	if(car.y > 390){
		car.dy *= -0.5;
        car.y = 390;
	}
	if(car.y < 110){
		car.dy *= -0.5;
        car.y = 110;
	}
	
	
    if(car.y > 190 && car.y < 310 && car.x > 190 && car.x < 810 ){
		if (car.y < 200) {
            //top of island
             car.dy *= -0.5;
             car.y = 190;
        }
        if (car.y > 300) {
            //bottom of island
            car.dy *= -0.5;
            car.y = 310;
        }
        if (car.x < 200) {
            //left of island
            car.dx *= -0.5;
            car.x = 190;
        }
        if (car.x > 800) {
            //right of island
            car.dx *= -0.5;
            car.x = 810;
        }    
	}

}

var moveThings = function(){
	collide();
    if(upDown){
		car.dy += keyWeight;
	}
	if(downDown){
		car.dy -= keyWeight;
	}
	if(leftDown){
		car.dx += keyWeight;
	}
	if(rightDown){
		car.dx -= keyWeight;
	}
	car.x += car.dx;
	car.y += car.dy;
	
	
}


function drawCar(car){
	ctx.fillStyle = car.color;
	ctx.fillRect(car.x-10,car.y-10,20,20);
}

var drawThings = function(){
	ctx.clearRect(0,0,1000,500);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,1000,100);
	ctx.fillRect(0,400,1000,100);
	ctx.fillRect(0,0,100,500);
	ctx.fillRect(900,0,100,500);
	ctx.fillRect(200,200,600,100);
	drawCar(car);
	drawCar(car2);
	
}



var car2 = {
	x: 400,
	y: 200,
	color: "red"
}



var car = {
	x: 500,
	y: 120,
	dx: 0,
	dy: 0,
	color: "blue"
}
console.log("IN HERE 2.5");

var startGame = function(){
	
	console.log("WE ARE STARTING");
	
	socket.on("message", function(str){
		try{
			var data = JSON.parse(str)
		}catch(e){
			
			return;
		}
		
		switch(data.name){
			case "Hello":
				getLooping();
				break;
				
			case "position":
				car2.x = data.x;
				car2.y = data.y;
				break;
			
			
		}
	
	});
	
	
	
}
console.log("IN HERE 3");

var joinGame = function(){
	
	console.log("JOINING");
	sendData({name: "Hello"});
	getLooping();
	
	socket.on("message", function(str){
		try{
			var data = JSON.parse(str)
		}catch(e){
			
			return;
		}
		
		switch(data.name){
				
			case "position":
				car2.x = data.x;
				car2.y = data.y;
				break;
		}
	
	});
	
}
