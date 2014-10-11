'use strict';

var _ = require('underscore');

var HexagonTileView = require('./HexagonTileView.js'),
    utils = require('../../utils.js');

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    grid: Ember.computed.alias('parentView'),

    edge: Ember.computed.alias('grid.edge'),

    cols: Ember.computed.alias('grid.rows'),

    itemViewClass: HexagonTileView,

    row: function(){
        return this.get('grid.childViews').indexOf(this);
    }.property(),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        var row = this.get('row'),
            pos = this.get('grid').getTilePosition(row, 0);

        handler.attr({
            y: pos[1],
            x: pos[0]
        });
    }

});