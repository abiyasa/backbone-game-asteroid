/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, window, console */

// The main screen
define([
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'views/TextGameView',
    'controller/PositionController',
    
    'plugins/requestAnimationFrame'
], function ($, _, Backbone, GameObject, TextGameView, PositionController) {
    'use strict';
    var MainScreen = Backbone.View.extend({
        className: 'main-screen',
        
        playAnimation: false,
        
        initialize: function () {
            console.log('initialize()');
            
            // init all             
            var hero = new GameObject({ speedX: 5 });
            this.heroView = new TextGameView({ model: hero });
            this.positionController = new PositionController(hero, {
                minX: 0,
                maxX: 480
            });
            
            this.$el.append(this.heroView.el);
        },
        
        // starts animation
        start: function () {
            console.log('starting animation');
            
            this.playAnimation = true;
            this.update();
        },
        
        // stop animation
        stop: function () {
            console.log('stopping animation');
            
            this.playAnimation = false;
        },
        
        update: function (time) {
            if (this.playAnimation) {
                window.requestAnimationFrame(this.update.bind(this));
            }
            
            // update
            this.positionController.update(time);
            
            this.render();
        },
        
        render: function () {
            this.heroView.render();
            
            return this;
        }
    });
    
    return MainScreen;
});
