//global.js

//set global variables and create views
var current_article_id = -1;
var article_view;

var prev_next_args;
var prev_next_view;

var nav_args;
var nav_view;

$(document).ready(function() {
	article_view = new ArticleView({ el: $("#article") });

	prev_next_args = { el: $("#content"), observers: [article_view] };
	prev_next_view = new PrevNextView(prev_next_args);

	nav_args = { el: $("#nav"), observers: [article_view, prev_next_view] };
	nav_view = new NavView(nav_args);
});