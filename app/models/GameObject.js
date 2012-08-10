/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define */

define([
    "backbone"
], function (Backbone) {
    'use strict';
    var GameObject = Backbone.Model.extend({
        defaults: {
            'name': 'GameObject',
            'energy': 100,
            'active': false
        }
    });

    return GameObject;
});
