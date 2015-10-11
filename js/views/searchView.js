/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.SearchView = Backbone.View.extend({

	    el: $("#search"), // DOM элемент widget'а

	    events: {
	        'keyup #new-search': 'keyPressedInSearch'
	    },

		initialize: function () {
			this.$search = $('#new-search');
			this.$searchMain = this.$('#searchMain');
			this.$searchResults = this.$('#searchResults');
			this.$list = $('#search-list');

			this.listenTo(app.searchItemsCollection, 'add', this.addOne);
			this.listenTo(app.searchItemsCollection, 'reset', this.addAll);
			this.listenTo(app.searchItemsCollection, 'all', this.render);

			//app.searchItemsCollection.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (app.searchItemsCollection.length) {
				this.$searchResults.show();
			} else {
				this.$searchResults.hide();
			}
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (item) {
			var view = new app.SearchItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.$list.html('');
			app.searchItemsCollection.each(this.addOne, this);
		},

		// Generate the attributes for a new Search Item.
		searchProducts: function (e) {
			var url = "https://api.nutritionix.com/v1_1/search/" + e + "?results=0%3A20&cal_min=0&cal_max=20&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories&appId=9d3343d7&appKey=4283cbc03da532a49ad58e0048e9418f"
			$.ajax({
		        url: url,
		        dataType: 'json',
		        success: function(response) {
		        	var prArray = response.hits;
		        	if (prArray.length) {
			        	for (var item in prArray) {
							app.searchItemsCollection.create({
								brand_id: prArray[item].fields.brand_id,
			        			brand_name: prArray[item].fields.brand_name,
			        			item_id: prArray[item].fields.item_id,
			        			item_name: prArray[item].fields.item_name,
			        			calories: prArray[item].fields.nf_calories
							});
						}
		        	} else {
		        		$('#searchResults').show();
		        		$('#search-list').append('<li><div class=\'view\'><label id="product">No results for this query. Try again, please, with new query</label></div></li>');
		        	}
		        	//return products;
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
		        	// alert if ajax request was not executed correctly
			        alert(xhr.status + ' failed to get Nutritionix resources for search query ' + e + '\nUrl requested: \n' + url);
			    }
			});
		},

	    keyPressedInSearch: function (e) {
	    	var searchQuery = this.$search.val().trim();
	        if (e.keyCode === ENTER_KEY && searchQuery) {
	        	app.searchItemsCollection.reset();
	        	this.searchProducts(searchQuery);
	        	this.$search.val('');
			} else if (e.keyCode === ESC_KEY && searchQuery) {
				this.$search.val('');
			}
	    }

	});
})(jQuery);