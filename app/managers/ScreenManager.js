/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

// Manages the screens
define([
    'jquery',
    'lodash',
    'backbone'
], function ($, _, Backbone) {
    'use strict';
    var ScreenManager = Backbone.View.extend({
        
        initialize: function () {
            // TODO get initialState
            
            // TODO set current state
        },
        
        showView: function (theView) {
            this.clearView();
            $(this.el).append(theView.render().el);
            return this;
        },
        
        // clear the currently shown view
        clearView: function () {
            $(this.el).empty();
        }
    });
    
    return ScreenManager;
});
