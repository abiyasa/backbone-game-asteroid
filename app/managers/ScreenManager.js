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
        
        showView: function (theView) {
            // check if the current view is being shown
            if (this.currentView !== theView) {
                this.clearView();
                $(this.el).append(theView.render().el);
                
                this.currentView = theView;
            }

            return this;
        },
        
        // clear the currently shown view
        clearView: function () {
            $(this.el).empty();
            
            if (this.currentView) {
                this.currentView.off();
                this.currentView = undefined;
            }
        }
    });
    
    return ScreenManager;
});
