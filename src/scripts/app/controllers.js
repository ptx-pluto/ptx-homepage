'use strict';

var content = require('./content.js');


module.exports = function(App){

    App.IndexController = Ember.ArrayController.extend({
        itemController: 'content'
    });

    App.ContentController = Ember.ObjectController.extend({});

};