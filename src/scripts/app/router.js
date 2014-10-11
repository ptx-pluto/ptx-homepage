'use strict';

var content = require('./content.js');

module.exports = function(App){

    App.ApplicationRoute = Ember.Route.extend({

    });

    App.IndexRoute = Ember.Route.extend({

        model: function(){
            return content;
        }

    });

};