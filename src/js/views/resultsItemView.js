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
			app.AppFilter = Date.now();

			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the the product item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.toggleVisible();
			return this;
		},

		toggleVisible: function () {
			var date = new Date(this.model.get('date'));
			date.year = date.getFullYear();
			date.month = date.getMonth();
			date.day = date.getDate();

			var filterDate = new Date(app.AppFilter);
			filterDate.year = filterDate.getFullYear();
			filterDate.month = filterDate.getMonth();
			filterDate.day = filterDate.getDate();
			if (date.year !== filterDate.year || date.month !== filterDate.month || date.day !== filterDate.day) {
				this.$el.addClass('hidden');
			}
			else {//if (date.year === filterDate.year && date.month === filterDate.month && date.day === filterDate.day) {
				this.$el.removeClass('hidden');
			}
		},

		isHidden: function() {

		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}

	});
})(jQuery);
