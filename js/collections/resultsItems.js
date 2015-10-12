/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var ResultsItemsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.ResultsItemModel,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Backbone.LocalStorage('calories-backbone'),

		// Filter down the list to only todo items that are still not finished.
		calculateTotal: function () {
			var sum = 0;
			this.each(function(model) {
				sum += model.get('calories');
			});
			return sum;
		},
	});

	// Create our global collection of **Todos**.
	app.resultsItemsCollection = new ResultsItemsCollection();
})();
