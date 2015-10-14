/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Search View
	// ---------------

	// Our overall SearchView is the top-level piece of search UI.
	app.SearchView = Backbone.View.extend({

	    el: $("#search"), // DOM element

	    // The DOM event specific for the search view
	    events: {
	        'keyup #new-search': 'keyPressedInSearch' // search entered query if ENTER is pressed in search input
	    },

	    // At initialization we bind to the relevant events on the `searchItemsCollection`
		// collection, when items are added or changed.
		initialize: function () {
			this.$search = $('#new-search');
			this.$searchMain = this.$('#searchMain');
			this.$searchResults = this.$('#searchResults');
			this.$list = $('#search-list');
			this.$loading = $('#loading');

			this.listenTo(app.searchItemsCollection, 'add', this.addOne);
			this.listenTo(app.searchItemsCollection, 'reset', this.addAll);
			this.listenTo(app.searchItemsCollection, 'all', this.render);
		},

		// Re-rendering the SearchView just means show/hide results of the search
		render: function () {
			if (app.searchItemsCollection.length) {
				this.$searchResults.show();
			} else {
				this.$searchResults.hide();
			}
		},

		// Add a single search item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (item) {
			var view = new app.SearchItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the 'searchItemsCollection' collection at once.
		addAll: function () {
			this.$list.html('');
			app.searchItemsCollection.each(this.addOne, this);
		},

		// Query search results via API and create new search models according to received response.
		searchProducts: function (e) {

			var self = this;
			// Show 'Loading...' notification
		    self.$searchResults.show();
		    self.$loading.show();

			var url = "https://api.nutritionix.com/v1_1/search/" + e + "?results=0%3A20&cal_min=0&cal_max=20&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories&appId=9d3343d7&appKey=4283cbc03da532a49ad58e0048e9418f"
			$.ajax({
		        url: url,
		        dataType: 'json',
		        success: function(response) {
		        	var prArray = response.hits;
		        	// If search return results
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
						// Hide 'Loading...' notification when everything is loaded
						self.$loading.hide();
					// Else if search don't find anything
		        	} else {
		        		// Hide 'Loading...' notification when everything is loaded
		        		self.$loading.hide();
		        		// Show notification that nothing is found
		        		self.$searchResults.show();
		        		self.$list.append('<li><div class=\'view\'><label id="product">No results for this query. Try again, please.</label></div></li>');
		        	}
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
		        	// alert if ajax request was not executed correctly
			        alert(xhr.status + ' failed to get Nutritionix resources for search query ' + e + '\nUrl requested: \n' + url);
			    }
			});
		},

		// Handle keyup event for ENTER or ESC keys
	    keyPressedInSearch: function (e) {
	    	var searchQuery = this.$search.val().trim();
	    	// Request search results via API if ENETER is pressed in search input and search query is not empty
	        if (e.keyCode === ENTER_KEY && searchQuery) {
	        	this.searchProducts(searchQuery);
	        	this.$search.val('');
	       	// Else clear search input if ESC key is pressed and search query is not empty
			} else if (e.keyCode === ESC_KEY && searchQuery) {
				this.$search.val('');
			}
	    }

	});
})(jQuery);