'use strict';

var content = require('./content.js'),
    utils = require('../utils.js');


module.exports = function(App){

    App.IndexController = Ember.ArrayController.extend({
        itemController: 'content'
    });

    App.ContentController = Ember.ObjectController.extend({

        isLoaded: false,

        load: function(){
            var _self = this;
            utils
                .promiseImg(this.get('image'))
                .then(function(){
                    _self.set('isLoaded', true);
                })
        }

    });

};