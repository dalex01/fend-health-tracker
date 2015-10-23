/*global Backbone, jQuery, _, ENTER_KEY */
/* File is not used and created for future development */

var app = app || {};

(function ($) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {

        }

    });

    var router = new AppRouter(); // Create Controller
    Backbone.history.start();  // HTML5 History push
})();