'use strict';

var outlines = require('../../hexagon-grid/outlines.js');

module.exports = Ember.Component.extend({

    tagName: 'polygon',

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

        if (!row || !col || !grid) throw "Require row, col and grid to initialize the tile";

        var edge = this.get('edge'),
            center = this.get('center'),
            centerX = center[0],
            centerY = center[1];

        var outline = outlines.getHexagonArray(centerX, centerY, edge*RATIO);

        return outline.map(function(pair){ return pair.join(','); }).join(' ');

    }.property('row', 'col')

});