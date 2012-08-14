/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, console, jasmine, describe, it, beforeEach, afterEach, expect */

define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',
    
    'managers/ScreenManager'
    
], function ($, _, Backbone, ScreenManager) {
    'use strict';
    jasmine.getFixtures().fixturesPath = 'spec/fixtures';
        
    describe('ScreenManager', function () {
        beforeEach(function () {
            jasmine.getFixtures().set('<div role="main" id="main"></div>');
            this.screenManager = new ScreenManager({ el: $('#main') });
        });
        
        afterEach(function () {
            this.screenManager.clearView();
        });

        it('starts with an empty view', function () {
            expect($('#main')).toBeEmpty();
        });
        
        it('can show a simple view', function () {
            var mainScreen = new Backbone.View({
                id: 'simpleView',
                className: 'main-view'
            });
            this.screenManager.showView(mainScreen);
            
            expect($('#main').children().length).toBe(1);
            expect($('#main')).toContain('div.main-view');
            expect($('#main #simpleView')).toHaveClass('main-view');
        });

        it('can show the same view twice', function () {
            var mainScreen = new Backbone.View({
                id: 'simpleView',
                className: 'main-view'
            });
            this.screenManager.showView(mainScreen);
            this.screenManager.showView(mainScreen);
            
            expect($('#main').children().length).toBe(1);
            expect($('#main')).toContain('div.main-view');
            expect($('#main #simpleView')).toHaveClass('main-view');
        });

        it('can show and remove a simple view', function () {
            var mainScreen = new Backbone.View({
                id: 'simpleView',
                className: 'main-view'
            });
            this.screenManager.showView(mainScreen);
            this.screenManager.clearView();

            expect($('#main').children().length).toBe(0);
        });
        
        it('can show 2 simple views', function () {
            var ShowTextView = Backbone.View.extend({
                className: 'main-view',
                
                render: function () {
                    $(this.el).html(this.options.message);
                    return this;
                }
            });
            
            var mainScreen = new ShowTextView({
                id: 'simpleView1',
                message: 'ohai'
            });
            this.screenManager.showView(mainScreen);
            expect($('#main').children().length).toBe(1);
            expect($('#main #simpleView1')).toHaveText('ohai');
            
            var infoScreen = new ShowTextView({
                id: 'simpleView2',
                message: 'hello'
            });
            this.screenManager.showView(infoScreen);
            
            expect($('#main').children().length).toBe(1);
            expect($('#main')).not.toContain('div.#simpleView1');
            expect($('#main')).toContain('div.#simpleView2');
            expect($('#main #simpleView2')).toHaveClass('main-view');
            expect($('#main #simpleView2')).toHaveText('hello');
        });        
    });
});
