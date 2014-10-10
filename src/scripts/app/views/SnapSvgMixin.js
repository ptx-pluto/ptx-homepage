'use strict';

module.exports = Ember.Mixin.extend({

    promiseAnimate: function($el, attrs, duration){
        return new Promise(function(resolve, reject){
            $el.animate(attrs, duration, null, resolve);
        });
    }

});