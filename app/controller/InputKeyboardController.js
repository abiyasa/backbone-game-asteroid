/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global window, define, console */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone'
    
], function ($, _, Backbone) {
    'use strict';

    // For controlling game object using keyboard input
    var InputKeyboardController = function (gameObject, options) {
        this.gameObject = gameObject;
        options = options || {};
        
        this.keyStates = {
            up: false,
            left: false,
            right: false,
            down: false,
            fire1: false,
            fire2: false,
            reset: false
        };
        
        // keymapping from keycode to keyStates
        this.keyMap = {
            38: 'up',
            37: 'left',
            39: 'right',
            40: 'down',
            27: 'reset',
            32: 'fire1',
            13: 'fire2'
        };
        
        // handle movement force
        this.movementForce = options.movementForce || 1;
        
        // init event listener
        var context = options.context;
        if (context) {
            context.addEventListener('keydown', this.onKeyUpDown.bind(this));
            context.addEventListener('keyup', this.onKeyUpDown.bind(this));
        }
    };
    
    // handle keyboard event up and down
    InputKeyboardController.prototype.onKeyUpDown = function (event) {
        var pressedKeyState = this.keyMap[event.keyCode];
        if (pressedKeyState) {
            this.keyStates[pressedKeyState] = (event.type === 'keydown');
            //console.log('state[' + pressedKeyState + ']=' + this.keyStates[pressedKeyState]);
        }
    };

    // update game object position
    InputKeyboardController.prototype.update = function (time) {
        var theGameObject = this.gameObject;

        // check the status and updates game object based on the keyStates
        var theKeyStates = this.keyStates;
        var forceX, forceY, forceZ;
        if (theKeyStates.left) {
            forceX = -this.movementForce;
        } else if (theKeyStates.right) {
            forceX = this.movementForce;
        } else {
            forceX = 0;
        }
        theGameObject.set({
            forceX: forceX
        }, { silent: true});
    };

    return InputKeyboardController;
});
