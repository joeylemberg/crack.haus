var User = {
	
	init: function(){
		User.getProfile();
		
	},
	
	getProfile: function(){
		Api.request({
			
			method: "GET",
		    url: "api/profiles/",
			onSuccess: function(data){
				
				var str = "welcome home ";
				if(data && data.user){
					str += data.user;
				}else{
					str += "friend";
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
	}
	
	
	
}