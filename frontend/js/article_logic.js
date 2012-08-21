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
		
		return this;
    },
	update: function(){
		var article = getArticle(current_article_id);
		var vars = {
			title: 		article.title, 
			date:		article.added,
			content:	article.content,
			tags:		"Article tags will be here"
		};
		//set article id 
		current_article_id = article.id;
		
		// Compile the content template using underscore
        var template = _.template( $("#article_template").html(), vars );
        // Load the compiled HTML into the Backbone "el"
        this.el.html( template );
		
		return this;
	}
});

//view respoonsible for rendering and handling next/prevoius article buttons
PrevNextView = Backbone.View.extend({
	observers: null,		//Backbone views, like in observer desing pattern
	initialize: function(){
		_.bindAll(this, 'render', 'nextItem', 'previousItem');
        
		this.render();
    },
	events: {
      'click #previous_link': 'previousItem',
	  'click #next_link': 'nextItem'
    },
	render: function(){
		//render nav
		$(this.el).prepend("<a id='previous_link' href=''>Previous</a>");
		$(this.el).prepend("<a id='next_link' href=''>Next</a>");
	
		this.update();
		
		return this;
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
		
		return this;
	},
	previousItem: function(){
		//show the next article
		current_article_id = current_article_id - 1;
		this.notifyAll();
		this.update();
		return false;
	},
	nextItem: function(){
		//show the next article
		current_article_id = current_article_id + 1;
		this.notifyAll();
		this.update();
		return false;
	},
	notifyAll: function(){
		for(i=0; i< this.options.observers.length; i++){
			this.options.observers[i].update();
		}
	}
});

alert('start');
var current_article_id = -1;

var article_view = new ArticleView({ el: $("#article") });

var prev_next_args = { el: $("#content"), observers: [article_view] };
var prev_next_view = new PrevNextView(prev_next_args);

var nav_args = { el: $("#nav"), observers: [article_view, prev_next_view] };
var nav_view = new NavView(nav_args);