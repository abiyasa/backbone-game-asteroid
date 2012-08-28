/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console, jasmine, describe, it, beforeEach, afterEach, expect */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'controller/InputKeyboardController'
    
], function ($, _, Backbone, GameObject, InputKeyboardController) {
    'use strict';
        
    describe('InputKeyboardController', function () {
        it('has default keyboard states', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject);
            
            expect(inputController.movementForce).toEqual(1);
        });

        it('accepts optional values', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject, { movementForce: 5 });
            
            expect(inputController.movementForce).toEqual(5);
        });
        
        it('has default keymaps', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject);
            
            expect(inputController.keyMap[38]).toEqual('up');
            expect(inputController.keyMap[37]).toEqual('left');
            expect(inputController.keyMap[39]).toEqual('right');
            expect(inputController.keyMap[40]).toEqual('down');
            expect(inputController.keyMap[27]).toEqual('reset');
            expect(inputController.keyMap[32]).toEqual('fire1');
            expect(inputController.keyMap[13]).toEqual('fire2');
        });

        it('has default keystates', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject);
            
            expect(inputController.keyStates['up']).toBe(false);
            expect(inputController.keyStates['down']).toBe(false);
            expect(inputController.keyStates['left']).toBe(false);
            expect(inputController.keyStates['right']).toBe(false);
            expect(inputController.keyStates['reset']).toBe(false);
            expect(inputController.keyStates['fire1']).toBe(false);
            expect(inputController.keyStates['fire2']).toBe(false);
        });
        
        it('handles event keydown press', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject);
            
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 38
            });
            expect(inputController.keyStates['up']).toBe(true);
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 37
            });
            expect(inputController.keyStates['left']).toBe(true);
            expect(inputController.keyStates['up']).toBe(true);            
        });
        
        it('handles event keyup press', function () {
            var gameObject = new GameObject();
            var inputController = new InputKeyboardController(gameObject);
            
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 39
            });
            expect(inputController.keyStates['right']).toBe(true);
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 40
            });
            expect(inputController.keyStates['down']).toBe(true);
            inputController.onKeyUpDown({
                type: 'keyup',
                keyCode: 39
            });
            expect(inputController.keyStates['right']).toBe(false);
            expect(inputController.keyStates['down']).toBe(true);
            inputController.onKeyUpDown({
                type: 'keyup',
                keyCode: 40
            });
            expect(inputController.keyStates['right']).toBe(false);
            expect(inputController.keyStates['down']).toBe(false);
        });
        
        it('controls gameobject\'s force', function () {
            var gameObject = new GameObject({
                maxSpeed: 10
            });
            var inputController = new InputKeyboardController(gameObject);
            
            // press and unpress left button
            expect(gameObject.get('forceX')).toEqual(0);
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 37
            });
            inputController.update();
            expect(gameObject.get('forceX')).toEqual(-1);
            inputController.onKeyUpDown({
                type: 'keyup',
                keyCode: 37
            });            
            inputController.update();
            expect(gameObject.get('forceX')).toEqual(0);
            
            // press and unpress right button
            inputController.onKeyUpDown({
                type: 'keydown',
                keyCode: 39
            });
            inputController.update();
            inputController.update();
            expect(gameObject.get('forceX')).toEqual(1);
            inputController.onKeyUpDown({
                type: 'keyup',
                keyCode: 39
            });            
            inputController.update();
            expect(gameObject.get('forceX')).toEqual(0);            
        });
    });
});
