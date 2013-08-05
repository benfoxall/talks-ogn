var PORT = require('system').env.PORT || 8080;

var server = require('webserver').create();
server.listen(PORT, function(request, response) {
  var page = new WebPage();
  page.open('http://benjaminbenben.com', function (status) {

    var links = page.evaluate(function () {
      return [].reduce.call(document.querySelectorAll('a'), function(memo, a){
        var bb = a.getBoundingClientRect(),
          area = bb.width * bb.height,
          href = a.href

        if(area)
          memo[href] = (memo[href] || 0) + area;
       
        return memo;
      },{});
    });

    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.statusCode = 200;
    response.write(JSON.stringify(links));
    response.close();
    page.close();
  });
});
