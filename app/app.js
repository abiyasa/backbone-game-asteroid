/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

define([
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'views/TextGameView'
], function ($, _, Backbone, GameObject, TextGameView) {
    'use strict';
    var MainApp = Backbone.Router.extend({
        initialize: function () {
            // init all 
            this.hero = new GameObject();
        },
        
        routes: {
            '': 'go'
        },
        
        go: function () {
            var textGameView = new TextGameView({ model: this.hero });
            $('#main').append(textGameView.render().el);
        }
    });
    
    return MainApp;
});
