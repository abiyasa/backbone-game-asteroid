/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

// The intro screen before everything!
define([
    'jquery',
    'lodash',
    'backbone',
    
    'text!templates/screens/intro.html'
], function ($, _, Backbone, screenTemplate) {
    'use strict';
    var IntroScreen = Backbone.View.extend({
        template: _.template(screenTemplate),
        
        events: {
            'click #button-go': 'notifyStart'
        },
        
        initialize: function () {
            console.log('initialize()');
        },
        
        render: function () {
            $(this.el).html(this.template());
            
            return this;
        },
        
        notifyStart: function () {
            // generate event for screen manager
            console.log('trigger event screenEvent');
            this.trigger('screenEvent', 'startUp');
        }
    });
    
    return IntroScreen;
});
