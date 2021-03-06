import Ember from 'ember';

export default Ember.Mixin.create({

    click: function(){
        var link = this.get('content.internalLink');
        if (link) {
            this.get('grid').sendAction('enter', link);
        }
    }

});
