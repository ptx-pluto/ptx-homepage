'use strict';

var _ = require('underscore');

module.exports = Ember.Component.extend({

    tagName: 'div',

    classNames: ['hexagon-grid__container'],

    rows: 7,

    cols: 9,

    rowsArray: function(){
        return _.range(this.get('rows'));
    }.property('rows'),

    colsArray: function(){
        return _.range(this.get('cols'));
    }.property('cols'),

    edge: function(){
        return Math.max(150, window.innerWidth/(6.5*Math.sqrt(3)));
    }.property(),

    height: function(){
        return  this.get('edge') * 1.5 * (this.get('rows') - 1);
    }.property('rows', 'edge'),

    width: function(){
        return this.get('tileWidth') * (this.get('cols') - 1);
    }.property('cols', 'edge'),

    tileWidth: function(){
        return  2 * this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    contentQueue: [],


    getTilePosition: function(row, col){
        var tileWidth = this.get('tileWidth');
        var xbase = col * tileWidth - this.paddingLeft;
        return [
            row % 2 === 0 ? xbase : xbase + this.lineDelta,
            row * this.rowDelta - this.paddingTop
        ];
    },


    promiseTilesReady: function(tiles){
        var contentQueue = this.get('contentQueue');
        return new Promise(function(resolve, reject){
            contentQueue.push({
                resolve: resolve,
                tiles: [],
                queue: tiles
            });
        });
    },


    cacheData: function(){
        var tileWidth = this.get('tileWidth'),
            edge = this.get('edge');
        this.rowDelta = 1.5 * edge;
        this.lineDelta = tileWidth/2;
        this.paddingTop = edge;
        this.paddingLeft = 20 + tileWidth/2;
    }.on('init'),


    registerWheel: function(){
        var _self = this;
        jQuery(this.get('element')).on('wheel', function(e){
            _self.wheel(e.originalEvent);
        });
    }.on('didInsertElement'),

    wheel: function(e){
        var container = this.get('element'),
            speed = 1;
        container.scrollTop += e.deltaY*speed;
        container.scrollLeft += e.deltaX*speed;
    },

    actions: {

        tileReady: function(row, col, tile){
            var queue = this.get('contentQueue');
            queue.forEach(function(entry){
                entry.queue.forEach(function(t){
                    if (t.row === row && t.col === col) {
                        entry.queue.removeObject(t);
                        entry.tiles.push(tile);
                    }
                });
                if (entry.queue.length === 0) {
                    queue.removeObject(entry);
                    entry.resolve(entry.tiles);
                }
            });
        }

    }

});