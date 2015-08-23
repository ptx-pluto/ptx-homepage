import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    enter: function(link){
      this.transitionTo(link);
    }

  }

});
