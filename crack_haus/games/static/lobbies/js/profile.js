var Profile = {
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
	}
	
};