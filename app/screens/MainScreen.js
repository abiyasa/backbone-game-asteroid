/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console */

// The main screen
define([
    'jquery',
    'lodash',
    'backbone',
    
    'models/GameObject',
    'views/TextGameView'
], function ($, _, Backbone, GameObject, TextGameView) {
    'use strict';
    var MainScreen = Backbone.View.extend({
        className: 'main-screen',
        
        initialize: function () {
            console.log('initialize()');
            
            // init all 
            this.hero = new GameObject();
            this.heroView = new TextGameView({ model: this.hero });
            
            this.$el.append(this.heroView.el);
        },
        
        render: function () {
            this.heroView.render();
            
            return this;
        }
    });
    
    return MainScreen;
});
