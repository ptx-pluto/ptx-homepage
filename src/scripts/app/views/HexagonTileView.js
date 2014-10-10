'use strict';

var Snap = require('snapsvg');

module.exports = Ember.View.extend({

    tagName: 'svg',

    snap: null,

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('snap', handler);
    }

});