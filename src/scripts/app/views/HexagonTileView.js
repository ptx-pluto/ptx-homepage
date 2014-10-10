'use strict';

var _ = require('underscore'),
    Snap = require('snapsvg');

var SnapSvgMixin = require('./SnapSvgMixin.js'),
    outlines = require('../../hexagon-grid/outlines.js'),
    utils = require('../../utils.js');

module.exports = Ember.View.extend(SnapSvgMixin, {

    tagName: 'svg',

    snap: null,

    grid: null,

    $line: null,

    edge: null,

    edges: function(){
        return Math.ceil(this.get('edge')*6);
    }.property('edge'),

    centerX: function(){
        return this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    centerY: function(){
        this.get('edge');
    }.property('edge'),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('snap', handler);

        var innerRatio = 0.9;
        var edge = this.get('edge'),
            edges = this.get('edges'),
            centerX = this.get('centerX'),
            centerY = this.get('centerY');

        var $inner = handler.polygon(outlines.getHexagonArray(centerX, centerY, edge*innerRatio));
        $inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-dashoffset': edges,
            'stroke-dasharray': edges,
            'stroke-linecap': 'square'
        });
        this.set('$inner', $inner);
    }




/*
    initialize: function(options){
        var innerRatio = 0.9;

        this.grid = options.grid;
        this.$line = options.$line;
        this.$ = options.$container;
        this.edge = options.edge;
        this.edges = Math.ceil(this.edge*6);
        this.centerX = this.edge * Math.cos(Math.PI/6);
        this.centerY = this.edge;

        this.$inner = this.$.polygon(outlines.getHexagonArray(this.centerX, this.centerY, this.edge*innerRatio));
        this.$inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-dashoffset': this.edges,
            'stroke-dasharray': this.edges,
            'stroke-linecap': 'square'
        });
    },
*/


});