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
		//render left only for rendering static view elements
		
		this.update();
    },
	update: function(){
		alert("ArticleView update");
		var article = getArticle(current_article_id);
		var vars = {
			title: 		article.title, 
			date:		article.added,
			content:	article.content,
			tags:		"Article tags will be here"
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
	content_view: null,		//Backbone view holding the "real" content
	initialize: function(){
		_.bindAll(this, 'render', 'nextItem');
        
		this.render();
    },
	events: {
      'click #previous_link': 'previousItem',
	  'click #next_link': 'nextItem'
    },
	render: function(){
		alert('render naV ' + current_article_id);
		//render nav
		$(this.el).prepend("<a id='previous_link' href=''>Previous</a>");
		$(this.el).prepend("<a id='next_link' href=''>Next</a>");
	
		this.update();
    },
	update: function(){
		//update nav
		var elem = $("#previous_link"); 
		if(current_article_id == 1){
			elem.hide();
		}else{
			elem.show();
		}
		
		elem = $("#next_link");
		if(current_article_id == getArticle().id){
			elem.hide();
		}else{
			elem.show();
		}
	},
	previousItem: function(){
		alert("prev");
		//show the next article
		current_article_id = current_article_id - 1;
		this.options.content_view.render();
		this.update();
		return false;
	},
	nextItem: function(){
		alert("next");
		//show the next article
		current_article_id = current_article_id + 1;
		this.options.content_view.render();
		this.update();
		return false;
	}
});

alert('start');
var current_article_id = -1;
var article_view = new ArticleView({ el: $("#article") });
var prev_next_args = { el: $("#content"), content_view: article_view };
var prev_next_view = new PrevNextView(prev_next_args);