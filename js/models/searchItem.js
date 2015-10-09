/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.SearchItem = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			brand_id: 0,
			brand_name: '',
			item_id: 0,
			item_name: '',
			nf_calories: 0,
			choosed: false
		},

		// Toggle the `choosed` state of this todo item.
		choosed: function () {
			this.save({
				choosed: !this.get('choosed')
			});
		}
	});
})();