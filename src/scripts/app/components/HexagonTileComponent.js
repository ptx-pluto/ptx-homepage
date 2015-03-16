'use strict';

var _ = require('underscore');

var outlines = require('../../hexagon-grid/outlines.js'),
    settings = require('../settings'),
    TILE_OUTLINE_DURATION = settings.TILE_OUTLINE_DURATION;

module.exports = Ember.Component.extend({

    tagName: 'g',

    classNames: ['hexagon-tile'],

    attributeBindings: ['points'],

    row: null, // required

    col: null, // required

    grid: null, //required

    edge: Ember.computed.alias('grid.edge'),


    center: function(){

        var row = this.get('row'),
            col = this.get('col'),
            edge = this.get('edge'),
            pos = this.get('grid').getTilePosition(row, col),
            x = pos[0], y = pos[1],
            deltaX = edge * Math.cos(Math.PI/6),
            deltaY = edge;

        return [ x+deltaX, y+deltaY ];

    }.property('row', 'col', 'edge'),


    points: function() {

        var RATIO = 0.95,
            edge = this.get('edge'),
            center = this.get('center'),
            centerX = center[0],
            centerY = center[1];

        return outlines.getHexagonPoints(centerX, centerY, edge*RATIO);

    }.property('row', 'col'),


    innerOutline: function() {

        var RATIO = 0.85,
            edge = this.get('edge'),
            center = this.get('center'),
            centerX = center[0],
            centerY = center[1];

        return outlines.getHexagonPoints(centerX, centerY, edge*RATIO);

    }.property('row', 'col'),


    appear: function(){

        var _self = this,
            grid = this.get('grid'),
            g = jQuery(this.get('element')),
            $outter = Snap(jQuery('.hexagon-tile__outter', g)[0]),
            $inner = Snap(jQuery('.hexagon-tile__inner', g)[0]),
            row = this.get('row'),
            col = this.get('col'),
            edges = this.get('edge')*6;

        $outter.attr({
            'stroke-dashoffset': edges,
            'stroke-dasharray': edges
        });

        _.delay(function(){
            $outter.animate({ 'stroke-dashoffset': 0 }, TILE_OUTLINE_DURATION, null, function(){
                $inner.animate({ fill: '#FF0526' }, 500, null, function(){
                    grid.send('tileReady', row, col, _self);
                });
            });
        }, TILE_OUTLINE_DURATION/3*(row+col)+1);

    }.on('didInsertElement')


});