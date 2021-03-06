/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define */

define([
    "backbone"
], function (Backbone) {
    'use strict';
    var GameObject = Backbone.Model.extend({
        defaults: {
            'name': 'object',
            'type': 'item',
            'active': false,
            
            'energy': 100,
            
            'posX': 0,
            'posY': 0,
            'posZ': 0,
            
            'forceX': 0,
            'forceY': 0,
            'forceZ': 0,
            
            'maxSpeed': 0,
            'speed': 0,
            'direction': 0,
            
            'speedX': 0,
            'speedY': 0,
            'speedZ': 0
        }
    });

    return GameObject;
});
