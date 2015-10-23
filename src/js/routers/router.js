/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function (param) {
            // Set the current filter to be used
            app.AppFilter = param || '';

            // Trigger a collection filter event
            app.resultsItemsCollection.trigger('filter');
        }
    });

    app.AppRouter = new AppRouter(); // Create Router
    Backbone.history.start();  // HTML5 History push
})();