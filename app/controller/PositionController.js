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
        
        // TODO inject and set default gameObject positions and speed
        
        // TODO get the movement min and max position
    };
    
    // update game object position
    PositionController.prototype.update = function (time) {
        var theGameObject = this.gameObject;
        
        var newPosX = theGameObject.get('posX') + theGameObject.get('speedX');
        var newPosY = theGameObject.get('posY') + theGameObject.get('speedY');
        var newPosZ = theGameObject.get('posZ') + theGameObject.get('speedZ');
        
        theGameObject.set({ posX: newPosX, posY: newPosY, posZ: newPosZ }, { silent: true});
    };

    return PositionController;
});
