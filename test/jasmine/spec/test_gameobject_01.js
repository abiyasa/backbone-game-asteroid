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
            
            expect(gameObject.get('name')).toBe('object');
            expect(gameObject.get('active')).toBeFalsy();
        });
        
        it("has default position values", function() {
            var gameObject = new GameObject();
            
            expect(gameObject.get('posX')).toEqual(0);
            expect(gameObject.get('posY')).toEqual(0);
            expect(gameObject.get('posZ')).toEqual(0);
        });        
        
        it("has default speed values", function() {
            var gameObject = new GameObject();
            
            expect(gameObject.get('speedX')).toEqual(0);
            expect(gameObject.get('speedY')).toEqual(0);
            expect(gameObject.get('speedZ')).toEqual(0);
            
            expect(gameObject.get('maxSpeed')).toEqual(0);
        });
    });
});
