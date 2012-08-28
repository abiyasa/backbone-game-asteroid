/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone'
    
], function ($, _, Backbone) {
    'use strict';

    // For controlling game object position
    var PositionController = function (gameObject, options) {
        this.gameObject = gameObject;
        options = options || {};
        
        // dimension, 2D or 3D
        var axises = [ 'X', 'Y', 'Z' ];
        this.axises = axises;
        
        // get the potition area
        var numOfAxises = axises.length;
        var i, key, value;
        var hasArea = false;
        for (i = 0; i < numOfAxises; i++) {
            // get min
            key = 'min' + axises[i];
            this[key] = value = options[key];
            hasArea = hasArea || (typeof (value) !== 'undefined');
            
            // get max
            key = 'max' + axises[i];
            this[key] = value = options[key];
            hasArea = hasArea || (typeof (value) !== 'undefined');
        }
        this.hasArea = hasArea;
    };
    
    // update game object position
    PositionController.prototype.update = function (time) {
        var theGameObject = this.gameObject;
        
        var maxSpeed = theGameObject.get('maxSpeed');
        var axises = this.axises;
        var numOfAxises = axises.length;
        
        var i, key, speed;
        var newSpeeds = {};
        for (i = 0; i < numOfAxises; i++) {
            key = axises[i];
            
            // calculate speed based on current force            
            speed = theGameObject.get('speed' + key) + theGameObject.get('force' + key);
            if (speed > maxSpeed) {
                speed = maxSpeed;
            } else if (speed < -maxSpeed) {
                speed = -maxSpeed;
            }
            newSpeeds[key] = speed;
        }
        
        // update position
        var newPosX = theGameObject.get('posX') + newSpeeds.X;
        var newPosY = theGameObject.get('posY') + newSpeeds.Y;
        var newPosZ = theGameObject.get('posZ') + newSpeeds.Z;
        
        // limit position based on area
        if (this.hasArea) {
            if (newPosX < this.minX) {
                newPosX = this.maxX + (newPosX - this.minX);
            }
            if (this.maxX && (newPosX > this.maxX)) {
                newPosX = this.minX + (newPosX - this.maxX);
            }
        }

        // update game object
        theGameObject.set({
            posX: newPosX,
            posY: newPosY,
            posZ: newPosZ,
            
            speedX: newSpeeds.X,
            speedY: newSpeeds.Y,
            speedZ: newSpeeds.Z
        }, { silent: true});
    };

    return PositionController;
});
