/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Product Model
	// -------------

	// Our basic Search model has 'brand_id', 'brand_name', 'item_id', 'item_name' and 'calories' attributes.
	app.ResultsItemModel = Backbone.Model.extend({
		// Default attributes for the chosen product
		defaults: {
			brand_id: 0,
			brand_name: '',
			item_id: 0,
			item_name: '',
			calories: 0
		}
	});
})();