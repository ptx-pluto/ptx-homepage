'use strict';

var outlines = require('../../hexagon-grid/outlines.js'),
    utils = require('../../utils.js');

module.exports = Ember.Component.extend({

    tagName: 'g',

    classNames: ['component__content-tile', 'is-tripple'],

    grid: null, // required

    content: null, //required

    tiles: Ember.computed.alias('content.tiles'),

    image: Ember.computed.alias('content.image'),

    config: function(){
        var grid = this.get('grid'),
            tiles = this.get('tiles');
        return outlines.getTrippleTileConfig(tiles, grid);
    }.property('content'),

    center: function(){

        var grid = this.get('grid'),
            tiles = this.get('tiles'),
            edge = this.get('grid.edge'),
            config = this.get('config'),
            isUp = config.isUp,
            position = config.position,
            centerX = position[0] + 2*edge * Math.cos(Math.PI/6),
            centerY = position[1] + (isUp ? 2*edge : 1.5*edge);

        return [ centerX, centerY ];

    }.property('content'),


    getOutline: function(ratio){
        var edge = this.get('grid.edge'),
            center = this.get('center'),
            config = this.get('config');
        return outlines.getTripplePoints(config.isUp, center[0], center[1], edge, ratio);
    },

    outerPoints: function(){
        var RATIO = 0.95;
        return this.getOutline(RATIO);
    }.property('center', 'content'),

    innerPoints: function(){
        var RATIO = 0.85;
        return this.getOutline(RATIO);
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