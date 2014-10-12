'use strict';

var ContentTileView = require('./ContentTileView.js');

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    classNames: ['hexagon-grid__content-tiles'],

    itemViewClass: ContentTileView,

    index: Ember.computed.alias('parentView'),

    grid: Ember.computed.alias('index.grid'),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        handler.attr({
            width: this.get('grid.totalWidth'),
            height: this.get('grid.totalHeight')
        });
    }

});