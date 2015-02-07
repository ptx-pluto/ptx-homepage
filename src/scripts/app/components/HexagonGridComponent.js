'use strict';

var _ = require('underscore');

module.exports = Ember.Component.extend({

    tagName: 'svg',

    attributeBindings: ['width', 'height'],

    rows: 7,

    cols: 9,

    rowsArray: function(){
        return _.range(this.get('rows'));
    }.property('rows'),

    colsArray: function(){
        return _.range(this.get('cols'));
    }.property('cols'),

    edge: 150,

    height: function(){
        return  this.get('edge') * 1.5 * (this.get('rows') - 1);
    }.property('rows', 'edge'),

    width: function(){
        return this.get('tileWidth') * (this.get('cols') + 1);
    }.property('cols', 'edge'),

    tileWidth: function(){
        return  2 * this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    getTilePosition: function(row, col){
        var tileWidth = this.get('tileWidth');
        var xbase = col * tileWidth - this.paddingLeft;
        return [
            row % 2 === 0 ? xbase : xbase + this.lineDelta,
            row * this.rowDelta - this.paddingTop
        ];
    },

    cacheData: function(){
        var tileWidth = this.get('tileWidth'),
            edge = this.get('edge');
        this.rowDelta = 1.5 * edge;
        this.lineDelta = tileWidth/2;
        this.paddingTop = edge;
        this.paddingLeft = 20 + tileWidth/2;
    }.on('init')

});