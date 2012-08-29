/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, window, console, Math */

// The main screen
define([
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'views/TextGameView',
    'controller/PositionController',
    'controller/InputKeyboardController',
    
    'plugins/requestAnimationFrame'
], function ($, _, Backbone, GameObject, TextGameView, PositionController, InputKeyboardController) {
    'use strict';
    var MainScreen = Backbone.View.extend({
        className: 'main-screen',
        
        playAnimation: false,
        
        // play area
        PLAY_AREA: {
            minX: 0,
            maxX: 480,
            minY: 0,
            maxY: 480
        },
        
        initialize: function () {
            console.log('initialize()');
            
            // init player
            this.gameObjects = [];
            var hero = new GameObject({
                type: 'player',
                maxSpeed: 5
            });
            this.gameObjects.push(hero);
            
            // init other game objects
            var i, numOfObjects = 5;
            for (i = 0; i < numOfObjects; i++) {
                // TODO random position
                var randPosX = this.PLAY_AREA.minX +
                    (Math.random() * (this.PLAY_AREA.maxX - this.PLAY_AREA.minX));
                var randPosY = this.PLAY_AREA.minX +
                    (Math.random() * (this.PLAY_AREA.maxX - this.PLAY_AREA.minX));
                var randSpeedX = Math.random() * 2;
                var randSpeedY = Math.random() * 2;
                
                var gameObject = new GameObject({
                    posX: randPosX,
                    posY: randPosY,
                    speedX: randSpeedX,
                    speedY: randSpeedY,
                    maxSpeed: 2
                });
                this.gameObjects.push(gameObject);
            }
            
            // init views
            this.gameObjectViews = [];
            numOfObjects = this.gameObjects.length;
            for (i = 0; i < numOfObjects; i++) {
                var gameObjectView = new TextGameView({ model: this.gameObjects[i] });
                this.gameObjectViews.push(gameObjectView);
                
                this.$el.append(gameObjectView.el);
            }
            
            // init controllers
            this.controllers = [];
            var positionController = new PositionController(_.extend({ }, this.PLAY_AREA));
            this.controllers.push(positionController);
            var inputKeyboardController = new InputKeyboardController(hero, {
                movementForce: 0.1,
                context: window
            });
            
            // init position controller
            numOfObjects = this.gameObjects.length;
            for (i = 0; i < numOfObjects; i++) {
                positionController.add(this.gameObjects[i]);
            }
            
            this.controllers.push(inputKeyboardController);
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
            
            // update controllers
            var theControllers = this.controllers;
            var numOfControllers = theControllers.length;
            var i;
            for (i = 0; i < numOfControllers; i++) {
                theControllers[i].update(time);
            }
            
            this.render();
        },
        
        render: function () {
            var i, numOfObjects = this.gameObjects.length;
            for (i = 0; i < numOfObjects; i++) {
                this.gameObjectViews[i].render();
            }
            
            return this;
        }
    });
    
    return MainScreen;
});
