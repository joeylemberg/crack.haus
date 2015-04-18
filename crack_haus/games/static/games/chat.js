var chat = {

	init: function(){

		var chatInput = $("<form id='chat-form'><input type='text' id='chat-input' /><input type='submit' id='chat-submit' value='SEND' />");
		var chatLog = $("<div id='chat-box'></div>");

		var chatWrapper = $("<div id='chat-wrapper'></div>");

		

		chatWrapper.append(chatInput);

		chatWrapper.append(chatLog);

		$("body").append(chatWrapper);

		$("#chat-form").submit(function(e){
			e.preventDefault();
			var message = $("#chat-input").val();
			var data = {
				type: "chat",
				sender: lobby.tag,
				message: message
			}
			lobby.send(data);
			$("#chat-box").append("<p class='me-chat'><b>" + data.sender + ":</b> " + message + "</p>");
			$("#chat-input").val("");
		});

		$('body').scrollTop(0)

		//$("#chat-input").focus();

	},

	log: function(data){

		$("#chat-box").append("<p class='them-chat'><b>" + data.sender + ":</b> " + data.message + "</p>");
	
	}

}