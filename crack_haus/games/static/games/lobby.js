var conn;

var playerId = 0;

var game;

$(document).ready(function(){
	lobby.init();
});

var lobby = {

	game: null,

	tag: "notag",
		
	userId: null,

	peer: null,

	interval: null,

	init: function(){
		$("#all-games").on("click", ".listed-game", lobby.setGame);
		$("#all-games").on("click", ".open-game", lobby.acceptGame);
		lobby.getGamesList();
		//window.onbeforeunload = lobby.deleteMe();
	},

	getGames: function(){
		if(lobby.game){
			lobby.getGame();
		}else{
			lobby.getGamesList();
		}
	},

	getGamesList: function(){ 
		$.ajax({
		    type: "GET",
		    contentType: "application/json",
		    url: "api/games/",
		    success: function (data) {
		        lobby.renderGames(data);
		    },
		    failure: function(data){
		    	console.log(data);
		    }
		});
	},

	getGame: function(){
		$.ajax({
		    type: "GET",
		    contentType: "application/json",
		    url: "http://192.168.1.7:8000/games/",
		    data: {},
		    success: function (data) {
		        console.log(data);
		    },
		    failure: function(data){
		    	console.log(data);
		    },
		    complete: function(data){
		    	console.log("data");
		    }
		});
	},

	renderGames: function(games){
		var i, game;

		var html = "<table class='game-table' cellspacing='0' >";
 
		html += "<tr>";
		html += "<th>Game</th>";
		html += "<th>Description</th>";
                html += "<th>Users in lobby</th>";
		html += "</tr>";

		for(i = 0; i < games.length; i++){
			game = games[i];
			html += "<tr class='listed-game' data-id='" + game.id + "' data-name='" + game.name + "'>";
			html += "<td>" + game.name + "</td>";
			html += "<td>" + game.description + "</td>";
		        html += "<td>" + game.lobby_size + "</td>";
                        html += "</tr>"
		}
		$("#all-games").empty();
		$("#all-games").append(html);
	},

	setGame: function(e){
		var clickedRow = $(e.target).closest(".listed-game");
		lobby.game = {
			name: clickedRow.attr("data-name"),
			id: clickedRow.attr("data-id")
		};
		$(".lobby-name").html(lobby.game.name+ " lobby");
		$("#all-games").empty();
		lobby.sendUserData();
	},

	sendUserData: function(e){
		function csrfSafeMethod(method) {
    		// these HTTP methods do not require CSRF protection
    		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		lobby.peer = new Peer({key: 'j12fo2q0wvwvcxr'});
		lobby.peer.on('connection', lobby.peerConnect);
		lobby.tag = prompt("Please enter your name", "player" + Math.round(Math.random() * 1000));
		function postIt(){
			if(lobby.peer.id){
				$.ajax({
			    type: "POST",
			    contentType: "application/json",
				accepts: "application/json",
			    url: "api/players/",
			    data: JSON.stringify({
			    	peer_id: lobby.peer.id,
			    	tag: lobby.tag,
			    	game: lobby.game.id
			    }),
			    beforeSend: function(xhr, settings) {
			        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			            xhr.setRequestHeader("X-CSRFToken", $("body").attr("data-token"));
			        }
			    },
			    success: function (data) {
			    	lobby.userId = data.id;
			        lobby.interval = setInterval(lobby.getPlayers, 1000);
			    },
			    failure: function(data){
			    	console.log(data);
			    },
			    complete: function(data){
			    	console.log("data");
			    }
			});
				return true;
			}else{
				console.log("Trying...");
				setTimeout(postIt, 100);
			}
		}

		postIt();
		
	},

	getPlayers: function(){
		$.ajax({
		    type: "GET",
		    contentType: "application/json",
		    url: "api/games/" + lobby.game.id,
		    success: function (data) {
		        lobby.renderLobby(data);
		    },
		    failure: function(data){
		    	console.log(data);
		    }
		});
	},

	renderLobby: function(data){
		var i, player;

		var html = "<table class='game-table' cellspacing='0' >";
 
		html += "<tr>";
		html += "<th>Tag</th>";
		html += "</tr>";

		for(i = 0; i < data.players.length; i++){
			player = data.players[i];
			html += "<tr class='open-game " + (player.id == lobby.userId ? "self-listing" : "") + "' data-id='" + player.id + " data-tag='" + player.tag + "' data-peer-id='" + player.peer_id + "'>";
			html += "<td>" + player.tag + (player.id == lobby.userId ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>(you)</i>" : "") + "</td>";
			html += "</tr>"
		}
		$("#all-games").empty();
		$("#all-games").append(html);
	},

	acceptGame: function(e){
		
		if($(e.target).closest(".open-game").hasClass("self-listing")){
			return;
		}

		var clickedRow = $(e.target).closest(".open-game");
		var peerId = clickedRow.attr("data-peer-id");

    	conn = lobby.peer.connect(peerId);
    	lobby.listen();

	},

	peerConnect: function(data){
		playerId = 1;
		conn = data;
		lobby.listen();
	},

	listen: function(){
		
		lobby.deleteMe();

		lobby.peer.off('connection');
		clearInterval(lobby.interval);
		$("#all-games, .lobby-name, .main-title").remove();

		switch(lobby.game.name){
			
			case "Blue Ice":
				Game.init();
				game = Game;
				break;
			
			case "Dragkings":
				dragKings();
				break;
				
			case "Tanx":
			case "Tanks":
			case "WarTanks":
				$("#war-tanks-wrapper").show();
				game = warTanks;
				warTanks.init();
				
				//Game.init();
				chat.init();
				break;

		}

		conn.on("data", lobby.readMessage);

	},

	deleteMe: function(){
		if(lobby.userId){
			function csrfSafeMethod(method) {
    			// these HTTP methods do not require CSRF protection
    			return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
			}
			$.ajax({
			    type: "DELETE",
			    contentType: "application/json",
			    url: "api/players/" + lobby.userId,
			    beforeSend: function(xhr, settings) {
			        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			            xhr.setRequestHeader("X-CSRFToken", $("body").attr("data-token"));
			        }
			    }
			});
		}
	},

	readMessage: function(data){

		try{
			data = JSON.parse(data)
		}catch(e){
			console.log(e);
			return;
		}

		switch(data.type){
			case "chat":
				chat.log(data);
				break;
		}

		if(game && game.onMessage){
			game.onMessage(data);
		}

		
	},

	send: function(data, moreData){

		if(typeof data == "string"){
			moreData.type = data;
			data = moreData;
		}

		conn.send(JSON.stringify(data));
	}

}


//window.onbeforeunload = function (evt) {
// var message = 'Hope to see you again.';
//if (typeof evt == 'undefined') {
// evt = window.event;
//
//}
// if (evt ) {
//   evt.returnValue = message;
// }
//
//    return message;
//
//}

