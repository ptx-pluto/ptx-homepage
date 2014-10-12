'use strict';

var ContentTileView = require('./ContentTileView.js');

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    itemViewClass: ContentTileView

});