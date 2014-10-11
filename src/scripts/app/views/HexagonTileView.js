'use strict';

var _ = require('underscore');

var SnapSvgMixin = require('./SnapSvgMixin.js'),
    outlines = require('../../hexagon-grid/outlines.js'),
    utils = require('../../utils.js');

module.exports = Ember.View.extend(SnapSvgMixin, {

    tagName: 'svg',

    grid: Ember.computed.alias('parentView.parentView'),

    line: Ember.computed.alias('parentView'),

    row: Ember.computed.alias('parentView.row'),

    col: Ember.computed.alias('content'),

    edge: Ember.computed.alias('parentView.edge'),

    edges: function(){
        return Math.ceil(this.get('edge')*6);
    }.property('edge'),

    centerX: function(){
        return this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    centerY: Ember.computed.alias('edge'),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        var innerRatio = 0.9;
        var edge = this.get('edge'),
            edges = this.get('edges'),
            centerX = this.get('centerX'),
            centerY = this.get('centerY'),
            col = this.get('col'),
            tileWidth = 2 * edge * Math.cos(Math.PI/6);

        handler.attr({
            x: col * tileWidth
        });

        var $inner = handler.polygon(outlines.getHexagonArray(centerX, centerY, edge*innerRatio));
        $inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
//            'stroke-dashoffset': edges,
//            'stroke-dasharray': edges,
            'stroke-linecap': 'square'
        });
        this.set('$inner', $inner);
    },

    promiseAppear: function(delay){
        if (!this.promiseReady) {
            if (delay) {
                this.promiseReady = utils.promiseDelay(delay)
                    .then(this.promiseOutline.bind(this))
                    .then(this.promiseFill.bind(this));
            }
            else {
                this.promiseReady = this.promiseOutline().then(this.promiseFill.bind(this));
            }
        }
        return this.promiseReady;
    },


    promiseOutline: function(){
        var $inner = this.get('$inner');
        return this.promiseAnimate($inner, { 'stroke-dashoffset': 0 }, 900);
    },

    promiseFill: function(){
        var $inner = this.get('$inner');
        return this.promiseAnimate($inner, { 'fill': '#FF0526' }, 1000);
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