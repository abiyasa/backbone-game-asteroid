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
        
        var i, key, speed, pos;
        var changedProperties = {};
        for (i = 0; i < numOfAxises; i++) {
            key = axises[i];
            
            // calculate speed based on current force            
            speed = theGameObject.get('speed' + key) + theGameObject.get('force' + key);
            if (speed > maxSpeed) {
                speed = maxSpeed;
            } else if (speed < -maxSpeed) {
                speed = -maxSpeed;
            }
            changedProperties['speed' + key] = speed;

            // update positions
            pos = theGameObject.get('pos' + key) + speed;

            // limit position based on area
            if (this.hasArea) {
                if (pos < this['min' + key]) {
                    pos = this.maxX + (pos - this.minX);
                }
                if (this.maxX && (pos > this.maxX)) {
                    pos = this.minX + (pos - this.maxX);
                }
            }
            changedProperties['pos' + key] = pos;
        }

        // update game object properties
        theGameObject.set(changedProperties, { silent: true});
    };

    return PositionController;
});
