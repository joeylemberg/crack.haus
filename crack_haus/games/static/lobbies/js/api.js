var Api = {

	init: function(){
		//Api.request(options)
	},
	
	request: function(options){
		
		var urlPrefix = options.url.substr(0,4) == "http" ? "" : ("http://" + window.location.host + "/");
		
		$.ajax({
		    type: options.method,
		    contentType: "application/json",
            accepts: "application/json",
			url: urlPrefix + options.url,
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