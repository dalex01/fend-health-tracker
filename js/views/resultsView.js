/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.ResultsView = Backbone.View.extend({

	    el: $("#list"), // DOM элемент widget'а

	    events: {
	    },

		initialize: function () {
			this.$list = $('#products-list');
			this.$main = $('#main');
			this.$total = $('#total');

			this.listenTo(app.resultsItemsCollection, 'add', this.addOne);
			this.listenTo(app.resultsItemsCollection, 'reset', this.addAll);
			this.listenTo(app.resultsItemsCollection, 'all', this.render);

			//app.resultsItemsCollection.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (app.resultsItemsCollection.length) {
				this.$main.show();
				this.$total.show();
			} else {
				this.$main.hide();
				this.$total.hide();
			}

		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (item) {
			var view = new app.ResultsItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.$list.html('');
			app.resultsItemsCollection.each(this.addOne, this);
		}
	});
})(jQuery);