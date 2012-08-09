/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global require */

require([
    'jquery',
    
    'managers/ScreenManager',
    'screens/MainScreen'
], function ($, ScreenManager, MainScreen) {
    'use strict';
    
    var screenManager = new ScreenManager({ el: $('#main') });
    
    var mainScreen = new MainScreen();
    screenManager.showView(mainScreen);
});
