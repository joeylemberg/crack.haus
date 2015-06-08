var Static = {
	
	about: function(){
		
		$("#lobby-title").html("about");
		$("#lobby").html("Realtime multiplayer games.  In browser with no installation.  Peer-to-peer quickness.");
		
		var html = "<h3>This is crack.haus</h3>";
		
		html += "<p>crack.haus is the place to play multiplayer games in the browser.  Play with friends and/or strangers right now, without downloading, installing, paying, or watching ads.</p>";
		
		html += "<p>So what are you waiting for?  Start playing and get hooked already!</p>";
		
		html += "<p><small class='dimmed'>Please note that his site is still in super early beta, so many features are in a state of development.</small></p>";
		
		$("#lobby").html(html);
		
	},
	
	team: function(){
		$("#lobby-title").html("meet the crack.haus team");
		
		var max = "<p>Max is an American software engineer and the creator of Extreme Programming, a software development methodology which eschews rigid formal specification for a collaborative and iterative design process. Max was one of the 17 original signatories of the Agile Manifesto, the founding document for agile software development. Extreme and Agile methods are closely associated with Test Driven Development, of which Max is perhaps the leading proponent.</p>";
		var kat = "<p>Kat is an American Software Engineer who is best known for her work as the co-creator of the Mozilla Firefox internet browser with Dave Hyatt. In 2005, she was nominated for Wired magazine's top Rave Award, Renegade of the Year, opposite Larry Page, Sergey Brin and Jon Stewart. She was also a part of Rolling Stone magazine's 2005 hot list. From 2007, she worked for Facebook as Director of Product until resigning in early 2013.</p>";
		var lily = "<p>Lily, also known as 'The Great Quux', and GLS /ˈɡlɪs/, is an American computer scientist who has played an important role in designing and documenting several computer programming languages.</p>";
		var seven = "<p>Seven, alias anakata, is a Swedish computer specialist, known as the former co-owner of the web hosting company PRQ and co-founder of the BitTorrent site The Pirate Bay together with Fredrik Neij and Peter Sunde.</p>";

		html = "<table class='team-table'>";
		html += "<tr>";
		html += "<tr><th>'Tuxedo' Max</th><th>Kat</th><th>Lily</th><th>Seven</th></tr>";
		html += "<tr><td><img src='/static/lobbies/img/max.png' /></td><td><img src='/static/lobbies/img/kat.png' /></td><td><img src='/static/lobbies/img/lily.png' /></td><td><img src='/static/lobbies/img/seven.png' /></td></tr>";
		html += "<tr><td>" + max + "</td><td>" + kat + "</td><td>" + lily + "</td><td>" + seven + "</td></tr>";
		html += "</table>";
		
		
		$("#lobby").html(html);
	},
	
	terms: function(){
		
		$("#lobby-title").html("terms &amp; conditions");
		
		var html = "<p>crack.haus has not yet been launched in any form yet.</p>";
		html += "<p>Use at your own risk while the site is still in early development.</p>";
		
		$("#lobby").html(html);
		
	},
	
	contact: function(){
		
		$("#lobby-title").html("contact");
		
		var html = "<p>Inquiries related to crack.haus should be sent to:</p>";
		html += "<p>Joey, <a href='mailto:joeylemberg@gmail.com'>joeylemberg@gmail.com</a></p>";
		html += "<p>or Forrest, <a href='mailto:forrestwalker99@gmail.com'>forrestwalker99@gmail.com</a></p>";
		
		$("#lobby").html(html);
	}
	
	
	
	
	
	
}