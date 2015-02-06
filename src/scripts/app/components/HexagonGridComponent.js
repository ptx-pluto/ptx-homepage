'use strict';

module.exports = Ember.Component.extend({

    tagName: 'svg',

    rows: 7,

    cols: 9,

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

    getTilePosition: function(row, col){
        var tileWidth = this.get('tileWidth');
        var xbase = col * tileWidth - this.paddingLeft;
        return [
            row % 2 === 0 ? xbase : xbase + this.lineDelta,
            row * this.rowDelta - this.paddingTop
        ];
    },

    didInsertElement: function(){
        var tileWidth = this.get('tileWidth'),
            totalHeight = this.get('totalHeight'),
            totalWidth = this.get('totalWidth'),
            edge = this.get('edge');
        this.rowDelta = 1.5 * edge;
        this.lineDelta = tileWidth/2;
        this.paddingTop = edge;
        this.paddingLeft = 20 + tileWidth/2;

        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        handler.attr({
            height: totalHeight,
            width: totalWidth
        });
        this.showGrid();
    }

});