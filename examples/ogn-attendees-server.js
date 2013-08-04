var server = require('webserver').create();
server.listen(8080, function(request, response) {
  var page = new WebPage();
  page.open('https://m.lanyrd.com/2013/ogn32/attendees/', function (status) {
    var attendees = page.evaluate(function(){
      return $('a[href^="/profile"] .title').map(function(){
        var name = $(this).text().trim(),
          bio  = $(this).next().text().trim();

        return name + ' - ' + bio;
      });
    });
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.statusCode = 200;
    attendees.forEach(function(attendee){
      response.write("* " + attendee + "\n");
    })
    response.close();
    page.close();
  });
});
