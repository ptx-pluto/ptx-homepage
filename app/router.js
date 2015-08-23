import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  LOG_TRANSITIONS: true
});

Router.map(function() {

  this.route('profile');

  this.route('skills');

  this.route('webreddit');

});

export default Router;
