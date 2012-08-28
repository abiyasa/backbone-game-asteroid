/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console, jasmine, describe, it, beforeEach, afterEach, expect */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'controller/PositionController'
    
], function ($, _, Backbone, GameObject, PositionController) {
    'use strict';
        
    describe('PositionController', function () {
        it('inits with a default game object', function () {
            var gameObject = new GameObject();
            var positionController = new PositionController(gameObject);

            expect(gameObject.get('posX')).toEqual(0);
            expect(gameObject.get('posY')).toEqual(0);
            expect(gameObject.get('posZ')).toEqual(0);

            expect(gameObject.get('speedX')).toEqual(0);
            expect(gameObject.get('speedY')).toEqual(0);
            expect(gameObject.get('speedZ')).toEqual(0);
        });
        
        it('inits with game object & initial config', function () {
            var gameObject = new GameObject({
                posX: 10,
                posY: 20,
                posZ: 30,
                speedX: 5,
                speedY: 6,
                speedZ: -1,
                maxSpeed: 10
            });
            var positionController = new PositionController(gameObject);

            expect(gameObject.get('posX')).toEqual(10);
            expect(gameObject.get('posY')).toEqual(20);
            expect(gameObject.get('posZ')).toEqual(30);

            expect(gameObject.get('speedX')).toEqual(5);
            expect(gameObject.get('speedY')).toEqual(6);
            expect(gameObject.get('speedZ')).toEqual(-1);
        });

        it('inits without min and max positon limitation', function () {
            var gameObject = new GameObject();
            var positionController = new PositionController(gameObject);

            expect(positionController.minX).toBeUndefined();
            expect(positionController.minY).toBeUndefined();
            expect(positionController.maxX).toBeUndefined();
            expect(positionController.maxY).toBeUndefined();
            expect(positionController.hasArea).toBe(false);
        });
        
        it('inits with min and max positon on options', function () {
            var gameObject = new GameObject();
            var positionController = new PositionController(gameObject, {
                minX: 0,
                maxX: 100,
                minY: -100,
                maxY: 200
            });

            expect(positionController.minX).toEqual(0);
            expect(positionController.minY).toEqual(-100);
            expect(positionController.maxX).toEqual(100);
            expect(positionController.maxY).toEqual(200);
            expect(positionController.hasArea).toBe(true);
        });
        
        it('updates game object position', function () {
            var gameObject = new GameObject({
                posX: 10,
                posY: 20,
                posZ: 30,
                speedX: 5,
                speedY: 6,
                speedZ: -1,
                maxSpeed: 10
            });
            var positionController = new PositionController(gameObject);

            expect(gameObject.get('posX')).toEqual(10);
            expect(gameObject.get('posY')).toEqual(20);
            expect(gameObject.get('posZ')).toEqual(30);

            expect(gameObject.get('speedX')).toEqual(5);
            expect(gameObject.get('speedY')).toEqual(6);
            expect(gameObject.get('speedZ')).toEqual(-1);
            
            positionController.update();
            
            expect(gameObject.get('posX')).toEqual(15);
            expect(gameObject.get('posY')).toEqual(26);
            expect(gameObject.get('posZ')).toEqual(29);
        });
    });
});
