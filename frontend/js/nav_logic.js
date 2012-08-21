
//view respoonsible for rendering and handling site navigation buttons
NavView = Backbone.View.extend({
	observers: null,		//Backbone views, like in observer desing pattern
	initialize: function(){
		_.bindAll(this, 'render');
        
		this.render();
    },
	events: {
      'click #bookmark_home_link': 'goHome'
    },
	render: function(){
		//render nav
		// Compile the content template using underscore
        var template = _.template( $("#nav_template").html(), null );
        // Load the compiled HTML into the Backbone "el"
        this.el.html( template );
	
		this.update();
		
		return this;
    },
	update: function(){
		//update view
		
		//.. nothing to do, because nav isn't dynamic for the moment
		return this;
	},
	notifyAll: function(){
		for(i=0; i< this.options.observers.length; i++){
			this.options.observers[i].update();
		}
	},
	goHome: function(){
		//show the next article
		current_article_id = getArticle().id;
		this.update();
		this.notifyAll();
		return false;
	}
});
