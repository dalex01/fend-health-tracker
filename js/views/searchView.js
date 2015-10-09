/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.SearchView = Backbone.View.extend({

	    el: $("#search"), // DOM элемент widget'а

	    events: {
	        'keyup #new-search': 'keyPressedInSearch'
	    },

		initialize: function () {
			this.$search = $('#new-search');
		},

		// Generate the attributes for a new Search Item.
		searchProducts: function (e) {
			return {
				title: 'title',
				brand: 'brand',
				choosed: false
			};
		},

	    keyPressedInSearch: function (e) {
	        if (e.keyCode === ENTER_KEY && this.$search.val().trim()) {
	        	app.searchItems.create(this.searchProducts(e));
				this.$search.val('');
			} else if (e.keyCode === ESC_KEY && this.$search.val().trim()) {
				this.$search.val('');
			}
	    }

	});
})(jQuery);