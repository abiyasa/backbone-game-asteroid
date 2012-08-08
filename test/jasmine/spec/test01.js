/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject'
    
], function ($, _, Backbone, GameObject) {
    'use strict';
    
    describe("Simple Test game object", function () {
        it("has default values", function() {
            var gameObject = new GameObject();
            
            expect(gameObject.get('name')).toBe('GameObject');
            expect(gameObject.get('active')).toBeFalsy();
        });
    });
});
