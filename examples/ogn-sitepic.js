var PORT = require('system').env.PORT || 8080;

var server = require('webserver').create();
server.listen(PORT, function(request, response) {
  var page = new WebPage();
  page.viewportSize = { width: 900 , height: 1700 };
  page.clipRect = { top: 0, left: 0, width: 900, height: 600 };
  page.open('http://oxford.geeknights.net/', function (status) {
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;

    // give time for the page to render
    setTimeout(function(){
      response.setHeader('Access-Control-Allow-Origin','*');
      response.write('data:image/png;base64,' + page.renderBase64('png'));
      response.close();
      page.close();
    },100);
  });
});
