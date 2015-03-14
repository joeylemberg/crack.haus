$(document).ready(function(){
	lobby.init();
});

var lobby = {

	game: null,
		

	interval: null,

	init: function(){
		$("#all-games").on("click", ".listed-game", lobby.setGame);
		lobby.interval = setInterval(lobby.getGames, 1000);
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
		    url: "http://192.168.1.7:8000/games/",
		    success: function (data) {
		        console.log(data);
		    },
		    failure: function(data){
		    	console.log(data);
		    },
		    complete: function(data){
		    	var data = [{"url":"http://192.168.1.7:8000/games/1/","name":"Tanx","description":"Wartanx mutha fucka","online_users":0,"lobby_users":0}];
		    	console.log(data);
		    	lobby.renderGames(data);
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
		html += "<th>Players in Game</th>";
		html += "<th>Players in Lobby</th>";
		html += "</tr>";

		for(i = 0; i < games.length; i++){
			game = games[i];
			html += "<tr class='listed-game' data-href='" + game.url + "' data-name='" + game.name + "'>";
			html += "<td>" + game.name + "</td>";
			html += "<td>" + game.description + "</td>";
		//	html += "<td>" + game.online_users + "</td>";
		//	html += "<td>" + game.lobby_users + "</td>";
			html += "</tr>"
		}

 
		$("#all-games").empty();
		$("#all-games").append(html);



	},

	setGame: function(e){
		var clickedRow = $(e.target).closest(".listed-game");
		lobby.game = {
			name: clickedRow.attr("data-name"),
			url: clickedRow.attr("data-url")
		};
		$(".lobby-name").html(lobby.game.name+ " lobby");
		$("#all-games").empty();
		lobby.sendUserData();
	},

	sendUserData: function(e){
		$.ajax({
		    type: "POST",
		    contentType: "application/json",
		    url: lobby.game.url,
		    data: {
		    	peer_id: "123123-some-peer-id-asdfasdfasdf",
		    	tag: "Joey's Tag @@@!!",
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
	}




}