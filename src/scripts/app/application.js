'use strict';

var content = require('./content.js'),
    ContentTile = require('./models/ContentTile.js');

window.Promise = Promise || Ember.RSVP.Promise;

var App = window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

//===========================================
// Routes
//===========================================

App.ApplicationRoute = Ember.Route.extend({

    model: function(){
        return content.map(function(tile){
            return ContentTile.create(tile);
        });
    }

});

App.IndexRoute = Ember.Route.extend({


});


//===========================================
// Components
//===========================================

App.HexagonGridComponent = require('./components/HexagonGrid.js');
App.HexagonTileComponent = require('./components/HexagonTile.js');
App.ContentTileComponent = require('./components/ContentTile.js');
App.ContentTrippleTileComponent = require('./components/ContentTrippleTile.js');