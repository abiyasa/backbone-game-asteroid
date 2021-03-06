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
        className: 'game-object',
        
        initialize: function () {
            console.log('initialize()');
            
            var gameObject = this.model;
            if (gameObject.get('type') === 'player') {
                this.className += ' main-player';
                this.$el.addClass('main-player');
                
                console.log('this is player, changing className to ', this.className);
            } else {
                console.log('this is ', gameObject.get('type'), 'className is', this.className);
            }
        },
        
        render: function () {
            var gameObject = this.model;
            
            // print game object properties
            var debugString = gameObject.get('name') + ' (' +
                gameObject.get('energy') + ')';
            this.$el.html(debugString);
            
            // update position
            this.$el.css({
                top: gameObject.get('posY'),
                left: gameObject.get('posX')
            });
                
            return this;
        }
    });

    return TextGameView;
});
