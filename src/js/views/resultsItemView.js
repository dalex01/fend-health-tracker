/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Product Item View
	// --------------

	// The DOM element for a product item...
	app.ResultsItemView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single product item.
		template: _.template($('#productitem-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .destroy': 'clear', // if remove button is clicked - remove item from the list and collection
		},

		// The ResultsItemView listens for changes to its model (destroy event).
		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
		},

		// Re-render the the product item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}

	});
})(jQuery);
