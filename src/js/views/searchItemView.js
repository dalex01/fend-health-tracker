/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Search Item View
	// --------------

	// The DOM element for a search item...
	app.SearchItemView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#searchitem-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .view': 'addProduct' // if search item is clicked it should be added to product list
		},

		// Re-render the the search item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		// Add clicked search item to product list (collection) and clear search results
		addProduct: function () {
			app.resultsItemsCollection.create({
				item_id: this.model.get('item_id'),
				item_name: this.model.get('item_name'),
				brand_id: this.model.get('brand_id'),
				brand_name: this.model.get('brand_name'),
				calories: this.model.get('calories'),
				date: this.model.get('date')
			});
			app.searchItemsCollection.reset();
		}

	});
})(jQuery);