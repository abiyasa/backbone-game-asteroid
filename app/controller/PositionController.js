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
        
        // TODO check and if necessary, inject and set default gameObject positions and speed

        // get the potition area
        this.minX = options.minX;
        this.maxX = options.maxX;
        this.hasArea = (typeof (this.minX) !== 'undefined') && (typeof (this.maxX) !== 'undefined');
    };
    
    // update game object position
    PositionController.prototype.update = function (time) {
        var theGameObject = this.gameObject;

        // update position
        var newPosX = theGameObject.get('posX') + theGameObject.get('speedX');
        var newPosY = theGameObject.get('posY') + theGameObject.get('speedY');
        var newPosZ = theGameObject.get('posZ') + theGameObject.get('speedZ');
        
        // limit position based on area
        if (this.hasArea) {
            if (newPosX < this.minX) {
                newPosX = this.maxX + (newPosX - this.minX);
            }
            if (this.maxX && (newPosX > this.maxX)) {
                newPosX = this.minX + (newPosX - this.maxX);
            }
        }

        theGameObject.set({ posX: newPosX, posY: newPosY, posZ: newPosZ }, { silent: true});
    };

    return PositionController;
});
