/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global require */

require([
    'jquery',
    'statemachine',
    
    'managers/ScreenManager',
    'screens/IntroScreen',
    'screens/MainScreen',
    
    'libs/loremipsum'
], function ($, StateMachine, ScreenManager, IntroScreen, MainScreen, LoremIpsumGenerator) {
    'use strict';
    
    // inject lorem ipsum
    LoremIpsumGenerator.inject($('#container'), { short: false });
    
    // for managing our screens
    var screenManager = new ScreenManager({ el: $('#viewport') });

    // state machine
    var stateMachine = new StateMachine.create({
        initial: 'init',
        events: [
            { name: 'showIntro', from: 'init', to: 'intro' },
            { name: 'startUp', from: 'intro', to: 'start' }
        ],
        callbacks: {
            onshowIntro: function () {
                var introScreen = new IntroScreen();
                introScreen.on('screenEvent', onScreenEvent);

                screenManager.showView(introScreen);
            },
            
            onstartUp: function (event, from, to, data) {
                var mainScreen = new MainScreen();
                screenManager.showView(mainScreen);
                mainScreen.start();
            }
        }
    });
    
    // the screen event, which will trigger screen changes
    var onScreenEvent = function (detail) {
        console.log('screen event happens. detail=', detail);
        
        // the detail will call the state machine method
        var stateMethod = stateMachine[detail];
        return (stateMethod ? stateMethod.apply(stateMachine) : undefined);
    };
        
    // start!
    stateMachine.showIntro();
});
