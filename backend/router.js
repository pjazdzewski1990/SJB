
var url = require("url");
var http = require("http");

function route(handle, response, request) {

    var pathname = url.parse(request.url).pathname;
	var method = request.method.toLowerCase();

  if (typeof handle[pathname] === 'object' && 
		typeof handle[pathname][method] === 'function') {
    handle[pathname][method](response, request, request.url);
  } else {
    console.log("No request handler found for " + pathname + "-" + method);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;