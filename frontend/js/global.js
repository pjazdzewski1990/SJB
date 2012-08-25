//global.js

//set global variables and create views
var current_article_id = -1;
var article_view;

var prev_next_view;

var nav_view;

var router;

var controller;

$(document).ready(function() {
	article_view = new ArticleView({ el: $("#article") });

	var prev_next_args = { el: $("#article_nav"), observers: [] };
	prev_next_view = new PrevNextView(prev_next_args);

	var nav_args = { el: $("#nav"), observers: [] };
	nav_view = new NavView(nav_args);
	
	var article_controller_args = { observers: [article_view, prev_next_view] };
	controller = new ArticleController(article_controller_args);
	Backbone.history.start({pushState: true});
});