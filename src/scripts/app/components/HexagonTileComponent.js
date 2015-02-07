'use strict';

var _ = require('underscore');

var outlines = require('../../hexagon-grid/outlines.js'),
    settings = require('../settings'),
    TILE_OUTLINE_DURATION = settings.TILE_OUTLINE_DURATION;

module.exports = Ember.Component.extend({

    tagName: 'polygon',

    classNames: ['component__hexagon-tile'],

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

        var RATIO = 0.9;

        var row = this.get('row'),
            col = this.get('col'),
            grid = this.get('grid');

        //if (!row || !col || !grid) throw "Require row, col and grid to initialize the tile";

        var edge = this.get('edge'),
            center = this.get('center'),
            centerX = center[0],
            centerY = center[1];

        var outline = outlines.getHexagonArray(centerX, centerY, edge*RATIO);

        return outline.reduce(function(memo, val, index){
            if (index === 0) {

            }
            else if (index % 2 === 0) {
                memo += ' ';
            }
            else {
                memo += ',';
            }

            return memo + val;

        }, '');

    }.property('row', 'col'),

    appear: function(){

        var handler = Snap(this.get('element')),
            row = this.get('row'),
            col = this.get('col'),
            edges = this.get('edge')*6;

        handler.attr({
            'stroke-dashoffset': edges,
            'stroke-dasharray': edges
        });

        _.delay(function(){
            handler.animate({ 'stroke-dashoffset': 0 }, TILE_OUTLINE_DURATION, null, function(){
                handler.animate({ fill: '#FF0526' }, 500, null, function(){});
            });
        }, TILE_OUTLINE_DURATION/3*(row+col)+1);

    }.on('didInsertElement')


});