/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Chosen products Collection
	// --------------------------

	// The collection of chosen producst
	var ResultsItemsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.ResultsItemModel,

		// Save all of the chosen items under the 'resultscalories-backbone' namespace.
		localStorage: new Backbone.LocalStorage('resultscalories-backbone'),

		// Calcuate total number of calories for chosen products.
		calculateTotal: function () {
			var sum = 0;
			this.each(function(model) {
				sum += model.get('calories');
			});
			return sum;
		},
	});

	// Create our global collection of chosen products.
	app.resultsItemsCollection = new ResultsItemsCollection();
})();
