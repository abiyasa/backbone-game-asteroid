/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone'
    
], function ($, _, Backbone) {
    'use strict';
    
    var TextGameView = Backbone.View.extend({
        DEBUG_TAG: 'TextGameView',
        
        initialize: function () {
            console.log(this.DEBUG_TAG, 'initialize()');
            
            // TODO bind event here!
        },
        
        render: function () {
            var gameObject = this.model;
            
            // print all game object property
            var debugString = '';
            var props = ['name', 'energy', 'active'];
            _.each(props, function (prop) {
                debugString += prop + '=' + gameObject.get(prop) + ';';
            });
            $(this.el).html(debugString);
            
            return this;
        }
    });

    return TextGameView;
});
