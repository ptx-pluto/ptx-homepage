'use strict';

var _ = require('underscore');

var HexagonRowView = require('./HexagonRowView.js');

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    rows: 7,

    cols: 9,

    edge: 100,

    itemViewClass: HexagonRowView,

    init: function(){
        var rows = this.get('rows'),
            cols = this.get('cols');
        var grid = _.range(rows).map(function(){
            return _.range(cols);
        });
        this.set('content', grid);
    },

    getTile: function(row,col){
        return this.get('childViews').findBy('content', row).get('childViews').findBy('content', col);
    },

    getTilePosition: function(row, col){
        var xbase = col*this.tileWidth-this.paddingLeft;
        return [
                row % 2 === 0 ? xbase : xbase + this.lineDelta,
                row * this.rowDelta-this.paddingTop
        ];
    }

});