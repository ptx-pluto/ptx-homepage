import Ember from 'ember';
import ContentTile from '../models/content-tile';
import content from '../content';

export default Ember.Route.extend({

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
