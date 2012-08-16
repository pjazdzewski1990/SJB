/**
 * Make sure that HTThelp.js is included and available for this script
**/
//for rendering articles in #article_template div
ArticleView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
        this.render();
    },
	render: function(){
		alert("ArticleView render");
		var article = getArticle(current_article_id);
		var vars = {
			title: 		article.title, 
			date:		article.added,
			content:	article.content,
			tags:		"Tu będą tagi"
		};
		//set article id 
		current_article_id = article.id;
		alert("current_article_id" + current_article_id);
		
		// Compile the content template using underscore
        var template = _.template( $("#article_template").html(), vars );
        // Load the compiled HTML into the Backbone "el"
        this.el.html( template );
    }
});

//view respoonsible for rendering and handling next/prevoius article buttons
PrevNextView = Backbone.View.extend({
	view: null,		//Backbone view holding the "real" content
	initialize: function(){
		_.bindAll(this, 'render', 'nextItem');
        this.render();
    },
	events: {
      'click #previous_link': 'previousItem',
	  'click #next_link': 'nextItem'
    },
	render: function(){
		alert('render naV');
		//remove old nav links
		$(this.el).empty();
		//render nav
		if(current_article_id > 1){
			alert("Dodaje prev do " + $(this.el));
			$(this.el).append("<a id='previous_link' href=''>Previous</a>");
		}
		if(current_article_id < getArticle().id){
			alert("Dodaje next do " + $(this.el));
			$(this.el).append("<a id='previous_link' href=''>Previous</a>");
		}
    },
	previousItem: function(){
		alert("prev");
		//show the next article
		current_article_id = current_article_id - 1;
		alert("prevoisuitem"+current_article_id);
		this.view.render();
		this.render();
		return false;
	},
	nextItem: function(){
		alert("next");
		//show the next article
		current_article_id = current_article_id + 1;
		alert("nextitem"+current_article_id);
		this.view.render();
		this.render();
		return false;
	}
});

alert('start');
var current_article_id = -1;
var article_view = new ArticleView({ el: $("#article") });
alert(article_view);
var prev_next_view = new PrevNextView({ el: $("#prev_next"), view: article_view });