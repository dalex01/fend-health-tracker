/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Products List View
	// ----------------------

	// Our overall ResultsView is the top-level piece of products list UI.
	app.ResultsView = Backbone.View.extend({

	    el: $("#list"), // DOM element

		// At initialization we bind to the relevant events on the `resultsItemsCollection`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting products that might be saved in *localStorage*.
		initialize: function () {
			this.$list = $('#products-list');
			this.$main = $('#main');
			this.$total = $('#total');
			this.$totalCount = $('.totalCount');

			this.listenTo(app.resultsItemsCollection, 'add', this.addOne);
			this.listenTo(app.resultsItemsCollection, 'reset', this.addAll);
			this.listenTo(app.resultsItemsCollection, 'all', this.render);
			this.listenTo(app.resultsItemsCollection, 'remove', this.render);

			app.resultsItemsCollection.fetch({reset: true});
		},

		// Re-rendering product list just means refreshing the statistics of total calories
		render: function () {
			// Calculate total calories if product list is not empty
			if (app.resultsItemsCollection.length) {
				this.$totalCount.html(app.resultsItemsCollection.calculateTotal());
				this.$main.show();
				this.$total.show();
			// Hide total statistics if product list if empty
			} else {
				this.$main.hide();
				this.$total.hide();
			}
		},

		// Add a single product item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (item) {
			var view = new app.ResultsItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the 'resultsItemsCollection' collection at once.
		addAll: function () {
			this.$list.html('');
			app.resultsItemsCollection.each(this.addOne, this);
		}
	});
})(jQuery);