'use strict';

var setupControllers = require('./controllers.js'),
    setupRoutes = require('./router.js'),
    setupViews = require('./views.js');

window.Promise = Promise || Ember.RSVP.Promise;

var App = window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

App.HexagonGridComponent = require('./components/HexagonGridComponent.js');
App.HexagonTileComponent = require('./components/HexagonTileComponent.js');

setupRoutes(App);
setupControllers(App);
setupViews(App);