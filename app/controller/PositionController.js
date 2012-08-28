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
        var dimensions = [ 'X', 'Y' ];
        this.axis = dimensions;
        
        // get the potition area
        var numOfDimensions = dimensions.length;
        var i, key, value;
        var hasArea = true;
        for (i = 0; i < numOfDimensions; i++) {
            // get min
            key = 'min' + dimensions[i];
            this[key] = value = options[key];
            hasArea = hasArea && (typeof (value) !== 'undefined');
            
            // get max
            key = 'max' + dimensions[i];
            this[key] = value = options[key];
            hasArea = hasArea && (typeof (value) !== 'undefined');
        }
        this.hasArea = hasArea;
    };
    
    // update game object position
    PositionController.prototype.update = function (time) {
        var theGameObject = this.gameObject;
        
        // calculate speed based on current force        
        var maxSpeed = theGameObject.get('maxSpeed');

        var newSpeedX = theGameObject.get('speedX');
        newSpeedX += theGameObject.get('forceX');
        if (newSpeedX > maxSpeed) {
            newSpeedX = maxSpeed;
        } else if (newSpeedX < -maxSpeed) {
            newSpeedX = -maxSpeed;
        }

        var newSpeedY = theGameObject.get('speedY');
        var newSpeedZ = theGameObject.get('speedZ');
        
        // update position
        var newPosX = theGameObject.get('posX') + newSpeedX;
        var newPosY = theGameObject.get('posY') + newSpeedY;
        var newPosZ = theGameObject.get('posZ') + newSpeedZ;
        
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
            
            speedX: newSpeedX,
            speedY: newSpeedY,
            speedZ: newSpeedZ
        }, { silent: true});
    };

    return PositionController;
});
