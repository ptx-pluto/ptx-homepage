import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['floating-window'],

    actions: {
        close: function(){
            this.sendAction('close');
        }
    }

});
