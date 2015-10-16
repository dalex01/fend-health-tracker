/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
        /*    "": "start", // Empty hash-tag
            "!/": "start", // First page
            "!/success": "success", // Блок удачи
            "!/error": "error" // Блок ошибки*/
        }
    /*
        start: function () {
            $(".block").hide(); // Hide all blocks
            $("#start").show(); // SHow required
        },

        success: function () {
            $(".block").hide();
            $("#success").show();
        },

        error: function () {
            $(".block").hide();
            $("#error").show();
        }
    */
    });

    var router = new AppRouter(); // Create Controller
    Backbone.history.start();  // HTML5 History push
})();