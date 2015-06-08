var Profile = {
	
	init: function(){
		Main.clearPage();
		
		$("#lobby-title").html("My profile");
		
		Profile.renderProfile();
		
		
	},
	
	getProfile: function(){
		Api.request({
			
			method: "GET",
		    url: "api/profiles/",
			onSuccess: function(data){
				
				var str = "welcome home ";
				if(data && data.user){
					str += data.user;
					Profile.setProfile(data);
				}else{
					str += "friend";
					Profile.setProfile({tag : "guest" + Math.round(Math.random() * 10000) });
				}
				$("#crack-haus-title .subtitle").html(str);
				
				$("#crack-haus-title .subtitle").append("<a class='edit-profile'>edit profile</a>");
				
				$(".edit-profile").on("click", Profile.editProfile);
				
				if(History.pageType == "profile"){
					Profile.init();
				}
				
			},
		    failure: function(data){
		    	console.log(data);
		    },
		    complete: function(data){
		    	console.log("data");
		    }
			
		});
	},
	
	setProfile: function(data){
		for(var k in data){
			Profile[k] = data[k];
		}
	},
	
	editProfile: function(){
		$("#lobby").empty();
		History.navTo({pageType: "profile"});
	},
	
	renderProfile: function(){
		var i, p;
		
		var html = "<table class='profile-table' cellspacing='0' >";
 
		html += "<tr>";
		html += "<tr><td>User</td><td class='dimmed'>" + Profile.user + "</td></tr>";
		html += "<tr><td>Tag</td><td><div contenteditable='true' id='profile-tag' class='edit-field'>" + Profile.tag + "</div></td></tr>";
		html += "<tr><td>Description</td><td><div contenteditable='true' id='profile-description' class='edit-field'>" + (Profile.description || "") + "</div></td></tr>";
		html += "<tr><td>Colors</td><td><input id='profile-color-select-0' class='color' value='" + Profile.colors + "' /></td></tr>";
		html += "</table>";
		
		html += "<div class='save-profile button' >Save Profile</div>";
		html += "<div class='back-from-profile button' >Back</div>";
		
		$("#lobby").html(html);
		
		$("#lobby").on("click", ".save-profile", Profile.saveProfile);
		$("#lobby").on("click", ".back-from-profile", Profile.goBack);
		
		new jscolor.color($("#profile-color-select-0")[0]);
	},
	
	saveProfile: function(){
		
		$("#lobby").html("<div class='profile'>Saving profile " + Util.loaderHtml() + "</div>");
		
		
		Api.request({
		    method: "PATCH",
		    url: "api/profiles/",
			data: {
			    	"tag": $("#profile-tag").text()
			},
		    onSuccess: function (data) {
				Profile.getProfile();
		    }
		});
	},
	
	goBack: function(){
		history.go(-1);
	}
	
};