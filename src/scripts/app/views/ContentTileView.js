'use strict';

var TILE_TYPES = require('../content.js').TILE_TYPES,
    SnapSvgMixin = require('./SnapSvgMixin.js'),
    outlines = require('../../hexagon-grid/outlines.js');

module.exports = Ember.View.extend(SnapSvgMixin, {

    tagName: 'svg',

    container: Ember.computed.alias('parentView.parentView'),

    grid: Ember.computed.alias('container.grid'),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('$snap', handler);
    },

    onLoaded: function(){

        var grid = this.get('grid'),
            tiles = this.get('tiles').map(function(tile){
                return grid.getTile(tile.row, tile.col);
            }),
            _self = this;

        switch (this.get('tileType')) {
            case TILE_TYPES.SINGLE:
                this.initSingle();
                break;
            case TILE_TYPES.TRIPPLE:
                this.initTripple();
                break;
        }

        Promise
            .all(tiles.map(function(tile){
                return tile.promiseReady();
            }))
            .then(function(){
                return tiles.map(function(tile){
                    return tile.promiseFade();
                });
            })
            .then(function(){
                return _self.promiseAppear();
            });

    }.observes('controller.isLoaded'),

    initSingle: function(){
        var innerRatio = 0.9,
            handler = this.get('$snap'),
            grid = this.get('grid'),
            tileRC = this.get('tiles')[0],
            tilePos = grid.getTilePosition(tileRC.row, tileRC.col),
            tile = grid.getTile(tileRC.row, tileRC.col),
            edge = tile.get('edge'),
            edges = tile.get('edges'),
            centerX = tile.get('centerX'),
            centerY = tile.get('centerY');

        handler.attr({
            x: tilePos[0],
            y: tilePos[1],
            opacity: 0
        });

        var $inner = handler.polygon(outlines.getHexagonArray(centerX, centerY, edge*innerRatio));
        $inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-dashoffset': edges,
            'stroke-dasharray': edges,
            'stroke-linecap': 'square'
        });

        var url = this.get('image'),
            $img = handler.image(url, 0, 0, 350, 350),
            $frame = handler.polygon(outlines.getHexagonArray(centerX, centerY, edge*0.8));

        $img.attr({
            'clip-path': $frame,
            opacity: 0
        });

        $frame.attr({
            fill: 'tomato'
        });

    },

    initTripple: function(){

        var tiles = this.get('tiles'),
            grid = this.get('grid'),
            config = outlines.getTrippleTileConfig(tiles, grid),
            isUp = config.isUp,
            position = config.position,
            edge = this.get('grid.edge'),
//            edges = Math.ceil(edge*12),
            frameRatio = 0.8,
            innerRatio = 0.9,
            centerX = 2*edge * Math.cos(Math.PI/6),
            centerY = isUp ? 2*edge : 1.5*edge,
            url = this.get('image'),
            handler = this.get('$snap');

        handler.attr({
            x: position[0],
            y: position[1],
            opacity: 0
        });

        var $inner = handler.polygon(outlines.getTripleHexagonArray(isUp, centerX, centerY, edge, innerRatio));
        $inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-linecap': 'square'
        });

        var $frame = handler.polygon(outlines.getTripleHexagonArray(isUp, centerX, centerY, edge, frameRatio));
        $frame.attr({
            fill: 'tomato'
        });

        var $img = handler.image(url, 0, 0, 350, 350);
        $img.attr({
            'clip-path': $frame
        });

    },


//    promiseOutline: function(){
//        return this.promiseAnimate(this.$inner, { 'stroke-dashoffset': 0 }, 1000);
//    },


    promiseAppear: function(){
        return this.promiseAnimate(this.get('$snap'), { opacity: 1 }, 500);
    }

});