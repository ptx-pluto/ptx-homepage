'use strict';

var _ = require('underscore');

var HexagonRowView = require('./HexagonRowView.js'),
    settings = require('../settings.js'),
    TILE_OUTLINE_DURATION = settings.TILE_OUTLINE_DURATION;

module.exports = Ember.CollectionView.extend({

    tagName: 'svg',

    rows: 10,

    cols: 15,

    edge: 100,

    totalHeight: function(){
        return  this.get('edge') * 1.5 * (this.get('rows') - 1);
    }.property('rows', 'edge'),

    totalWidth: function(){
        return this.get('tileWidth') * (this.get('cols') + 1);
    }.property('cols', 'edge'),

    tileWidth: function(){
        return  2 * this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    itemViewClass: HexagonRowView,

    content: function(){
        var rows = this.get('rows'),
            cols = this.get('cols');
        return _.range(rows).map(function(){
            return _.range(cols);
        });
    }.property('rows','cols'),

    getTile: function(row,col){
        return this.get('childViews').findBy('row', row).get('childViews').findBy('col', col);
    },

    getTilePosition: function(row, col){
        var tileWidth = this.get('tileWidth');
        var xbase = col * tileWidth - this.paddingLeft;
        return [
                row % 2 === 0 ? xbase : xbase + this.lineDelta,
                row * this.rowDelta - this.paddingTop
        ];
    },

    onInit: function(){
        var tileWidth = this.get('tileWidth'),
            edge = this.get('edge');
        this.rowDelta = 1.5 * edge;
        this.lineDelta = tileWidth/2;
        this.paddingTop = edge;
        this.paddingLeft = 20 + tileWidth/2;
    }.on('init'),


    domInit: function(){

        var totalHeight = this.get('totalHeight'),
            totalWidth = this.get('totalWidth');

        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        handler.attr({
            height: totalHeight,
            width: totalWidth
        });
        this.showGrid();

    }.on('didInsertElement'),

    showGrid: function(){
        var rows = this.get('rows'),
            cols = this.get('cols'),
            row, col;
        for (row=0; row<rows; row++) {
            for (col=0; col<cols; col++) {
                this.getTile(row,col).promiseAppear(TILE_OUTLINE_DURATION/3*(row+col)+1);
            }
        }
    }

});