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
        
        // get the potition area
        this.minX = options.minX;
        this.maxX = options.maxX;
        this.hasArea = (typeof (this.minX) !== 'undefined') && (typeof (this.maxX) !== 'undefined');
    };
    
    // update game object position
    PositionController.prototype.update = function (time) {
        var theGameObject = this.gameObject;
        
        // calculate speed based on current force
        var newSpeedX = theGameObject.get('speedX');
        newSpeedX += theGameObject.get('forceX');
        var maxSpeed = theGameObject.get('maxSpeed');
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
