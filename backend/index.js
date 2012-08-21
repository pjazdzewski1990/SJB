
var server = require("./server");
var router = require("./router");
var handlers = require("./handlers");

var handle = {}
handle["/"] = {'get':handlers.start};
handle["/article"] = {'get':handlers.getArticle};

handle["/styles/style.css"] = {'get':handlers.style};
handle["/styles/reset.css"] = {'get':handlers.style};

handle["/js/article_logic.js"] = {'get':handlers.js};
handle["/js/nav_logic.js"] = {'get':handlers.js};
handle["/js/global.js"] = {'get':handlers.js};
handle["/js/underscore.js"] = {'get':handlers.js};
handle["/js/HTTPhelp.js"] = {'get':handlers.js};
handle["/js/json2.js"] = {'get':handlers.js};
handle["/js/backbone-min.js"] = {'get':handlers.js};

handle["/images/main-bg.jpg"] = {'get':handlers.image};
handle["/images/about.png"] = {'get':handlers.image};
handle["/images/github.png"] = {'get':handlers.image};
handle["/images/home.png"] = {'get':handlers.image};
handle["/images/me.png"] = {'get':handlers.image};

server.start(router.route, handle);