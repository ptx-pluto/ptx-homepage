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

App.Router.map(function() {

    this.route('profile');

    this.route('math');

    this.route('computer');

    this.route('websfm');

});


//===========================================
// Routes
//===========================================

App.ApplicationRoute = Ember.Route.extend({

    model: function(){
        return content.map(function(tile){
            return ContentTile.create(tile);
        });
    },

    actions: {
        home: function(){
            this.transitionTo('index');
        }
    }

});

App.IndexRoute = Ember.Route.extend();

App.ProfileRoute = Ember.Route.extend();

App.MathRoute = Ember.Route.extend();

App.ComputerRoute = Ember.Route.extend();

App.WebsfmRoute = Ember.Route.extend();

//===========================================
// Components
//===========================================

App.HexagonGridComponent = require('./components/HexagonGrid.js');
App.HexagonTileComponent = require('./components/HexagonTile.js');
App.ContentTileComponent = require('./components/ContentTile.js');
App.ContentTrippleTileComponent = require('./components/ContentTrippleTile.js');
App.FloatingWindowComponent = require('./components/FloatingWindow.js');