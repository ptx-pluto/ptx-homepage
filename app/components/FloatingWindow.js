module.exports  = Ember.Component.extend({

    classNames: ['floating-window'],

    actions: {
        close: function(){
            this.sendAction('close');
        }
    }

});