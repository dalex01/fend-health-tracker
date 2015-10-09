/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var SearchItems = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.SearchItem,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Backbone.LocalStorage('calories-backbone'),

	});

	// Create our global collection of **Todos**.
	app.searchItems = new SearchItems();
})();
