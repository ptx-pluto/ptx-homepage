'use strict';

var _ = require('underscore');

var outlines = require('../../hexagon-grid/outlines.js'),
    settings = require('../settings'),
    TILE_OUTLINE_DURATION = settings.TILE_OUTLINE_DURATION;

var INNER_RATIO = 0.85;

module.exports = Ember.Component.extend({

    tagName: 'g',

    classNames: ['hexagon-tile'],

    attributeBindings: ['points'],

    row: null, // required

    col: null, // required

    grid: null, //required

    edge: Ember.computed.alias('grid.edge'),

    uuid: function(){
        return _.uniqueId('hexagon-tile-');
    }.property('row', 'col'),

    clip1: function(){
        return 'url(#' + this.get('clip1id') + ')';
    }.property('clip1id'),

    clip1id: function(){
        return this.get('uuid') + '__clip1';
    }.property('uuid'),

    corner: function(){
        var row = this.get('row'),
            col = this.get('col'),
            edge = this.get('edge'),
            pos = this.get('grid').getTilePosition(row, col);
        return {
            x: pos[0],
            y: pos[1]
        };
    }.property('row', 'col'),

    /*
    innerWidth: function(){
        return this.get('edge')*Math.sqrt(3)*INNER_RATIO;
    }.property('edge'),

    innerHeight: function(){
        return this.get('edge')*2*INNER_RATIO;
    }.property('edge'),

    innerCorner: function(){
        var corner = this.get('corner'),
            edge = this.get('edge');
        return {
            x: corner.x + Math.sqrt(3)/2*edge*(1-INNER_RATIO),
            y: corner.y + edge*(1-INNER_RATIO)
        };
    }.property('corner'),
    */

    center: function(){
        var edge = this.get('edge'),
            pos = this.get('corner');
        return [
            pos.x + edge * Math.cos(Math.PI/6),
            pos.y + edge
        ];
    }.property('corner', 'edge'),

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

        $inner.attr({
            'opacity': 0
        });

        _.delay(function(){
            $outter.animate({ 'stroke-dashoffset': 0 }, TILE_OUTLINE_DURATION, null, function(){
                $inner.animate({ opacity: 1 }, 500, null, function(){
                    grid.send('tileReady', row, col, _self);
                });
            });
        }, TILE_OUTLINE_DURATION/3*(row+col)+800);

        // wait additional 800ms, wait for full initialization, or else feel laggy

    }.on('didInsertElement')


});