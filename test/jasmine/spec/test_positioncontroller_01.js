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

        it('can add and remove several game objects', function () {
            var positionController = new PositionController();

            var bonnie = new GameObject({ name: 'bonnie' });
            positionController.add(bonnie);
            var clyde = new GameObject({ name: 'clyde' });
            positionController.add(clyde);

            expect(positionController.gameObjects.length).toEqual(2);
            expect(positionController.gameObjects[0]).toEqual(bonnie);
            expect(positionController.gameObjects[1]).toEqual(clyde);

            // remove objects
            positionController.remove(bonnie);
            expect(positionController.gameObjects.length).toEqual(1);
            expect(positionController.gameObjects[0]).toEqual(clyde);

            positionController.remove(bonnie);
            expect(positionController.gameObjects.length).toEqual(1);

            positionController.remove(clyde);
            expect(positionController.gameObjects.length).toEqual(0);
        });

        it('can update multiple objects', function () {
            var positionController = new PositionController();

            var bonnie = new GameObject({
                name: 'bonnie',
                posX: 10,
                speedX: 2,
                maxSpeed: 2
            });
            positionController.add(bonnie);
            var clyde = new GameObject({
                name: 'clyde',
                posX: -10,
                speedX: 3,
                maxSpeed: 3
            });
            positionController.add(clyde);

            positionController.update();
            expect(bonnie.get('posX')).toEqual(12);
            expect(clyde.get('posX')).toEqual(-7);

            positionController.update();
            expect(bonnie.get('posX')).toEqual(14);
            expect(clyde.get('posX')).toEqual(-4);

            positionController.update();
            expect(bonnie.get('posX')).toEqual(16);
            expect(clyde.get('posX')).toEqual(-1);
        });

    });
});
