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
		
		//this.update();
		
		return this;
    },
	update: function(){
		var article = getArticle(current_article_id);
		var vars = {
			title: 		article.title, 
			date:		article.added,
			content:	article.content,
			comments:	this.parseComments(article.comments)
		};
		//set article id 
		current_article_id = article.id;
		
		// Compile the content template using underscore
        var template = _.template( $("#article_template").html(), vars );
        // Load the compiled HTML into the Backbone "el"
        this.el.html( template );
		
		return this;
	},
	parseComments: function (comments_arr){
		//parse embedded comments into HTML 
		var html = "<div>";
		for(var i=0;i<comments_arr.length;i++){
			var vars = {
				author: 	comments_arr[i].author, 
				date:		comments_arr[i].date,
				comment:	comments_arr[i].comment
			};
			var template = _.template( $("#comment_template").html(), vars );
			// Load the compiled HTML 
			html+=template;
		}
		
		html += "</div>";
		return html;
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
		// ..nav is dynamic so we create it in update
	
		//this.update();
		
		return this;
    },
	update: function(){
		//update nav
		//start by cleaning
		$(this.el).empty();
		
		//should we show link to previous?
		if(current_article_id <= 1){
			//hide/disable/remove the link
		}else{
			//show/enable/append the link
			$(this.el).append("<a id='previous_link' href='#" + (current_article_id-1) + "'>Previous</a>");
		}
		//should we show link to next?
		if(current_article_id >= getArticle().id){
			//hide/disable/remove the link
		}else{
			//show/enable/append the link
			$(this.el).append("<a id='next_link' href='#" + (current_article_id+1) + "'>Next</a>");
		}
		
		return this;
	},
	previousItem: function(){
		//show the next article
		this.notifyAll(); //notify something if needed
		return true;
	},
	nextItem: function(){
		//show the next article
		this.notifyAll(); //notify something if needed
		return true;
	},
	notifyAll: function(){
		for(i=0; i< this.options.observers.length; i++){
			this.options.observers[i].update();
		}
	}
});

//controller for article related actions
ArticleController = Backbone.Controller.extend({observers: null,
	initialize: function(options) {
		this.observers = options.observers;
	},
	routes: {
		"":		"showRecent",
		":id":	"getArticle"    // http://some_adress#id
	},
	showRecent: function() {
		//by default show recent article
		current_article_id = -1;
		this.notifyAll();
	},
	getArticle: function(id) {
		//navigate to article with specific id 
		current_article_id = id;
		this.notifyAll();
	},
	notifyAll: function(){
		for(var i=0; i< this.observers.length; i++){
			this.observers[i].update();
		}
	}
});
