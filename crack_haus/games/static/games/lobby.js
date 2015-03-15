$(document).ready(function(){
	lobby.init();
});

var lobby = {

	game: null,
		
	peer: null,

	interval: null,

	init: function(){
		$("#all-games").on("click", ".listed-game", lobby.setGame);
		lobby.getGamesList();
		//lobby.interval = setInterval(lobby.getGames, 1000);
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
		html += "</tr>";

		for(i = 0; i < games.length; i++){
			game = games[i];
			html += "<tr class='listed-game' data-id='" + game.id + "' data-name='" + game.name + "'>";
			html += "<td>" + game.name + "</td>";
			html += "<td>" + game.description + "</td>";
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
		var tag = prompt("Please enter your name", "Harry Potter");
		function postIt(){
			if(lobby.peer.id){
				$.ajax({
			    type: "POST",
			    contentType: "application/json",
				accepts: "application/json",
			    url: "api/players/",
			    data: JSON.stringify({
			    	peer_id: lobby.peer.id,
			    	tag: tag,
			    	game: lobby.game.id
			    }),
			    beforeSend: function(xhr, settings) {
			        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			            xhr.setRequestHeader("X-CSRFToken", $("body").attr("data-token"));
			        }
			    },
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
				return true;
			}else{
				console.log("Trying...");
				setTimeout(postIt, 100);
			}
		}

		postIt();


		
	}




}