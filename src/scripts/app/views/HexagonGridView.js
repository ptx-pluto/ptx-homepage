'use strict';

var _ = require('underscore');

var HexagonRowView = require('./HexagonRowView.js');

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    rows: 7,

    cols: 9,

    edge: 100,

    itemViewClass: HexagonRowView,

    content: function(){
        var rows = this.get('rows'),
            cols = this.get('cols');
        return _.range(rows).map(function(){
            return _.range(cols);
        });
    }.property('rows','cols'),

    getTile: function(row,col){
        return this.get('childViews').findBy('content', row).get('childViews').findBy('content', col);
    },

    getTilePosition: function(row, col){
        var xbase = col*this.tileWidth-this.paddingLeft;
        return [
                row % 2 === 0 ? xbase : xbase + this.lineDelta,
                row * this.rowDelta-this.paddingTop
        ];
    },

    didInsertElement: function(){

        this.tileWidth = 2 * this.edge * Math.cos(Math.PI/6);
        this.rowDelta = 1.5 * this.edge;
        this.lineDelta = this.tileWidth/2;
        this.paddingTop = this.edge;
        this.paddingLeft = 20+this.tileWidth/2;
        this.totalHeight = this.edge*1.5*(this.rows-1);
        this.totalWidth = this.tileWidth*(this.cols+1);

        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        handler.attr({
            height: this.totalHeight,
            width: this.totalWidth
        });
    }

});