// Set the require.js configuration for your test application.
// TODO need a proper method to merge config-test.js and config.js
require.config({

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",    
    statemachine: "../assets/js/libs/state-machine",
      
    // plugins
    text: "../assets/js/libs/text"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    }
  }

});
