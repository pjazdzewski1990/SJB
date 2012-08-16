
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var url = require("url");
var client = new Db('blog', new Server('127.0.0.1', 27017, {}));
var fs = require('fs');

function start(response, request, adr) {
	console.log("Request handler 'get start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('../frontend/index.html', function (err, html) {
		if (err) {
			console.log("Index.html: " +err);
			throw err; 
		}
        response.write(html);  
        response.end();  
	});
}

function style(response, request, adr) {
	console.log("Request handler 'get style' was called.");

    response.writeHead(200, {"Content-Type": "text/css"});
	var resource = adr.substr(adr.lastIndexOf("/")+1);
    fs.readFile('../frontend/styles/'+resource, function (err, css) {
		if (err) {
			console.log("Resource " + resource + " not found " +err);
			throw err; 
		}
        response.write(css);  
        response.end();  
	});
}

function js(response, request, adr) {
	console.log("Request handler 'get js' was called.");

    response.writeHead(200, {"Content-Type": "application/javascript"});
	var resource = adr.substr(adr.lastIndexOf("/")+1);
    fs.readFile('../frontend/js/'+resource, function (err, js) {
		if (err) {
			console.log("Resource " + resource + " not found " +err);
			throw err; 
		}
        response.write(js);  
        response.end();  
	});
}

function image(response, request, adr) {
	console.log("Request handler 'get image' was called.");

	var resource = adr.substr(adr.lastIndexOf("/")+1);
	var ext = adr.substr(adr.lastIndexOf(".")+1).toLowerCase();
    response.writeHead(200, {"Content-Type": "image/"+ext});
    fs.readFile('../frontend/images/'+resource, function (err, js) {
		if (err) {
			console.log("Resource " + resource + " not found " +err);
			throw err; 
		}
        response.write(js);  
        response.end();  
	});
}

function findById(id_num, response) {
	var find = function(err, collection) {
			collection.find({id:id_num}).toArray(
				function(err, results) {
					response.write(JSON.stringify(results));
					response.end();
					client.close();
				}
			);
		};
	
	client.open(function(err, pClient) {
		client.collection('article', find);
	});
}

function findLast(response){
	var find = function(err, collection) {
		collection.find().sort([['id','desc']]).limit(1).toArray(
			function(err, results) {
					response.write(JSON.stringify(results));
					response.end();
					client.close();
				}
			);
		};
	
	client.open(function(err, pClient) {
		client.collection('article', find);
	});
}

function getArticle(response, request, adr) {
	var query = url.parse(request.url).query;

    response.writeHead(200, {"Content-Type": "text/html"});
	if(query){
		//get only the one with id="id"
		var id = parseInt(query);
		console.log("Request handler 'get article' id " + id + " was called.");
		findById(id, response);
	}else{
		//get the last one, with the biggest id
		console.log("Request handler 'get article' id (last) was called.");
		findLast(response);
	}
}

exports.start = start;
exports.style = style;
exports.js = js;
exports.image = image;
exports.getArticle = getArticle;