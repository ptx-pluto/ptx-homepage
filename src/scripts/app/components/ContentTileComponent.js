'use strict';

var outlines = require('../../hexagon-grid/outlines.js'),
    utils = require('../../utils.js');

module.exports = Ember.Component.extend({

    tagName: 'g',

    classNames: ['component__content-tile', 'isSingle'],

    grid: null, // required

    content: null, //required

    tiles: Ember.computed.alias('content.tiles'),

    image: Ember.computed.alias('content.image'),

    center: function(){

        var grid = this.get('grid'),
            tiles = this.get('tiles'),
            edge = this.get('grid.edge'),
            tile = tiles[0],
            row = tile.row,
            col = tile.col,
            pos = grid.getTilePosition(row, col),
            x = pos[0], y = pos[1],
            deltaX = edge * Math.cos(Math.PI/6),
            deltaY = edge;

        return [ x+deltaX, y+deltaY ];

    }.property('content'),


    getOutline: function(ratio){
        var edge = this.get('grid.edge'),
            center = this.get('center');
        return outlines.getHexagonPoints(center[0], center[1], edge*ratio);
    },


    outerPoints: function(){
        var RATIO = 0.95;
        return this.getOutline(RATIO)
    }.property('center', 'content'),


    innerPoints: function(){
        var RATIO = 0.85;
        return this.getOutline(RATIO)
    }.property('center', 'content'),

    hideOnInit: function(){
        Snap(this.get('element')).attr({ opacity: 0 });
    }.on('didInsertElement'),

    getReady: function(){

        var _self = this,
            tiles = this.get('content.tiles'),
            grid = this.get('grid');

        grid.promiseTilesReady(tiles)
            .then(function(ts){
                return Promise.all(ts.map(function(ti){
                    return utils.promiseSanpAnimate(Snap(ti.get('element')), { opacity: 0 }, 500, null);
                }))
            })
            .then(function(){
                return utils.promiseSanpAnimate(Snap(_self.get('element')), { opacity: 1 }, 500, null);
            }).then(function(){
                console.log('animated');
            });

    }.on('init')

});