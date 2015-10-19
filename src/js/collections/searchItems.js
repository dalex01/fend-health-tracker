/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Search Collection
	// ---------------

	// The collection of search results
	var SearchItemsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.SearchItemModel,

		// Save all of the found items under the 'searchcalories-backbone' namespace.
		localStorage: new Backbone.LocalStorage('searchcalories-backbone')

	});

	// Create our global collection of search results.
	app.searchItemsCollection = new SearchItemsCollection();
})();
