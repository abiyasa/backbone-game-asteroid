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
        it('can add a game object without changing it', function () {
            var gameObject = new GameObject({
                posX: 10,
                posY: 20,
                posZ: 30,
                speedX: 5,
                speedY: 6,
                speedZ: -1,
                maxSpeed: 10
            });
            var positionController = new PositionController();
            positionController.add(gameObject);

            expect(gameObject.get('posX')).toEqual(10);
            expect(gameObject.get('posY')).toEqual(20);
            expect(gameObject.get('posZ')).toEqual(30);

            expect(gameObject.get('speedX')).toEqual(5);
            expect(gameObject.get('speedY')).toEqual(6);
            expect(gameObject.get('speedZ')).toEqual(-1);
        });

        it('inits without min and max positon limitation', function () {
            var positionController = new PositionController();

            expect(positionController.minX).toBeUndefined();
            expect(positionController.minY).toBeUndefined();
            expect(positionController.maxX).toBeUndefined();
            expect(positionController.maxY).toBeUndefined();
            expect(positionController.hasArea).toBe(false);
        });
        
        it('inits with min and max positon on options', function () {
            var positionController = new PositionController({
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
            var positionController = new PositionController();
            positionController.add(gameObject);

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
        
        it('can add several objects', function () {
            // TODO implement this
        });
        
        it('can add and remove several objects', function () {
            // TODO implement this
        });
        
        it('can update multiple objects', function () {
            // TODO implement this
        });
        
    });
});
