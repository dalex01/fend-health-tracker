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

			this.listenTo(app.searchItems, 'add', this.addOne);
			this.listenTo(app.searchItems, 'reset', this.addAll);
			this.listenTo(app.searchItems, 'all', this.render);

		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (app.searchItems.length) {
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
			app.searchItems.each(this.addOne, this);
		},

		// Generate the attributes for a new Search Item.
		searchProducts: function (e) {
			return {
				title: 'title',
				brand: 'brand',
				choosed: false
			};
		},

	    keyPressedInSearch: function (e) {
	        if (e.keyCode === ENTER_KEY && this.$search.val().trim()) {
	        	app.searchItems.create(this.searchProducts(e));
				this.$search.val('');
			} else if (e.keyCode === ESC_KEY && this.$search.val().trim()) {
				this.$search.val('');
			}
	    }

	});
})(jQuery);