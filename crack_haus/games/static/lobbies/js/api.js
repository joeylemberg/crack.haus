var Api = {
	
	get: function(){
		//Api.request(options)
	},
	
	request: function(options){
		
		$.ajax({
		    type: options.method,
		    contentType: "application/json",
            accepts: "application/json",
			url: options.url,
			data: JSON.stringify(options.data),
            beforeSend: function(xhr, settings) {
	        if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(options.method))&& !this.crossDomain) {
		            xhr.setRequestHeader("X-CSRFToken", $("body").attr("data-token"));
		        }
		    },
		    success: function (data) {
				if(options.onSuccess){
			//		console.info("success calling " + options.url);
			//		console.info(data);
					options.onSuccess(data);
				}
		    },
			error: function(e){
			//	console.info("error calling " + options.url);
			//	console.info(e);
				if(options.onError){
					options.onError(e);
				}
			},
			complete: function(data){
				if(options.onComplete){
			//		console.info("success calling " + options.url);
			//		console.info(data);
					options.onComplete(data);
				}
			}
		});
	}
	
};