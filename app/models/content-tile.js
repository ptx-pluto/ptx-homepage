import Ember from 'ember';

export default Ember.Object.extend({

    isSingleTile: function(){
        return this.get('tiles.length') === 1;
    }.property('tiles'),

    isTrippleTile: function(){
        return this.get('tiles.length') === 3;
    }.property('tiles')

});
