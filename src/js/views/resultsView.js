/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Products List View
	// ----------------------

	// Our overall ResultsView is the top-level piece of products list UI.
	app.ResultsView = Backbone.View.extend({

	    el: $("#list"), // DOM element

		// At initialization we bind to the relevant events on the `resultsItemsCollection`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting products that might be saved in *localStorage*.
		initialize: function () {
			this.$list = $('#products-list');
			this.$main = $('#main');
			this.$total = $('#total');
			this.$totalCount = $('.totalCount');
			this.$datepicker = $("#datepicker");
			//this.dates = app.resultsItemsCollection.each(function(item){return item.attributes.date}, this);

			this.listenTo(app.resultsItemsCollection, 'add', this.addOne);
			this.listenTo(app.resultsItemsCollection, 'reset', this.addAll);
			this.listenTo(app.resultsItemsCollection, 'all', this.render);
			this.listenTo(app.resultsItemsCollection, 'remove', this.render);
			this.listenTo(app.resultsItemsCollection, 'filter', this.filterAllDates);

			this.$datepicker.datepicker({
				showOtherMonths: true,
				selectOtherMonths: true,
			    dateFormat: "yy-mm-dd",
			    onSelect: function(dateText) {
			        $(this).change();
			    }
		    })
		    .change(function() {
			    window.location.href = '#' + this.value;
			    //this.navigate(this.value);
		    });
			this.$datepicker.datepicker("setDate", Date.now());
			app.resultsItemsCollection.fetch({reset: true});
			this.$totalCount.html(app.resultsItemsCollection.calculateTotal());
		},

		// Re-rendering product list just means refreshing the statistics of total calories
		render: function () {
			// Calculate total calories if product list is not empty
			if (app.resultsItemsCollection.length) {
				this.$totalCount.html(app.resultsItemsCollection.calculateTotal());
				this.$main.show();
				this.$total.show();
			// Hide total statistics if product list if empty
			} else {
				this.$main.hide();
				this.$total.hide();
			}
			/*this.$datepicker.datepicker({
									      showOtherMonths: true,
									      selectOtherMonths: true,
										  beforeShowDay: function(date) {
										      // check if date is in your array of dates
										      if($.inArray(date, this.dates)) {
										         // if it is return the following.
										         return [true, 'ui-state-active', 'tooltip text'];
										      } else {
										         // default
										         return [true, '', ''];
										      }
										   }
									    });*/
		},

		// Add a single product item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (item) {
			var view = new app.ResultsItemView({ model: item });
			this.$list.append(view.render().el);
		},

		// Add all items in the 'resultsItemsCollection' collection at once.
		addAll: function () {
			this.$list.html('');
			app.resultsItemsCollection.each(this.addOne, this);
		},

		filterOne: function (product) {
			//console.log('in filterOne')
			product.trigger('visible');
		},

		filterAllDates: function() {
			//console.log('in filterAllDates')
			app.resultsItemsCollection.each(this.filterOne, this);
		}
	});
})(jQuery);