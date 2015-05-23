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

    this.route('skills');

    this.route('websfm');

    this.route('webreddit');

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
        },

        enter: function(link){
            this.transitionTo(link);
        }

    }

});

App.IndexRoute = Ember.Route.extend();
App.ProfileRoute = Ember.Route.extend();
App.SkillsRoute = Ember.Route.extend();
App.WebsfmRoute = Ember.Route.extend();
App.WebredditRoute = Ember.Route.extend();

//===========================================
// Components
//===========================================

App.HexagonGridComponent = require('./components/HexagonGrid.js');
App.HexagonTileComponent = require('./components/HexagonTile.js');
App.ContentTileComponent = require('./components/ContentTile.js');
App.ContentTrippleTileComponent = require('./components/ContentTrippleTile.js');
App.FloatingWindowComponent = require('./components/FloatingWindow.js');