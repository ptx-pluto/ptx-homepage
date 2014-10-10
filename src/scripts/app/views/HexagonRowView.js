'use strict';

var _ = require('underscore'),
    Snap = require('snapsvg');

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
    }.property()

});