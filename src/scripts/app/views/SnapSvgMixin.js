'use strict';

module.exports = Ember.Mixin.create({

    $snap: null,

    promiseAnimate: function($el, attrs, duration){
        return new Promise(function(resolve, reject){
            $el.animate(attrs, duration, null, resolve);
        });
    },

    promiseFade: function(){
        return this.promiseAnimate(this.get('$snap'), { opacity: 0 }, 500);
    },

    promiseBlink: function(){
        var _self = this,
            $snap = this.get('$snap');
        return this.promiseAnimate($snap, { 'opacity': 0 }, 200)
            .then(function(){
                return _self.promiseAnimate($snap, { 'opacity': 1 }, 200);
            });
    }

});