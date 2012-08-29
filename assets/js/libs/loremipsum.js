/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console, document */

// special function for injecting lorem ipsum
define([
    'jquery'
], function ($) {
    'use strict';

    var loremipsums = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ];
    
    // generate lorem ipsum into the body
    var LoremIpsumGenerator = {
        // inject lorem ipsum to jQuery object
        inject : function ($targetContainer, options) {
            options = options || {};
            
            // create loremIpsumText
            var numOfSentences = options.short ? 1 : loremipsums.length;
            var i = 0, loremIpsumText = '';
            for (i = 0; i < numOfSentences; i++) {
                loremIpsumText += loremipsums[i] + ' ';
            }
            
            $targetContainer.prepend(document.createTextNode(loremIpsumText));
            $targetContainer.prepend('<h1>Lorem Ipsum</h1>');
            $targetContainer.append(document.createTextNode(loremIpsumText));
        }
    };
    
    return LoremIpsumGenerator;
});