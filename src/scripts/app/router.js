'use strict';

var content = require('./content.js'),
    ContentTile = require('./models/ContentTile.js');

module.exports = function(App){

    App.ApplicationRoute = Ember.Route.extend({

        model: function(){
            return content.map(function(tile){
                return ContentTile.create(tile);
            });
        }

    });

    App.IndexRoute = Ember.Route.extend({


    });

};