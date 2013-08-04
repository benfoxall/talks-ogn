var page = new WebPage();

page.open('https://m.lanyrd.com/2013/ogn32/attendees/', function (status) {
	var attendees = page.evaluate(function(){
		return $('a[href^="/profile"] .title').map(function(){
			var name = $(this).text().trim(),
				bio  = $(this).next().text().trim();

			return name + ' - ' + bio;
		});
	});

	attendees.forEach(function(attendee){
		console.log("\n* " + attendee)
	})

	phantom.exit();
});