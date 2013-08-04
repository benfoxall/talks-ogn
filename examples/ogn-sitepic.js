var server = require('webserver').create();
server.listen(8080, function(request, response) {
  var page = new WebPage();
  page.open('http://oxford.geeknights.net/', function (status) {
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;

    // give time for the page to render
    setTimeout(function(){
      response.write('data:image/png;base64,' + page.renderBase64('png'));
      response.close();
      page.close();
    },100);
  });
});
